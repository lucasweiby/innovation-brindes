"use client";
import AuthGuard from "../components/AuthGuard";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "../store/useGlobalStore";
import ProductCard from "../components/ProductCard";
import useSWR from "swr";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import dynamic from "next/dynamic";

// Debounce hook
function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

// Formata preço BRL
function formatBRL(value: string | number) {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Modal acessível
function Modal({ open, onClose, children }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && ref.current) ref.current.focus();
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      ref={ref}
    >
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative outline-none">
        <button
          aria-label="Fechar"
          className="absolute top-2 right-2 text-gray-500 hover:text-black focus:outline focus:outline-2"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

// Skeleton
function ProductSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow p-4 flex flex-col gap-3">
      <div className="bg-gray-200 h-32 w-full rounded" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-8 bg-gray-200 rounded w-full mt-2" />
    </div>
  );
}

// SWR fetcher para produtos
const produtosFetcher = async ([url, busca]: [string, string]) => {
  if (!url) return [];
  if (!localStorage.getItem("token")) throw new Error("Sem token");
  if (!busca.trim()) {
    const res = await fetchWithAuth(url, { method: "GET" });
    if (!res.ok) throw new Error("Erro ao buscar produtos");
    return res.json();
  } else {
    const isCodigo = /^\d+$/.test(busca.trim());
    const body = isCodigo
      ? { codigo_produto: busca.trim() }
      : { nome_produto: busca.trim() };
    const res = await fetchWithAuth(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Erro ao buscar produtos");
    return res.json();
  }
};

const ProductDetailModal = dynamic(
  () => import("../components/ProductDetailModal"),
  { ssr: false }
);

export default function ProdutosPage() {
  const usuario = useGlobalStore((state) => state.usuario);
  const setUsuario = useGlobalStore((state) => state.setUsuario);
  const router = useRouter();
  const [modalProduto, setModalProduto] = useState<any | null>(null);
  const [busca, setBusca] = useState("");
  const [filtroFavoritos, setFiltroFavoritos] = useState(false);
  const [ordenar, setOrdenar] = useState("preco-asc");
  const favoritos = useGlobalStore((state) => state.favoritos);
  const setFavoritos = useGlobalStore((state) => state.setFavoritos);
  const toggleFavorito = useGlobalStore((state) => state.toggleFavorito);

  // Debounce busca
  const buscaDebounced = useDebounce(busca, 400);

  // Carregar usuário e favoritos do localStorage
  useEffect(() => {
    const nome = localStorage.getItem("usuario");
    if (nome) setUsuario(nome);
    const fav = localStorage.getItem("favoritos");
    setFavoritos(fav ? JSON.parse(fav) : []);
  }, [setUsuario, setFavoritos]);

  // Salvar favoritos no localStorage
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  // SWR para produtos
  const {
    data: produtos = [],
    error,
    isLoading,
    mutate,
  } = useSWR(
    [
      "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar",
      buscaDebounced,
    ],
    produtosFetcher
  );

  // Ordenação local
  const produtosOrdenados = [...produtos]
    .filter((p) =>
      filtroFavoritos ? favoritos.includes(String(p.codigo)) : true
    )
    .sort((a, b) => {
      if (ordenar === "preco-asc")
        return parseFloat(a.preco) - parseFloat(b.preco);
      if (ordenar === "preco-desc")
        return parseFloat(b.preco) - parseFloat(a.preco);
      if (ordenar === "nome-asc") return a.nome.localeCompare(b.nome);
      if (ordenar === "nome-desc") return b.nome.localeCompare(a.nome);
      return 0;
    });

  // Tentar novamente
  function tentarNovamente() {
    mutate();
  }

  return (
    <AuthGuard>
      {/* Filtros */}
      <div className="bg-white w-7xl pt-8 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mx-auto">
        <div className="flex gap-2 items-center">
          <label htmlFor="busca" className="sr-only">
            Buscar por nome ou código
          </label>
          <input
            id="busca"
            type="text"
            placeholder="Buscar por nome ou código"
            className="border rounded px-3 py-2 focus:outline focus:outline-2"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            autoComplete="off"
          />
          <button
            className={`border px-3 py-2 rounded ${
              filtroFavoritos ? "bg-[#7FBC03] text-white" : ""
            }`}
            onClick={() => setFiltroFavoritos((v) => !v)}
          >
            Mostrar apenas favoritos
          </button>
        </div>
        <div className="flex gap-2">
          <select
            className="border rounded px-3 py-2"
            value={ordenar}
            onChange={(e) => setOrdenar(e.target.value)}
          >
            <option value="preco-asc">Preço: Menor para maior</option>
            <option value="preco-desc">Preço: Maior para menor</option>
            <option value="nome-asc">Nome: A → Z</option>
            <option value="nome-desc">Nome: Z → A</option>
          </select>
        </div>
      </div>

      {/* Erro */}
      {error && (
        <div className="bg-red-100 text-red-700 rounded px-4 py-2 text-center m-8">
          Erro ao carregar produtos.{" "}
          <button className="underline text-red-700" onClick={tentarNovamente}>
            Tentar novamente
          </button>
        </div>
      )}

      {/* Grid de produtos */}
      <main className="sm:px-8 md:px-8 lg:px-0 py-8 flex justify-center">
        {isLoading ? (
          <div className="sm:w-full md:w-full lg:max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : produtosOrdenados.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            Nenhum produto encontrado.
          </div>
        ) : (
          <div className="sm:w-full md:w-full lg:max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {produtosOrdenados.map((produto) => (
              <ProductCard
                key={produto.codigo}
                produto={produto}
                favoritos={favoritos}
                toggleFavorito={toggleFavorito}
                onOpenModal={setModalProduto}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal de detalhe rápido */}
      <Modal open={!!modalProduto} onClose={() => setModalProduto(null)}>
        {modalProduto && (
          <div>
            <div className="flex flex-col items-center gap-2">
              <img
                src={
                  modalProduto.imagem ||
                  "/assets/images/produto-placeholder.png"
                }
                alt={modalProduto.nome}
                className="h-32 w-32 object-contain mb-2"
              />
              <div className="font-bold text-lg">{modalProduto.nome}</div>
              <div className="text-gray-500 text-sm">{modalProduto.codigo}</div>
              <div className="flex items-center justify-center gap-2 p-2 border border-gray-200 rounded w-auto h-[32px] bg-white">
                <img
                  src="/assets/images/package-icon.svg"
                  alt="Selo"
                  className="h-[40px] mb-4 bg-white"
                />
                <span className="text-[10px] text-gray-500 font-semibold">
                  com embalagem especial
                </span>
              </div>
              <div className="text-xs text-gray-500 text-center mb-2">
                {modalProduto.descricao}
              </div>
              <div className="text-center text-sm text-gray-700 mb-2">
                a partir de{" "}
                <span className="font-bold">
                  {formatBRL(modalProduto.preco)}
                </span>
              </div>
              <button
                className="bg-[#7FBC03] text-white font-bold rounded py-2 px-6 mt-2 focus:outline focus:outline-2"
                onClick={() => setModalProduto(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ProductDetailModal
        open={!!modalProduto}
        produto={modalProduto}
        onClose={() => setModalProduto(null)}
        formatBRL={formatBRL}
      />
    </AuthGuard>
  );
}

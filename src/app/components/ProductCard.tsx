import { Star } from "lucide-react";

type ProductCardProps = {
  produto: any;
  favoritos: string[];
  toggleFavorito: (codigo: string) => void;
  onOpenModal: (produto: any) => void;
};

export default function ProductCard({
  produto,
  favoritos,
  toggleFavorito,
  onOpenModal,
}: ProductCardProps) {
  // Exemplo de cores, ajuste conforme sua API
  const cores =
    produto.cores && Array.isArray(produto.cores)
      ? produto.cores
      : [
          "#ff6600",
          "#009fe3",
          "#f9d900",
          "#00a859",
          "#e30613",
          "#231f20",
          "#ffffff",
          "#8c8c8c",
          "#3b3b3b",
        ];

  return (
    <div className="flex flex-col items-center" style={{ maxWidth: 260 }}>
      <div
        className="flex flex-col items-center justify-center"
        style={{ height: 68 }}
      >
        <div className="text-center font-bold text-[14px] leading-tight mt-2 capitalize">
          {produto.nome}
        </div>
        <div
          className="text-center text-[14px] text-black font-normal mb-1"
          style={{ letterSpacing: 1 }}
        >
          {produto.codigo}
        </div>
      </div>
      {/* Card visual */}
      <div
        className="rounded-lg shadow p-0 flex flex-col relative border border-gray-200 overflow-hidden w-full gap-2"
        style={{ minHeight: 390, height: 390, maxWidth: 260 }}
      >
        <div className="bg-white relative">
          {/* Favorito */}
          <button
            aria-label="Favoritar"
            className={`absolute top-2 left-2 text-xl z-10 ${
              favoritos.includes(String(produto.codigo))
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => toggleFavorito(String(produto.codigo))}
            tabIndex={0}
          >
            {favoritos.includes(String(produto.codigo)) ? (
              <Star size={16} fill="#facc15" stroke="#facc15" />
            ) : (
              <Star size={16} />
            )}
          </button>
          {/* Exclusivo */}
          <span className="absolute top-0 right-0 p-1 text-[10px] text-[#00b5e2] font-bold select-none bg-sky-100 rounded-bl">
            EXCLUSIVO!
          </span>
          {/* Imagem */}
          <div className="flex justify-center items-center pb-2 px-2">
            <img
              src={produto.imagem || "/assets/images/produto-placeholder.png"}
              alt={produto.nome}
              className="object-contain"
              style={{ height: 180, maxWidth: "100%" }}
            />
          </div>
          {/* Selo */}
          <div className="flex items-center justify-center gap-2 p-2 border border-gray-200 rounded w-[70%] h-[32px] bg-white absolute bottom-0 left-[-1%]">
            <img
              src="/assets/images/package-icon.svg"
              alt="Selo"
              className="h-[40px] mb-4 bg-white"
            />
            <span className="text-[10px] text-gray-500 font-semibold">
              com embalagem especial
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between flex-1 pb-2">
          {/* Descrição */}
          <div
            className="text-xs text-gray-700 px-4 mb-1"
            style={{ minHeight: 32, maxHeight: 110, overflowY: "auto" }}
          >
            {produto.descricao}
          </div>
          <div className="w-full flex items-center px-4 gap-8">
            {/* Cores */}
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold mb-1 text-black">Cores:</span>
              <div className="flex flex-wrap gap-1 mb-1">
                {cores.map((cor: string, i: number) => (
                  <span
                    key={i}
                    className="inline-block w-4 h-4 rounded-full border border-gray-300"
                    style={{ background: cor }}
                    title={cor}
                  />
                ))}
              </div>
            </div>
            {/* Preço */}
            <div className="flex flex-col items-end">
              <span className="text-[12px] text-gray-500 leading-tight">
                a partir de
              </span>
              <span className="text-[18px] font-bold text-black leading-none">
                {Number(produto.preco).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 2,
                })}
              </span>
              <span className="text-[10px] text-gray-400 mt-1 text-right">
                gerado pela melhor oferta
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Botão CONFIRA fora do card */}
      <button
        className="bg-[#7FBC03] text-white font-bold rounded-none py-2 w-full text-lg tracking-wide mt-4"
        style={{ maxWidth: 260 }}
        onClick={() => onOpenModal(produto)}
        tabIndex={0}
      >
        CONFIRA
      </button>
    </div>
  );
}

import { useEffect, useRef } from "react";

type ProductDetailModalProps = {
  open: boolean;
  produto: any;
  onClose: () => void;
  formatBRL: (value: string | number) => string;
};

export default function ProductDetailModal({
  open,
  produto,
  onClose,
  formatBRL,
}: ProductDetailModalProps) {
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

  if (!open || !produto) return null;

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
        <div className="flex flex-col items-center gap-2">
          <img
            src={produto.imagem || "/assets/images/produto-placeholder.png"}
            alt={produto.nome}
            className="h-32 w-32 object-contain mb-2"
          />
          <div className="font-bold text-lg">{produto.nome}</div>
          <div className="text-gray-500 text-sm">{produto.codigo}</div>
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
            {produto.descricao}
          </div>
          <div className="text-center text-sm text-gray-700 mb-2">
            a partir de{" "}
            <span className="font-bold">{formatBRL(produto.preco)}</span>
          </div>
          <button
            className="bg-[#7FBC03] text-white font-bold rounded py-2 px-6 mt-2 focus:outline focus:outline-2"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
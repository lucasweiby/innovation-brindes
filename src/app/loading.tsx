export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#7FBC03]">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-solid mb-6"></div>
        <span className="text-white text-xl font-semibold">Carregando...</span>
      </div>
    </div>
  );
}

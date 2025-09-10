import { useRouter } from "next/navigation";
import { useGlobalStore } from "../store/useGlobalStore";
import { LogOut } from "lucide-react";

export default function Header() {
  const usuario = useGlobalStore((state) => state.usuario);
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <header className="bg-[#7FBC03] w-full py-4 flex items-center justify-center">
      <div className="w-7xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/logo-white.png"
            alt="Innovation Brindes"
            className="h-10"
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img
              src="/assets/images/avatar.png"
              alt="Avatar"
              className="h-10 w-10 rounded-full border-2 border-white"
            />
            <div className="text-white text-sm">
              <div className="font-bold">
                {usuario || "Usuário desconhecido"}
              </div>
              <div>Quarta, 23/09/2020</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-transparent text-white p-2 rounded hover:bg-white/20 transition"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

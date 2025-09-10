"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "../store/useGlobalStore";
import { Lock, User } from "lucide-react";

export default function LoginForm() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/login/acessar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: usuario, senha }),
        }
      );
      const data = await res.json();

      if (data.status === 1 && data.token_de_acesso) {
        localStorage.setItem("token", data.token_de_acesso);
        localStorage.setItem("usuario", data.dados_usuario?.nome_usuario || "");
        useGlobalStore
          .getState()
          .setUsuario(data.dados_usuario?.nome_usuario || "");
        router.push("/produtos");
      } else {
        setErro("Usuário ou senha inválidos. Tente novamente.");
      }
    } catch {
      setErro("Erro ao conectar. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="w-[75%] flex flex-col gap-6" onSubmit={handleSubmit}>
      {erro && (
        <div className="bg-red-100 text-red-700 rounded px-4 py-2 text-center">
          {erro}
        </div>
      )}
      <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-sm">
        <span className="mr-3 text-gray-600">
          <User size={20} />
        </span>
        <input
          type="text"
          placeholder="Usuário"
          className="flex-1 bg-transparent outline-none text-gray-700"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-sm">
        <span className="mr-3 text-gray-600">
          <Lock size={20} />
        </span>
        <input
          type="password"
          placeholder="Senha"
          className="flex-1 bg-transparent outline-none text-gray-700"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between text-white text-sm mt-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="accent-[#5a9900]" />
          Manter logado
        </label>
        <a href="#" className="hover:underline text-white/80">
          Esqueceu a senha?
        </a>
      </div>
      <button
        type="submit"
        className="mt-6 bg-white text-[#5a9900] font-semibold rounded-full py-3 transition hover:bg-gray-100"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Login"}
      </button>
    </form>
  );
}

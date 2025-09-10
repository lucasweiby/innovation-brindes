import { create } from "zustand";

type GlobalState = {
  favoritos: string[];
  setFavoritos: (favoritos: string[]) => void;
  toggleFavorito: (codigo: string) => void;
  usuario: string | null;
  setUsuario: (usuario: string | null) => void;
};

export const useGlobalStore = create<GlobalState>((set, get) => ({
  favoritos: [],
  setFavoritos: (favoritos) => set({ favoritos }),
  toggleFavorito: (codigo) => {
    const { favoritos } = get();
    if (favoritos.includes(codigo)) {
      set({ favoritos: favoritos.filter((f) => f !== codigo) });
    } else {
      set({ favoritos: [...favoritos, codigo] });
    }
  },
  usuario: null,
  setUsuario: (usuario) => set({ usuario }),
}));

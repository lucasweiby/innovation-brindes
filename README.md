# Innovation Brindes – Catálogo de Produtos

Este projeto é um catálogo de produtos personalizado, desenvolvido em Next.js (App Router), com foco em performance, acessibilidade, SEO e experiência mobile-first.

---

## 🚀 Como rodar o projeto

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/seu-usuario/innovation-brindes.git
   cd innovation-brindes
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   - Crie um arquivo `.env.local` na raiz do projeto.
   - Exemplo de variáveis:
     ```
     NEXT_PUBLIC_API_BASE=https://apihomolog.innovationbrindes.com.br/api/innova-dinamica
     ```
   - (Adapte conforme o backend e endpoints utilizados.)

4. **Rode o projeto em modo desenvolvimento:**
   ```sh
   npm run dev
   ```
   O app estará disponível em [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Decisões técnicas

- **Next.js App Router**: Estrutura moderna, separando server/client components para melhor SEO e performance.
- **Zustand**: Gerenciamento global de estado para favoritos e usuário, leve e fácil de escalar.
- **SWR**: Cache, revalidação e estados de loading/erro automáticos para listagem de produtos.
- **Tailwind CSS**: Utilitário para estilização rápida, responsiva e consistente.
- **fetchWithAuth**: Interceptador centralizado para requisições autenticadas (Bearer token).
- **Componentização**: Cards, botões, modais e filtros são componentes reutilizáveis e testáveis.
- **Acessibilidade**: Labels, foco visível, alt em imagens, modal acessível (ESC/foco).
- **SEO**: Metadata exportado em server components (`page.tsx`) para `/produtos` e `/login`.
- **Testes**: Exemplos com Vitest + React Testing Library para componentes de UI.
- **Carregamento sob demanda**: Modal de detalhes do produto é carregado dinamicamente para otimizar o bundle inicial.

---

## 📝 O que ficou pendente

- Integração completa com `next/image` para todas as imagens (atualmente usa `<img>` em alguns pontos).
- Testes automatizados mais abrangentes (apenas exemplos básicos inclusos).
- Melhorias no tratamento de erros de autenticação e UX de login.
- Internacionalização (i18n) e suporte a múltiplos idiomas.
- Documentação de todos os endpoints utilizados.

---

## 📊 Lighthouse (desktop)

![Lighthouse Screenshot](./public/assets/lighthouse-desktop.png)

- **Performance:** 95+
- **Acessibilidade:** 100
- **Boas práticas:** 100
- **SEO:** 100

_(Os resultados podem variar conforme ambiente e conexão. Imagem meramente ilustrativa.)_

---

## 🎥 Demonstração do fluxo

![Demonstração do fluxo](./public/assets/demo-fluxo.gif)

- Busca por nome/código (parcial)
- Favoritar produtos
- Modal de detalhes carregado sob demanda
- Responsividade mobile/desktop

---

## 💡 Dicas

- Para rodar os testes:
  ```sh
  npm run test
  ```
- Para rodar Lighthouse, abra o DevTools do Chrome, vá em "Lighthouse" e gere o relatório.

---

## 📁 Estrutura de pastas

```
src/
  app/
    produtos/
      page.tsx
      ProdutosPageClient.tsx
      metadata.ts
    components/
      ProductCard.tsx
      ProductDetailModal.tsx
      FiltroFavoritosButton.tsx
      ...
    store/
      useGlobalStore.ts
    utils/
      fetchWithAuth.ts
```

---

## 🧑‍💻 Contribuição

Pull requests são bem-vindos! Siga o padrão de componentes, use Tailwind e mantenha a acessibilidade.

---

\*\*Innovation

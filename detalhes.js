document.addEventListener('DOMContentLoaded', async () => {
  const detalhesProduto = document.querySelector("#detalhes-produto");

  async function carregarDetalhes() {
      const urlParams = new URLSearchParams(window.location.search);
      const produtoId = urlParams.get('id');

      if (!produtoId) {
          detalhesProduto.innerHTML = '<p>Produto não encontrado.</p>';
          return;
      }

      try {
          const resposta = await fetch(`https://fakestoreapi.com/products/${produtoId}`);
          if (!resposta.ok) throw new Error('Erro na resposta da API');
          const produto = await resposta.json();

          const cardDetalhes = document.createElement("div");
          cardDetalhes.classList.add("card-detalhes");

          const imagem = document.createElement("img");
          imagem.src = produto.image;
          imagem.alt = produto.title;

          const titulo = document.createElement("h2");
          titulo.textContent = produto.title;

          const preco = document.createElement("div");
          preco.classList.add("preco");
          preco.textContent = `R$ ${produto.price.toFixed(2)}`;

          const descricao = document.createElement("p");
          descricao.textContent = produto.description;

          const botaoCarrinho = document.createElement("button");
          botaoCarrinho.textContent = "Adicionar ao Carrinho";
          botaoCarrinho.classList.add("botao-comprar");
          botaoCarrinho.addEventListener("click", () => {
              adicionarAoCarrinho(produto);
              alert('Produto adicionado ao carrinho');
          });

          cardDetalhes.append(imagem, titulo, preco, descricao, botaoCarrinho);
          detalhesProduto.appendChild(cardDetalhes);

          window.scrollTo({
              top: detalhesProduto.offsetTop,
              behavior: 'smooth'
          });
      } catch (error) {
          console.error('Erro ao carregar detalhes do produto:', error);
          detalhesProduto.innerHTML = '<p>Erro ao carregar detalhes do produto.</p>';
      }
  }

  function adicionarAoCarrinho(produto) {
      let itensCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      const produtoExistente = itensCarrinho.find(item => item.id === produto.id);

      if (produtoExistente) {
          produtoExistente.quantidade = (produtoExistente.quantidade || 1) + 1;
      } else {
          produto.quantidade = 1;
          itensCarrinho.push(produto);
      }

      localStorage.setItem("carrinho", JSON.stringify(itensCarrinho));
      atualizarContadorCarrinho();
  }

  function atualizarContadorCarrinho() {
      const contador = document.querySelector("#contador");
      if (contador) {
          const itensCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
          contador.textContent = itensCarrinho.reduce((total, item) => total + (item.quantidade || 1), 0);
      }
  }

  carregarDetalhes();
});

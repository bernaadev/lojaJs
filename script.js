document.addEventListener('DOMContentLoaded', () => {
    const resultado = document.querySelector("#resultado");
    const contador = document.querySelector("#contador");
  
    // Função para atualizar o carrinho
    function atualizarCarrinho() {
      const itensCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      contador.textContent = itensCarrinho.length;
    }
  
    async function carregarProdutos() {
      try {
        const resposta = await fetch("https://fakestoreapi.com/products");
        if (!resposta.ok) throw new Error('Erro na resposta da API');
        const dados = await resposta.json();
        
        dados.forEach((produto) => {
          const card = document.createElement("div");
          card.classList.add("card");
  
          const imagem = document.createElement("img");
          imagem.src = produto.image;
          imagem.alt = produto.title;
          imagem.classList.add("card-imagem");
  
          const texto = document.createElement("p");
          texto.textContent = produto.title;
          texto.classList.add("card-titulo");
  
          const preco = document.createElement("div");
          preco.textContent = (`R$ ${produto.price.toFixed(2)}`);
          preco.classList.add("card-preco");
  
          const botao = document.createElement("button");
          botao.textContent = "Comprar";
          botao.classList.add("botao-comprar");
          botao.addEventListener("click", () => {
            adicionarAoCarrinho(produto);
          });
  
          // Adiciona o evento de clique na imagem para redirecionar para a página de detalhes
          imagem.addEventListener("click", () => {
            window.location.href = `detalhes.html`;
          });
  
          card.append(imagem, texto, preco, botao);
          resultado.appendChild(card);
        });
      } catch (error) {
        console.error(error);
        resultado.innerHTML = '<p>Erro ao carregar produtos.</p>';
      }
    }
  
    // Função para adicionar produto ao carrinho
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
      atualizarCarrinho();
    }
  
    // Inicializa a página
    atualizarCarrinho();
    carregarProdutos();
  });
  
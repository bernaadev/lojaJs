document.addEventListener('DOMContentLoaded', () => {
    const conteudoCarrinho = document.querySelector("#conteudo-carrinho");
    const contador = document.querySelector("#contador");
  
    // Função para atualizar o carrinho
    function atualizarCarrinho() {
      const itensCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      contador.textContent = itensCarrinho.length;
      conteudoCarrinho.innerHTML = '';
  
      if (itensCarrinho.length === 0) {
        conteudoCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
      }
  
      let total = 0;
      const listaItens = document.createElement("ul");
      listaItens.classList.add("lista-itens");
  
      itensCarrinho.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("item-carrinho");
  
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.title;
        img.classList.add("item-imagem");
  
        const info = document.createElement("div");
        info.classList.add("info-item");
  
        const titulo = document.createElement("p");
        titulo.textContent = item.title;
  
        const preco = document.createElement("div");
        preco.textContent = `R$ ${(item.price * item.quantidade).toFixed(2)}`;
  
        const remover = document.createElement("button");
        remover.textContent = "Remover";
        remover.classList.add("botao-remover");
        remover.addEventListener("click", () => removerItemCarrinho(item.id));
  
        info.append(titulo, preco, remover);
        li.append(img, info);
        listaItens.appendChild(li);
  
        total += item.price * item.quantidade;
      });
  
      const totalElemento = document.createElement("div");
      totalElemento.classList.add("total");
      totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
  
      conteudoCarrinho.append(listaItens, totalElemento);
    }
  
    // Função para remover item do carrinho
    function removerItemCarrinho(id) {
      let itensCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      itensCarrinho = itensCarrinho.filter(item => item.id !== id);
      localStorage.setItem("carrinho", JSON.stringify(itensCarrinho));
      atualizarCarrinho();
    }
  
    // Inicializa a página
    atualizarCarrinho();
  });
  
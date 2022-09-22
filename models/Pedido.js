export default class Pedido {
  constructor(pratos, bebidas, sobremesas, containers) {
    this.pratos = pratos;
    this.bebidas = bebidas;
    this.sobremesas = sobremesas;
    this.containers = containers;
    this.selectedOptions = { prato: null, bebida: null, sobremesa: null };
    this.btnConfirmar = document.querySelector(".confirmar");
    this.btnCancelar = document.querySelector(".cancelar");
    this.btnPedir = document.querySelector(".fazer-pedido");
    this.modal = document.querySelector(".overlay");

    this.setup();
  }

  setup() {
    this.btnConfirmar.addEventListener("click", () => {
      this.enviarZap();
    });
    this.btnCancelar.addEventListener("click", () => {
      this.cancelarPedido();
    });
    this.btnPedir.addEventListener("click", () => {
      this.confirmarPedido();
    });
  }

  initialize() {
    this.pratos.forEach((prato) => {
      this.containers["prato"].appendChild(this.getOptionView(prato));
    });
    this.bebidas.forEach((bebida) => {
      this.containers["bebida"].appendChild(this.getOptionView(bebida));
    });
    this.sobremesas.forEach((sobremesa) => {
      this.containers["sobremesa"].appendChild(this.getOptionView(sobremesa));
    });
  }

  getOptionView(foodOption) {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      this.onSelect(foodOption, view);
    });
    view.innerHTML = `
      <img src="${foodOption.imagem}" />
      <div class="titulo">${foodOption.nome}</div>
      <div class="descricao">${foodOption.descricao}</div>
      <div class="fundo">
      <div class="preco">R$ ${foodOption.preco.toFixed(2)}</div>
      <div class="check">
          <ion-icon name="checkmark-circle"></ion-icon>
      </div>
      </div>
    `;

    return view;
  }

  onSelect(foodOption, view) {
    const selecionado = document.querySelector(`.${foodOption.tipo} .selecionado`);

    if (selecionado) {
      selecionado.classList.remove("selecionado");
    }

    view.classList.add("selecionado");

    this.selectedOptions[`${foodOption.tipo}`] = foodOption;
    this.verificarPedido();
  }

  getPrecoTotal() {
    const { prato, bebida, sobremesa } = this.selectedOptions;
    return prato.preco + bebida.preco + sobremesa.preco;
  }

  verificarPedido() {
    const { prato, bebida, sobremesa } = this.selectedOptions;
    if (prato && bebida && sobremesa) {
      this.btnPedir.classList.add("ativo");
      this.btnPedir.disabled = false;
      this.btnPedir.innerHTML = "Fazer pedido";
    }
  }

  cancelarPedido() {
    this.modal.classList.add("escondido");
  }

  confirmarPedido() {
    const { prato, bebida, sobremesa } = this.selectedOptions;
    this.modal.classList.remove("escondido");

    document.querySelector(".confirmar-pedido .prato .nome").innerHTML = prato.nome;
    document.querySelector(".confirmar-pedido .prato .preco").innerHTML = prato.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .bebida .nome").innerHTML = bebida.nome;
    document.querySelector(".confirmar-pedido .bebida .preco").innerHTML = bebida.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML = sobremesa.nome;
    document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML = sobremesa.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .total .preco").innerHTML = this.getPrecoTotal().toFixed(2);
  }

  enviarZap() {
    const { prato, bebida, sobremesa } = this.selectedOptions;
    const telefoneRestaurante = 553299999999;
    const encodedText = encodeURIComponent(
      `Olá, gostaria de fazer o pedido: \n- Prato: ${prato.nome} \n- Bebida: ${bebida.nome} \n- Sobremesa: ${
        sobremesa.nome
      } \nTotal: R$ ${this.getPrecoTotal().toFixed(2)}`
    );

    const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
    window.open(urlWhatsapp);
  }
}

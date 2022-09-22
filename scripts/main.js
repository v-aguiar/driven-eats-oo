import FoodOption from "../models/FoodOption.js";
import Pedido from "../models/Pedido.js";

const pratos = [
  new FoodOption(
    "Estrombelete de Frango",
    "img/frango_yin_yang.png",
    "Um pouco de batata, um pouco de salada",
    14.9,
    "prato"
  ),
  new FoodOption("Asa de Boi", "img/frango_yin_yang.png", "Com molho shoyu", 14.9, "prato"),
  new FoodOption("Carne de Monstro", "img/frango_yin_yang.png", "Com batata assada e farofa", 14.9, "prato"),
];

const bebidas = [
  new FoodOption("Coquinha gelada", "img/coquinha_gelada.png", "Lata 350ml", 4.9, "bebida"),
  new FoodOption("Caldo de Cana", "img/coquinha_gelada.png", "Copo 600ml", 4.9, "bebida"),
  new FoodOption("Corote Gelado", "img/coquinha_gelada.png", "Garrafa 400ml", 4.9, "bebida"),
];

const sobremesas = [
  new FoodOption("Pudim", "img/pudim.png", "Gosto de doce de leite", 7.9, "sobremesa"),
  new FoodOption("Flam", "img/pudim.png", "Gosto de chocolate", 7.9, "sobremesa"),
  new FoodOption("Brigadeiro", "img/pudim.png", "3 unidades", 7.9, "sobremesa"),
];

const pratosContainer = document.querySelector(".opcoes.prato");
const bebidasContainer = document.querySelector(".opcoes.bebida");
const sobremesasContainer = document.querySelector(".opcoes.sobremesa");

const containers = { prato: pratosContainer, bebida: bebidasContainer, sobremesa: sobremesasContainer };

const pedido = new Pedido(pratos, bebidas, sobremesas, containers);
pedido.initialize();

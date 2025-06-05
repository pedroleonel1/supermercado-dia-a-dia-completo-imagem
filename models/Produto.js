
import conexao from "../config/conexao.js";

const ProdutoSchema = new conexao.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  codigobarra: {
    type: String,
    required: true,
  },
  validade: {
    type: Date,
    required: true,
  },
  qtdproduto: {
    type: Number,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  destaque: {
    type: Boolean,
    default: false
  },
  
  categoria: {
    type: conexao.Schema.Types.ObjectId,
    ref: "Categoria", // <- refere-se ao model de Categoria
    required: true,
  },
});
const Produto = conexao.model("Produto", ProdutoSchema);

export default Produto;

import conexao from "../config/conexao.js";

const DestaqueSchema = new conexao.Schema({
  produto: {
    type: conexao.Schema.Types.ObjectId,
    ref: "Produto",
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
});

const Destaque = conexao.model("Destaque", DestaqueSchema);

export default Destaque;

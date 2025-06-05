import conexao from "../config/conexao.js";

const UsuarioSchema = new conexao.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
});
const Usuario = conexao.model("Usuario", UsuarioSchema);

export default Usuario;

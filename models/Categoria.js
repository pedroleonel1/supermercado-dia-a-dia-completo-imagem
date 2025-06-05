import conexao from "../config/conexao.js";


const CategoriaSchema = new conexao.Schema({
    nome: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    },
});

const Categoria = conexao.model("Categoria", CategoriaSchema);

export default Categoria;

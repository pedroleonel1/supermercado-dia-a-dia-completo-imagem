
import mongoose from "mongoose";
const url ="mongodb+srv://aluno02:aluno02@aluno02.efufgx3.mongodb.net/?retryWrites=true&w=majority&appName=aluno02";


const conexao = await mongoose.connect(url)

export default conexao;
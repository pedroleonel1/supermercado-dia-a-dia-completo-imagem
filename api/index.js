import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from '../routes/route.js'; // rotas externas
import { createServer } from 'http';



app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public


// Servir arquivos estáticos
app.use(express.static(join(__dirname, '../public')));
app.set('views', join(__dirname, '../views'));

// Rotas
app.use(routes)
app.listen(3001)
// Exporta o handler compatível com Vercel
import express from "express";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/public"));

import routes from "./routes/route.js";

import mongoose from "mongoose";
const url =
"mongodb+srv://aluno02:aluno02@aluno02.efufgx3.mongodb.net/?retryWrites=true&w=majority&appName=aluno02";
mongoose.connect(url);
console.log(mongoose.connect);

app.use(routes);

app.listen(3100);
export default app;
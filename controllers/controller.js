import path from "path";
import Produto from "../models/Produto.js";
import Usuario from "../models/Usuario.js";
import Destaque from "../models/Destaque.js";
import Categoria from "../models/Categoria.js";
import multer from "multer";

// Página inicial
export async function home(req, res) {
  res.render("admin/index");
}

// Configuração do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/fotos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({ storage });

// === USUÁRIOS ===
export async function abreaddusuario(req, res) {
  res.render("admin/usuario/addusuario");
}

export async function addusuario(req, res) {
  const usuario = await Usuario.create({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
  });
  await usuario.save();
  res.redirect("/admin/usuario/addusuario");
}

export async function listarusuario(req, res) {
  const usuarios = await Usuario.find({});
  res.render("admin/usuario/lstusuario", { usuarios });
}

export async function filtrarusuario(req, res) {
  const filtro = req.body.filtro;
  const usuarios = await Usuario.find({ nome: new RegExp(filtro, "i") });
  res.render("admin/usuario/lstusuario", { usuarios });
}

export async function deletausuario(req, res) {
  await Usuario.findByIdAndDelete(req.params.id);
  res.redirect("/admin/usuario/lstusuario");
}

export async function abreedtusuario(req, res) {
  const usuario = await Usuario.findById(req.params.id);
  res.render("admin/usuario/edtusuario", { Usuario: usuario });
}

export async function edtusuario(req, res) {
  const usuario = await Usuario.findById(req.params.id);
  usuario.nome = req.body.nome;
  usuario.email = req.body.email;
  usuario.senha = req.body.senha;
  await usuario.save();
  res.redirect("/admin/usuario/lstusuario");
}

// === PRODUTOS ===
export async function abreaddproduto(req, res) {
  const categorias = await Categoria.find();
  res.render("admin/produto/addproduto", { categorias });
}

export async function addproduto(req, res) {
  const imagem = req.file ? req.file.filename : null;

  await Produto.create({
    nome: req.body.nome,
    descricao: req.body.descricao,
    categoria: req.body.categoria,
    codigobarra: req.body.codigobarra,
    validade: req.body.validade,
    qtdproduto: req.body.qtdproduto,
    preco: req.body.preco,
    imagem: imagem,
  });

  res.redirect("/admin/produto/addproduto");
}

export async function listarproduto(req, res) {
  const produtos = await Produto.find().populate("categoria");
  res.render("admin/produto/lstproduto", { produtos });
}

export async function filtrarproduto(req, res) {
  const filtro = req.body.filtro;
  const produtos = await Produto.find({
    nome: new RegExp(filtro, "i"),
  }).populate("categoria");
  res.render("admin/produto/lstproduto", { produtos });
}

export async function deletaproduto(req, res) {
  const produtoID = req.params.id;
  await Produto.findByIdAndDelete(produtoID);
  await Destaque.deleteMany({ produto: produtoID });
  res.redirect("/admin/produto/lstproduto");
}

export async function abreedtproduto(req, res) {
  const produto = await Produto.findById(req.params.id).populate("categoria");
  const categorias = await Categoria.find();
  res.render("admin/produto/edtproduto", { produto, categorias });
}

export async function edtproduto(req, res) {
  const produto = await Produto.findById(req.params.id);
  produto.nome = req.body.nome;
  produto.descricao = req.body.descricao;
  produto.categoria = req.body.categoria;
  produto.codigoBarra = req.body.codigoBarra;
  produto.validade = req.body.validade;
  produto.qtdproduto = req.body.qtdproduto;
  produto.preco = req.body.preco;

  if (req.file) {
    produto.imagem = req.file.filename;
  }

  await produto.save();
  res.redirect("/admin/produto/lstproduto");
}

// === DESTAQUES ===
export async function addDestaque(req, res) {
  const produtoID = await Produto.findById(req.params.id).populate("categoria");
  await Destaque.create({
    produto: produtoID,
    categoria: produtoID.categoria.nome,
  });
  res.redirect("/admin/produto/lstproduto");
}

export async function listardestaque(req, res) {
  const destaques = await Destaque.find().populate("produto");
  res.render("admin/destaques/lstdestaques", { destaques });
}

export async function filtrardestaque(req, res) {
  const filtro = (req.body.filtro || "").toLowerCase().trim();
  const destaques = await Destaque.find().populate("produto");

  const filtrados = filtro === ""
    ? destaques
    : destaques.filter(
        (destaque) =>
          destaque.produto &&
          destaque.produto.nome.toLowerCase().includes(filtro)
      );

  res.render("admin/destaques/lstdestaques", { destaques: filtrados });
}

export async function deletadestaque(req, res) {
  await Destaque.findByIdAndDelete(req.params.id);
  res.redirect("/admin/destaques/lstdestaques");
}

// === CATEGORIAS ===
export async function abreaddcategoria(req, res) {
  res.render("admin/categoria/addcategoria");
}

export async function addcategoria(req, res) {
  await Categoria.create({ nome: req.body.nome });
  res.redirect("/admin/categoria/addcategoria");
}

export async function listarcategoria(req, res) {
  const categorias = await Categoria.find({});
  res.render("admin/categoria/lstcategoria", { categorias });
}

export async function filtrarcategoria(req, res) {
  const filtro = req.body.filtro;
  const categorias = await Categoria.find({ nome: new RegExp(filtro, "i") });
  res.render("admin/categoria/lstcategoria", { categorias });
}

export async function abreedtcategoria(req, res) {
  const categoria = await Categoria.findById(req.params.id);
  res.render("admin/categoria/edtcategoria", { categoria });
}

export async function edtcategoria(req, res) {
  const categoria = await Categoria.findById(req.params.id);
  categoria.nome = req.body.nome;
  await categoria.save();
  res.redirect("/admin/categoria/lstcategoria");
}

export async function deletacategoria(req, res) {
  await Categoria.findByIdAndDelete(req.params.id);
  res.redirect("/admin/categoria/lstcategoria");
}

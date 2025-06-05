import express from "express";
const router = express.Router();
import multer from "multer";
import path from "path";

// Configuração do multer para imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/"); // pasta onde as imagens serão salvas
  },
  filename: function (req, file, cb) {
    const nome = Date.now() + "-" + file.originalname;
    cb(null, nome);
  },
});
const upload = multer({ storage });

import {
  home,
  // Usuários
  abreedtusuario,
  edtusuario,
  deletausuario,
  listarusuario,
  filtrarusuario,
  abreaddusuario,
  addusuario,

  // Produtos
  abreaddproduto,
  addproduto,
  abreedtproduto,
  edtproduto,
  listarproduto,
  filtrarproduto,
  deletaproduto,

  // Destaques
  addDestaque,
  listardestaque,
  filtrardestaque,
  deletadestaque,

  // Categorias
  abreaddcategoria,
  addcategoria,
  listarcategoria,
  filtrarcategoria,
  abreedtcategoria,
  edtcategoria,
  deletacategoria,
} from "../controllers/controller.js";

// Rota principal
router.get("/", home);

// Usuário
router.get("/admin/usuario/addusuario", abreaddusuario);
router.post("/admin/usuario/addusuario", addusuario);
router.get("/admin/usuario/lstusuario", listarusuario);
router.post("/admin/usuario/filtrarusuario", filtrarusuario);
router.get("/admin/usuario/delusuario/:id", deletausuario);
router.get("/admin/usuario/edtusuario/:id", abreedtusuario);
router.post("/admin/usuario/edtusuario/:id", edtusuario);

// Produto
router.get("/admin/produto/addproduto", abreaddproduto);
router.post("/admin/produto/addproduto", upload.single("imagem"), addproduto); // upload com imagem
router.get("/admin/produto/edtproduto/:id", abreedtproduto);
router.post("/admin/produto/edtproduto/:id", upload.single("imagem"), edtproduto); // upload com imagem
router.get("/admin/produto/lstproduto", listarproduto);
router.post("/admin/produto/filtrarproduto", filtrarproduto);
router.get("/admin/produto/delproduto/:id", deletaproduto);

// Destaques
router.get("/admin/destaques/addDestaques/:id", addDestaque);
router.get("/admin/destaques/lstdestaques", listardestaque);
router.post("/admin/destaques/filtrardestaques", filtrardestaque);
router.get("/admin/destaques/deldestaques/:id", deletadestaque);

// Categorias
router.get("/admin/categoria/addcategoria", abreaddcategoria);
router.post("/admin/categoria/addcategoria", addcategoria);
router.get("/admin/categoria/lstcategoria", listarcategoria);
router.post("/admin/categoria/filtrarcategoria", filtrarcategoria);
router.get("/admin/categoria/edtcategoria/:id", abreedtcategoria);
router.post("/admin/categoria/edtcategoria/:id", edtcategoria);
router.get("/admin/categoria/delcategoria/:id", deletacategoria);

export default router;
// Importar o Express para criar o router
const express = require('express');
const router = express.Router();
// Importar as funções do Controller
// Desestruturamos o objeto para pegar cada função
const ProdutoController = require('../controllers/produtoController');
// ============================================================
// DEFINIÇÃO DAS ROTAS
// Cada rota chama uma função específica do Controller
// ============================================================
// IMPORTANTE: rotas mais específicas devem vir ANTES das genéricas!
// '/categoria/:cat' deve vir antes de '/:id' senão o Express
// vai interpretar 'categoria' como um ID.
// GET /produtos - Listar todos os produtos
router.get('/', ProdutoController.listarTodos);
// GET /produtos/categoria/:categoria - Buscar por categoria

// Esta rota DEVE vir antes de '/:id'
router.get('/categoria/:categoria', ProdutoController.buscarPorCategoria);
// GET /produtos/:id - Buscar produto específico por ID
router.get('/:id', ProdutoController.buscarPorId);
// POST /produtos - Criar novo produto
router.post('/', ProdutoController.criar);
// PUT /produtos/:id - Atualizar produto completo
router.put('/:id', ProdutoController.atualizar);
// DELETE /produtos/:id - Deletar produto
router.delete('/:id', ProdutoController.deletar);

module.exports = router;
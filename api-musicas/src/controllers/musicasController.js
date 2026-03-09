// Importar as funções do Model 
const ProdutoModel = require('../models/produtoModel');
// ============================================================ 
// FUNÇÃO: listarTodos 
// ROTA: GET /produtos 
// DESCRIÇÃO: Retorna todos os produtos cadastrados 
// ============================================================ 
function listarTodos(req, res) { 
 try { 
 // Chamar a função do Model para buscar os produtos 
 const produtos = ProdutoModel.listarTodos(); 
  
 // Retornar sucesso com status 200 
 res.status(200).json(produtos);
 } catch (erro) { 
 // Em caso de erro inesperado 
 res.status(500).json({ 
 mensagem: 'Erro ao listar produtos', 
 erro: erro.message 
 }); 
 } 
}
// ============================================================ // FUNÇÃO: buscarPorId 
// ROTA: GET /produtos/:id 
// DESCRIÇÃO: Retorna um produto específico pelo ID // ============================================================ 
function buscarPorId(req, res) { 
 try { 
 // Capturar o ID da URL e converter para número  
 const id = parseInt(req.params.id); 
  
 // VALIDAÇÃO: verificar se o ID é um número válido  ]
 if (isNaN(id)) { 
 return res.status(400).json({ 
 mensagem: 'ID inválido - deve ser um número'  }); 
 } 
  
 // Buscar o produto usando a função do Model  
 const produto = ProdutoModel.buscarPorId(id);   
 // Verificar se encontrou o produto 
 if (produto) { 
 res.status(200).json(produto); 
 } else { 
 res.status(404).json({ 
 mensagem: `Produto com ID ${id} não encontrado`  }); 
 } 
 } catch (erro) { 
 res.status(500).json({ 
 mensagem: 'Erro ao buscar produto', 
 erro: erro.message 
 }); 
 } 
}
// ============================================================ // FUNÇÃO: criar 
// ROTA: POST /produtos 
// DESCRIÇÃO: Cria um novo produto 
// ============================================================ 
function criar(req, res) { 
 try { 
 // Desestruturar os dados recebidos no body 
 const { nome, preco, estoque, categoria } = req.body;   
 // VALIDAÇÃO: verificar campos obrigatórios 
 if (!nome || !preco || !estoque || !categoria) { 
 return res.status(400).json({ 
 mensagem: 'Todos os campos são obrigatórios: nome, preco, estoque, categoria' 
 }); 
 } 
 // VALIDAÇÃO: preço deve ser positivo 
 if (parseFloat(preco) <= 0) { 
 return res.status(400).json({ 
 mensagem: 'O preço deve ser maior que zero' 
 }); 
 } 
  
 // VALIDAÇÃO: estoque não pode ser negativo 
 if (parseInt(estoque) < 0) { 
 return res.status(400).json({ 
 mensagem: 'O estoque não pode ser negativo' 
 }); 
 } 
 // Criar o produto usando a função do Model 
 const novoProduto = ProdutoModel.criar({ 
 nome, 
 preco, 
 estoque, 
 categoria 
 }); 

  // Retornar sucesso com status 201 (Created) 
 res.status(201).json(novoProduto); 
 } catch (erro) {
 res.status(500).json({ 
 mensagem: 'Erro ao criar produto', 
 erro: erro.message 
 }); 
 } 
} 
// ============================================================ // FUNÇÃO: atualizar 
// ROTA: PUT /produtos/:id 
// DESCRIÇÃO: Atualiza todos os dados de um produto 
// ============================================================ 
function atualizar(req, res) { 
 try { 
 // Capturar o ID da URL 
 const id = parseInt(req.params.id); 
  
 // Capturar os dados do body 
 const { nome, preco, estoque, categoria } = req.body; 
  
 // VALIDAÇÃO: ID deve ser válido 
 if (isNaN(id)) { 
 return res.status(400).json({ 
 mensagem: 'ID inválido' 
 }); 
 } 
  
// VALIDAÇÃO: todos os campos são obrigatórios no PUT 
 if (!nome || !preco || !estoque || !categoria) { 
 return res.status(400).json({ 
 mensagem: 'Todos os campos são obrigatórios para atualização completa'  }); 
 } 
  
 // VALIDAÇÃO: regras de negócio 
 if (parseFloat(preco) <= 0) { 
 return res.status(400).json({ 
 mensagem: 'O preço deve ser maior que zero' 
 }); 
 } 
  
 if (parseInt(estoque) < 0) { 
 return res.status(400).json({ 
 mensagem: 'O estoque não pode ser negativo'
 }); 
 } 
  
 // Atualizar usando a função do Model 
 const produtoAtualizado = ProdutoModel.atualizar(id, {  nome, 
 preco, 
 estoque, 
 categoria 
 }); 
  
 // Verificar se a atualização foi bem-sucedida  
 if (produtoAtualizado) { 
 res.status(200).json(produtoAtualizado); 
 } else { 
 res.status(404).json({ 
 mensagem: `Produto com ID ${id} não encontrado`  }); 
 } 
 } catch (erro) { 
 res.status(500).json({ 
 mensagem: 'Erro ao atualizar produto', 
 erro: erro.message 
 }); 
 } 
} 
// ============================================================ // FUNÇÃO: deletar 
// ROTA: DELETE /produtos/:id 
// DESCRIÇÃO: Remove um produto do sistema 
// ============================================================ 
function deletar(req, res) { 
 try { 
 // Capturar o ID da URL 
 const id = parseInt(req.params.id); 
  
 // VALIDAÇÃO: ID deve ser válido 
 if (isNaN(id)) { 
 return res.status(400).json({ 
 mensagem: 'ID inválido' 
 }); 
 } 
 
 // Deletar usando a função do Model 
 const deletado = ProdutoModel.deletar(id); 
  
 // Verificar se conseguiu deletar 
 if (deletado) { res.status(200).json({ 
 mensagem: `Produto com ID ${id} removido com sucesso`  }); 
 } else { 
 res.status(404).json({ 
 mensagem: `Produto com ID ${id} não encontrado`  }); 
 } 
 } catch (erro) { 
 res.status(500).json({ 
 mensagem: 'Erro ao deletar produto', 
 erro: erro.message 
 }); 
 } 
} 
// ============================================================ // FUNÇÃO: buscarPorCategoria 
// ROTA: GET /produtos/categoria/:categoria 
// DESCRIÇÃO: Filtra produtos por categoria 
// ============================================================ 
function buscarPorCategoria(req, res) { 
 try { 
 // Capturar a categoria da URL 
 const { categoria } = req.params; 
  
 // Buscar produtos usando a função do Model 
 const produtos = ProdutoModel.buscarPorCategoria(categoria);   
 // Retornar os produtos encontrados (mesmo que seja array vazio)  res.status(200).json(produtos); 
 } catch (erro) { 
 res.status(500).json({ 
 mensagem: 'Erro ao buscar produtos por categoria',  erro: erro.message 
 }); 
 } 
}
// ============================================================ // EXPORTAR TODAS AS FUNÇÕES 
// Disponibiliza as funções para o arquivo de rotas 
// ============================================================ 
module.exports = { 
 listarTodos, 
 buscarPorId, 
 criar, 
 atualizar, 
 deletar, 
 buscarPorCategoria 
}; 

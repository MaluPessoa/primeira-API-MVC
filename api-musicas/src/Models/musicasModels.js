// ============================================================ // SIMULAÇÃO DO BANCO DE DADOS 
// Array que armazena os produtos em memória 
// ============================================================ 
let produtos = [ 
 { 
 id: 1, 
 nome: 'Notebook', 
 preco: 3500, 
 estoque: 10, 
 categoria: 'Informatica' 
 }, 
 { 
 id: 2, 
 nome: 'Mouse Gamer', 
 preco: 150, 
 estoque: 50, 
 categoria: 'Informatica'
  }, 
]; 
// Variável que controla o próximo ID disponível let proximoId = 3; 
// ============================================================ // FUNÇÃO: listarTodos 
// DESCRIÇÃO: Retorna todos os produtos cadastrados // RETORNO: Array de produtos 
// ============================================================ 
function listarTodos() { 
 return produtos; 
} 
// ============================================================ // FUNÇÃO: buscarPorId 
// DESCRIÇÃO: Busca um produto específico pelo ID // PARÂMETRO: id (número) - identificador do produto // RETORNO: Objeto produto ou undefined se não encontrar // ============================================================ 
function buscarPorId(id) { 
 // find() retorna o primeiro elemento que satisfaz a condição  
 return produtos.find(p => p.id === id); 
}
// ============================================================ // FUNÇÃO: criar 
// DESCRIÇÃO: Cria um novo produto no array 
// PARÂMETRO: dados (objeto) - contém nome, preco, estoque, categoria // RETORNO: O produto criado com o ID gerado 
// ============================================================ 
function criar(dados) { 
 // Criar o objeto do novo produto 
 const novoProduto = { 
 id: proximoId++, // Atribui ID e incrementa  nome: dados.nome, 
 preco: parseFloat(dados.preco), // Converte para número  estoque: parseInt(dados.estoque), // Converte para inteiro  categoria: dados.categoria, 
 }; 
  
 // Adicionar o produto ao array 
 produtos.push(novoProduto); 
  
 // Retornar o produto criado 
 return novoProduto; 
} 
// ============================================================ // FUNÇÃO: atualizar 
// DESCRIÇÃO: Atualiza todos os dados de um produto existente // PARÂMETROS: 
// - id (número): identificador do produto 
// - dados (objeto): novos dados do produto 
// RETORNO: Produto atualizado ou null se não encontrar // ============================================================ 
function atualizar(id, dados) { 
 // Encontrar a posição do produto no array 
 const indice = produtos.findIndex(p => p.id === id);   
 // Se não encontrou, retornar null 
 if (indice === -1) { 
 return null; 
 } 
  
 // Atualizar o produto mantendo o ID original 
 produtos[indice] = { 
 id, // Mantém o ID original  nome: dados.nome,
 preco: parseFloat(dados.preco), 
 estoque: parseInt(dados.estoque), 
 categoria: dados.categoria 
 }; 
  
 // Retornar o produto atualizado 
 return produtos[indice]; 
} 
// ============================================================ // FUNÇÃO: deletar 
// DESCRIÇÃO: Remove um produto do array 
// PARÂMETRO: id (número) - identificador do produto // RETORNO: true se deletou, false se não encontrou // ============================================================ 
function deletar(id) { 
 // Encontrar a posição do produto 
 const indice = produtos.findIndex(p => p.id === id);   
 // Se não encontrou, retornar false 
 if (indice === -1) { 
 return false; 
 } 
  
 // Remover o produto do array 
 // splice(posição, quantidade) remove elementos  produtos.splice(indice, 1); 
 // Retornar true indicando sucesso 
 return true; 
} 
// ============================================================ // FUNÇÃO: buscarPorCategoria 
// DESCRIÇÃO: Filtra produtos por categoria 
// PARÂMETRO: categoria (string) - nome da categoria // RETORNO: Array com produtos da categoria (pode ser vazio) // ============================================================ 
function buscarPorCategoria(categoria) { 
 // filter() retorna um novo array com os que satisfazem  // toLowerCase() garante busca case-insensitive  
 return produtos.filter(p =>  p.categoria.toLowerCase() === categoria.toLowerCase()  );
} 
// ============================================================ 
// EXPORTAR AS FUNÇÕES 
// Tornamos as funções disponíveis para outros arquivos 
// ============================================================ 
module.exports = { 
 listarTodos, 
 buscarPorId, 
 criar, 
 atualizar, 
 deletar, 
 buscarPorCategoria 
}; 

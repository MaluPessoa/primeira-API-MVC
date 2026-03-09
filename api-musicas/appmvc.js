const express = require('express');
const app = express();
const PORT = 3000;
// Middleware para JSON
app.use(express.json());
// Importar as rotas
const musicasRoutes = require('./src/routers/produtoRouters');
// Registrar rotas com prefixo /produtos
// Todas as rotas do arquivo produtoRoutes.js
// ficarão disponíveis em /produtos/...
app.use('/musicas',  musicasRoutes);

app.listen(PORT, () => {
console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
console.log('📦 API MVC implementada com sucesso!');
});
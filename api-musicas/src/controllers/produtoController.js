const musicasModel = require('../models/produtoModels');

function listarTodos(req, res) {
    try {
        const musicas = musicasModel.listarTodos();
        res.status(200).json(musicas);

    } catch (erro) {

        res.status(500).json({
            mensagem: 'Erro ao listar as músicas',
            erro: erro.message
        });
    }
}

function buscarPorId(req, res) {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                mensagem: 'ID inválido - deve ser um número'
            });
        }

        const musica = musicasModel.buscarPorId(id);

        if (musica) {
            res.status(200).json(musica);
        } else {
            res.status(404).json({
                mensagem: `musica com ID ${id} não encontrado`
            });
        }

    } catch (erro) {

        res.status(500).json({
            mensagem: 'Erro ao buscar a musica',
            erro: erro.message
        });
    }
}

async function criar(req, res) {

    const { nomeMusica, criador, categoria, link } = req.body;

    try {

        if (!nomeMusica || !criador || !categoria || !link) {
            return res.status(400).json({
                mensagem: 'Todos os campos são obrigatórios: nomeMusica, criador, categoria, link'
            });
        }

        const novaMusica = musicasModel.criar({
            nomeMusica,
            criador,
            categoria,
            link
        });

        return res.status(201).json({
            mensagem: 'Música criada com sucesso!',
            dados: novaMusica
        });

    } catch (error) {

        return res.status(500).json({
            mensagem: 'Erro interno no servidor.',
            erro: error.message
        });
    }
}

function atualizar(req, res) {

    try {

        const id = parseInt(req.params.id);
        const { nomeMusica, criador, categoria, link } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                mensagem: "ID inválido"
            });
        }

        if (!nomeMusica || !criador || !categoria || !link) {
            return res.status(400).json({
                mensagem: "Todos os campos são obrigatórios para atualização completa"
            });
        }

        const musicaAtualizada = musicasModel.atualizar(id, {
            nomeMusica,
            criador,
            categoria,
            link
        });

        if (musicaAtualizada) {
            res.status(200).json(musicaAtualizada);
        } else {
            res.status(404).json({
                mensagem: `Música com ID ${id} não encontrada`
            });
        }

    } catch (erro) {

        res.status(500).json({
            mensagem: "Erro ao atualizar música",
            erro: erro.message
        });
    }
}

function deletar(req, res) {

    try {

        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                mensagem: 'ID inválido'
            });
        }

        const deletado = musicasModel.deletar(id);

        if (deletado) {
            res.status(200).json({
                mensagem: `musica com ID ${id} removido com sucesso`
            });
        } else {
            res.status(404).json({
                mensagem: `musica com ID ${id} não encontrado`
            });
        }

    } catch (erro) {

        res.status(500).json({
            mensagem: 'Erro ao deletar musica',
            erro: erro.message
        });
    }
}

function buscarPorCategoria(req, res) {

    try {

        const { categoria } = req.params;

        const musicas = musicasModel.buscarPorCategoria(categoria);

        res.status(200).json(musicas);

    } catch (erro) {

        res.status(500).json({
            mensagem: 'Erro ao buscar musicas por categoria',
            erro: erro.message
        });
    }
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
    buscarPorCategoria
};
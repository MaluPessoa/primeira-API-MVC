const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

let musicas = [
    {
        id: 1,
        nomemusica: "Pay no Rent",
        autor: "Turnpike Troubadours",
        link: "https://www.youtube.com/watch?v=sieOSRVQh3Q&quot&quot"
    },
        {
        id: 2,
        nomemusica: "The Cowboy in Me",
        autor: "Tim McGraw",
        link: "https://www.youtube.com/watch?v=9ECKaPrAGds&quot&quot"
    },
        {
        id: 3,
        nomemusica: "Workin' Overtime",
        autor: "Lainey Wilson",
        link: "https://www.youtube.com/watch?v=xJX4jAEpsp0&quot&quot"
    },
        {
        id: 4,
        nomemusica: "Straight Up Sideways",
        autor: "Lainey Wilson",
        link: "https://www.youtube.com/watch?v=YMsa8nGF9VQ&quot&quot"
    }
]

let proximoId = 5

app.get("/musicas", (req, res) => {
    res.status(200).json(musicas);
});

app.get("/musicas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const musica = musicas.find((p) => p.id === id);

    if (musica) {
        res.status(200).json(musica);
    } else {
        res.status(404).json({ msg: "Música não encontrada" });
    }
});

app.get("/musicas/nome/:nomeid", (req, res) => {
    const nome = req.params.nomeid;
    const nomeID = musicas.find((n) => n.nome === nome);

    if (nomeID) {
        res.status(200).json(nomeID);
    } else {
        res.status(404).json({ msg: "Música não encontrada" });
    }
});

app.post("/musicas", (req, res) => {
    const {nomemusica, autor, link} = req.body;

    if (!nomemusica || !autor || !link) {
        return res.status(400).json({ msg: "Dados Incompletos" });
    }

    const novo = {
        id: proximoId++,
        nomemusica,
        autor,
        link
    };

    musicas.push(novo);
    res.status(201).json(novo);
});

app.put("/musicas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {nomemusica, autor, link} = req.body;

    if (!nomemusica || !autor || !link) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios",
        });
    }

    const index = musicas.findIndex((p) => p.id === id);

    if (index !== -1) {
        musicas[index] = {
            id,
            nomemusica,
            autor,
            link
        };
        res.status(200).json(musicas[index]);
    } else {
        res.status(404).json({
            mensagem: `Música ${id} não encontrada`,
        });
    }
});

app.delete("/musicas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = musicas.findIndex((p) => p.id === id);

    if (index !== -1) {
        musicas.splice(index, 1);
        res.status(200).json({
            mensagem: `Música ${id} removida com sucesso`,
        });
    } else {
        res.status(404).json({
            mensagem: `Música ${id} não encontrada`,
        });
    }
});

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});

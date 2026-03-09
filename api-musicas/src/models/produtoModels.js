let musicas = [
{
id: 1,
nomeMusica: 'Desmistificar',
criador: "Marina Sena",
categoria: "Pop",
link: "https://www.youtube.com/watch?v=2NAlWaC1v44&list=RDHjWMpXwzpSU&index=2"
},
{
id: 2,
nomeMusica: 'Sentimento',
criador: "O Rappa",
categoria: "Rock alternativo",
link: "https://www.youtube.com/watch?v=w-rgE0VDPLM&list=RDw-rgE0VDPLM&start_radio=1"
},
{
id: 3,
nomeMusica: 'Zion Town',
criador: "Ras Sparrow Ft. Queen Sparrow",
categoria: "Reggae",
link:"https://www.youtube.com/watch?v=zJpWCTbgeOA&list=RDzJpWCTbgeOA&start_radio=1"
},
{
id: 4,
nomeMusica: 'Mágico de Oz',
criador: "Racionais MC's",
categoria: "Rap",
link:"https://www.youtube.com/watch?v=vzDcoPUxE_s"
}
];

let proximoId = 5;

function listarTodos() {
return musicas;
}

function buscarPorId(id) {
return musicas.find(p => p.id === id);
}

function criar(dados) {

const novaMusica = {
id: proximoId++, 
nomeMusica: dados.nomeMusica,
criador: dados.criador, 
categoria: dados.categoria, 
link: dados.link,
};

musicas.push(novaMusica);

return novaMusica;
}

function atualizar(id, dados) {

const indice = musicas.findIndex(p => p.id === id);

if (indice === -1) {
return null;
}

musicas[indice] = {
id: id,
nomeMusica: dados.nomeMusica,
criador: dados.criador,
categoria: dados.categoria,
link: dados.link
};

return musicas[indice];
}

function deletar(id) {

const indice = musicas.findIndex(p => p.id === id);
if (indice === -1) {
return false;
}

musicas.splice(indice, 1);

return true;
}

function buscarPorCategoria(categoria) {

return musicas.filter(p =>
p.categoria.toLowerCase() === categoria.toLowerCase()
);

}

module.exports = {
listarTodos,
buscarPorId,
criar,
atualizar,
deletar,
buscarPorCategoria
};
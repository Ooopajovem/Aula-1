
const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.send("A simple Node APP is" + ' Acho que nao')
    res.end()
})

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

let livros = [
    {id: 1, titulo: 'Livro1'},
    {id: 2, titulo: 'Livro2'},
    {id: 3, titulo: 'Livro3'}
]

app.get('/livros', (req, res) => {
    res.json(livros);
})
app.post('/livros', (req, res) => {
    const novoLivro = req.body
    livros.push(novoLivro)
    res.json(novoLivro)
})

app.put('/livros/:id', (req, res) => {
    const idLivro = parseInt(req.params.id)
    const atLivro = req.body.titulo;

    const atualizarLivro = livros.find(livro => livro.id === idLivro)

    if (atualizarLivro) {
        atualizarLivro.titulo = atLivro;
        res.json(atualizarLivro)
    }
    else {
        res.status(404).send('Livro  não encontrado')
    }
})

app.delete('/livros/:id', (req, res) => {
    const idLivro = parseInt(req.params.id)

    const remLivro = livros.findIndex(livro => livro.id === idLivro)
    
    if (remLivro !== -1){
        const remoLicro = livros.splice(remLivro, 1)
        res.json(remoLicro[0])
    }
    else {
        res.status(404).send('Livro não encontrado')
    }
})



const PORT = process.env.PORT||5001

app.listen(PORT,console.log(
    `Servidor iniciado na porta: ${PORT}`))



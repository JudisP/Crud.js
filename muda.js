const { urlencoded } = require('body-parser');
const { Router } = require('express');
const express = require('express');
const Connection = require('mysql/lib/Connection');
const app = express();
// const cors = require('cors');
const dotenv = require('dotenv');
const Cadastros = require('./models/cadastros');
const { response } = require('express');
dotenv.config();

// app.use(cors());
app.use(express.urlencoded({ extended : true}));
app.use(express.json());

// app.use('/', express.static(__dirname + '/src'));
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/src'));
// });

//Salvar no banco de dados
app.post("/cadastros", (req, res) =>{
    Cadastros.create({
        nome: req.body.nome,
        formacao: req.body.formacao,
        categoria: req.body.categoria,
        status: req.body.status,
        email: req.body.email,
        celular: req.body.celular
    }).then(() =>{
        console.log("dados cadastrados com sucesso!")
    }).catch((erro) =>{
        console.log("falha ao salvar os dados." + erro)
    })
})

//Receber informações do banco
app.get('/getAll', (req, res) => {
    // response.json({
    //     success: true
    // });
    const db= dbService.getDbServiceInstance();

    const result = db.getAllData();
    // response.json({
    //     sucess: true
    // });
})

//Editar no banco de dados
// app.get("/cadastros/:id", function(req, res){
//     Cadastros.query(' SELECT * FROM identificadors WHERE id = ?',[req.params.id], function(erro,resultado){
//         if(erro)
//         res.status(200).send('Erro: ' + erro)
//     })
//     res.status(200).send(resultado)
// })

// Deletar no banco de dados

app.listen(3000, function(){
    console.log("Servidor Rodando")
})
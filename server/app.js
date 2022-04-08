const express = require('express');
const app = express();
const cors = require('cors');
// const dotenv = require('dotenv');
const { response } = require('express');
// dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));


// create
app.post('/insert', (request, response) => {
    const { nomes } = {nomes: request.body.nome,
        formacao: request.body.formacao,
        categoria: request.body.categoria,
        status: request.body.status,
        email: request.body.email,
        celular: request.body.celular};
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(nomes);
    
    result.then(data => response.json({ success: true}))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result.then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
/*
// update
app.patch('/update', (req, resp) => {
    const { id, name } = request.body;
    const db = serve.getDbServiceInstance();

    const result = db.updateNameById(id, name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (req, res) => {
    const { id } = request.params;
    const db = serve.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.get('/search/:name', (req, res) => {
    const { name } = request.params;
    const db = serve.getDbServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})*/

app.listen(3000, function(){
    console.log("Servidor Rodando")
})
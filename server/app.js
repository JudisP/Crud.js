const express = require('express');
const app = express();
const cors = require('cors');
const { response } = require('express');

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));


// create
app.post('/insert', (request, response) => {

    const student = {nomes: request.body.nomes,
        formacao: request.body.formacao,
        categoria: request.body.categoria,
        status: request.body.status,
        email: request.body.email,
        celular: request.body.celular};
    const db = dbService.getDbServiceInstance();

    const result = db.InsertNewStudent(student);
    
    result.then(data => response.json())
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result.then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// update
app.put('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const id = request.params.id;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.listen(3000, function(){
    console.log("Servidor Rodando")
})
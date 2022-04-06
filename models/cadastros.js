const { Sequelize } = require('./server')
const dados = require('./server')

const Cadastros = dados.sequelize.define('identificadors', {
    nome: {
        type: Sequelize.STRING
    },
    formacao: {
        type: Sequelize.STRING
    },
    categoria: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    celular: {
        type: Sequelize.STRING
    }
})

// Cadastros.sync({force: true})

module.exports = Cadastros
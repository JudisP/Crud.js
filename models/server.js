const Connection = require('mysql/lib/Connection')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('testcrud', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!")
}).catch(function(erro){
    console.log("Falha ao se conectar: "+ erro)
})

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService;
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM nome;";

                Connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    DbService: DbService
}
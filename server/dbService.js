// const Connection = require('mysql/lib/Connection')
// const Sequelize = require('sequelize')
// const sequelize = new Sequelize('testcrud', 'root', '12345', {
//     host: 'localhost',
//     dialect: 'mysql',
//     define: {
//         timestamps: false
//     }
// })

// sequelize.authenticate().then(function(){
//     console.log("Conectado com sucesso!")
// }).catch(function(erro){
//     console.log("Falha ao se conectar: "+ erro)
// })

// class DbService {
//     static getDbServiceInstance() {
//         return instance ? instance : new DbService;
//     }

//     async getAllData() {
//         try {
//             const response = await new Promise((resolve, reject) => {
//                 const query = "SELECT * FROM nome;";

//                 Connection.query(query, (err, results) => {
//                     if (err) reject(new Error(err.message));
//                     resolve(results);
//                 })
//             });

//             console.log(response);

//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

// module.exports = {
//     Sequelize: Sequelize,
//     sequelize: sequelize
// }


const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dev',
    password: '12345',
    database: 'testcrud',
    port: '3306'
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    //console.log('Banco ' + connection.state);
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
             const response = await new Promise((resolve, reject) => {
                // {define:{freezeTableName:true}}
                 
                const query = "SELECT * FROM identificadors;";/*WHERE id = ?";"*/

                connection.query(query, /*[id],*/ (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            //console.log(response);
            return response;

        } catch (error) {
           console.log(error);
        }
    }

    async InsertNewName(nomes) {
        try {
            const insertId = await new Promise((resolve, reject, response, request) => {

                // const cad = {nomes: request.body.nome,
                // formacao: request.body.formacao,
                // categoria: request.body.categoria,
                // status: request.body.status,
                // email: request.body.email,
                // celular: request.body.celular};

                const query = "INSERT INTO identificadors (nomes, formacao, categoria, status, email, celular) VALUE (?, ?, ?, ?, ?, ?);";

                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.isertId);
                })
            });
            console.log(insertId);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}


//     async insertNewName(name) {
//         try {
//             const dateAdded = new Date();
//             const insertId = await new Promise((resolve, reject) => {
//                 const query = "INSERT INTO names (name, date_added) VALUES (?,?);";

//                 connection.query(query, [name, dateAdded] , (err, result) => {
//                     if (err) reject(new Error(err.message));
//                     resolve(result.insertId);
//                 })
//             });
//             return {
//                 id : insertId,
//                 name : name,
//                 dateAdded : dateAdded
//             };
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async deleteRowById(id) {
//         try {
//             id = parseInt(id, 10); 
//             const response = await new Promise((resolve, reject) => {
//                 const query = "DELETE FROM names WHERE id = ?";
    
//                 connection.query(query, [id] , (err, result) => {
//                     if (err) reject(new Error(err.message));
//                     resolve(result.affectedRows);
//                 })
//             });
    
//             return response === 1 ? true : false;
//         } catch (error) {
//             console.log(error);
//             return false;
//         }
//     }

//     async updateNameById(id, name) {
//         try {
//             id = parseInt(id, 10); 
//             const response = await new Promise((resolve, reject) => {
//                 const query = "UPDATE names SET name = ? WHERE id = ?";
    
//                 connection.query(query, [name, id] , (err, result) => {
//                     if (err) reject(new Error(err.message));
//                     resolve(result.affectedRows);
//                 })
//             });
    
//             return response === 1 ? true : false;
//         } catch (error) {
//             console.log(error);
//             return false;
//         }
//     }

//     async searchByName(name) {
//         try {
//             const response = await new Promise((resolve, reject) => {
//                 const query = "SELECT * FROM names WHERE name = ?;";

//                 connection.query(query, [name], (err, results) => {
//                     if (err) reject(new Error(err.message));
//                     resolve(results);
//                 })
//             });

//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

module.exports = DbService;
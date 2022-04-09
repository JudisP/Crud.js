
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

                const query = "SELECT * FROM identificadors;";

                connection.query(query, /*[id],*/(err, results) => {
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

    async InsertNewStudent(student) {
        try {
            const insertId = await new Promise((resolve, reject) => {

                const query = "INSERT INTO identificadors (nomes, formacao, categoria, status, email, celular) VALUE (?, ?, ?, ?, ?, ?);";

                connection.query(query, [student.nomes, student.formacao, student.categoria, student.status, student.email, student.celular], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return insertId;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM identificadors WHERE id = ?";

                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, nome) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE identificadors SET nomes = ? WHERE id = ?";

                connection.query(query, [nome, id] , (err, result) => {
                    if (err){
                        console.log(err)
                        reject(new Error(err.message));
                    }
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = DbService;
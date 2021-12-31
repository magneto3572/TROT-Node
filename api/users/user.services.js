const res = require("express/lib/response");
const pool = require("../../config/database");

module.exports = {
    create : (data, callback) =>{
        pool.query(
            `insert into registration(first_name, last_name, gender, email, password, number)
                    values(?,?,?,?,?,?)`,
                    [
                        data.first_name,
                        data.last_name,
                        data.gender,
                        data.email,
                        data.password,
                        data.number
                    ],
                    (error, results, fields) =>{
                        if(error){
                           return callback(error);
                        }
                        return callback(null, results);
                    }
        );
    },

    getUsers : callback =>{
        pool.query(
            `select id, first_name, last_name, gender, email, number from registration`,
            [],
            (error, results, fields) =>{
                if (error){
                    return callback(error);
                }
                return callback(null, results)
            }
        );
    },

    getUsersbyid : (id, callback) =>{
        pool.query(
            `select id, first_name, last_name, gender, email, number from registration where id = ?`,
            [id],
            (error, results, fields) =>{
                if (error){
                    return callback(error);
                }
                return callback(null, results[0])
            }
        );
    },

    updateusers :(data , callback) =>{
        pool.query(
            `update registration set first_name = ?, last_name = ?, gender = ?, email = ?, password =?, number =? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error, results, fields) =>{
                if(error){
                   return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    deleteUsersbyid :(id , callback) =>{
        pool.query(
            `delete from registration where id = ?`,
            [
                id
            ],
            (error, results, fields) =>{
                if(error){
                   return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getuserbyemail :(email , callback) =>{
        pool.query(
            `select * from registration where email = ?`,
            [
                email
            ],
            (error, results, fields) =>{
                if(error){
                   return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

};
const { compare } = require("bcrypt");
const { is } = require("express/lib/request");
const { json } = require("express/lib/response");
const res = require("express/lib/response");
const pool = require("../../database");

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

    createUserProfile : (data, callback) =>{
        pool.query(
            `insert into userprofile(name, address, email, number, gender, profile_image, user_dob)
                    values(?,?,?,?,?,?,?)`,
                    [
                        data.name,
                        data.address,
                        data.email,
                        data.number,
                        data.gender,
                        data.profile_image,
                        data.user_dob
                    ],
                    (error, results, fields) =>{
                        if(error){
                           return callback(error);
                        }
                        return callback(null, results);
                    }
        );
    },

    getUserProfilebyId : (id, callback) =>{
        pool.query(
            `select * from userprofile where user_id = ?`,
                    [
                        id
                    ],
                    (error, results, fields) =>{
                        if(error){
                           return callback(error);
                        }
                        return callback(null, results[0]);
                    }
        );
    },

    updateUserProfilebyId : (data, callback) =>{
        pool.query(
            `update userprofile set  address = ?, email = ?, gender = ?, profile_image = ?, user_dob = ? where user_id = ?`,
            [
                data.address,
                data.email,
                data.gender,
                data.profile_image,
                data.user_dob,
                data.user_id
            ],
            (error, results, fields) =>{
                if(error){
                   return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    fetchWalletBalance : (data, callback) =>{
        pool.query(
            `select * from wallet where wallet_id = ?`,
            [
                data.id
            ],
            (error, results, fields) =>{
                if(error){
                   return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    fetchTransactionHistory : (data, callback) =>{
        pool.query(
            `select * from transaction where user_id = ?`,
            [
                data.user_id
            ],
            (error, results, fields) =>{
                if(error){
                   return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    addTransactionDetails : (data, callback) =>{
        pool.query(
            `insert into transaction(amount, transaction_mode, ref_no, user_id, status)
                values(?,?,?,?,?)`,
            [
                data.amount,
                data.transaction_mode,
                data.ref_no,
                data.user_id,
                data.status
            ],
            (error, results, fields) =>{
                if(error){
                   return callback(error);
                }
                return callback(null, results);
            },
        )
    },

    gettimestamp : (data, callback) =>{
        pool.query(
            `select * from transaction where user_id = ?`,
            [
                data.user_id
            ],
            (error, results, fields) =>{
                if(error){
                   return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    addSubscription : (data, callback) =>{
           pool.query(
                        `insert into subscriptions(ride_type, duration, package_type, pickup_time, status, pickup_location, drop_location, user_id, ride_count, pickup_date)
                            values(?,?,?,?,?,?,?,?,?,?)`,
                        [
                            data.ride_type,
                            data.duration,
                            data.package_type,
                            data.pickup_time,
                            data.status,
                            data.pickup_location,
                            data.drop_location,
                            data.user_id,
                            data.ride_count,
                            data.pickup_date
                        ],
                        (error, results, fields) =>{
                            if(error){
                               return callback(error);
                            }
                            return callback(null, results);
                        }
                    )
    },

    getSubscription : (data, callback) =>{
        pool.query(
            `select * from subscriptions where user_id = ?`,
            [
               data.user_id,
               data.mon
            ],
            (error, results, fields) =>{
                if(error){
                   return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    updateridestatus : (data, callback) =>{
        pool.query(
            `update subscriptions set status = ? where user_id = ? `,
            [
               data.status = "completed",
               data.user_id
            ],
            (error, results, fields) =>{
                if(error){
                   return callback(error);
                }
                return callback(null, results);
            }
        )
    },
};
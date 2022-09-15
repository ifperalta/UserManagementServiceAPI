// DB config
let dbconfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stocks_app_db'
}

// DB Connection
export let mysql = require('mysql');
export let dbconnect = mysql.createConnection(dbconfig);
dbconnect.connect();

// insert fields
let user_fields: Array<string> = ["user_id", 
                                  "email", 
                                  "first_name",
                                  "last_name",
                                  "password",
                                  "login_token",
                                  "registered_date",
                                  "is_active"];

// list of all User Queries
export const userquery = {
    by_id : `SELECT 
                A.user_id, 
                A.first_name, 
                A.last_name, 
                A.email, 
                A.registered_date, 
                C.roleTypeID, 
                C.roleType, 
                A.is_active 
            FROM users AS A 
            JOIN role AS B ON A.id = B.userID 
            JOIN roletype AS C ON B.roleTypeID = C.roleTypeID  
            WHERE A.user_id = ?`,

    premium_query : `SELECT 
                            user_id, 
                            first_name, 
                            last_name, 
                            email, 
                            roleType 
                       FROM users AS A 
                       INNER JOIN role AS B ON A.id = B.userID
                       INNER JOIN roletype AS D ON D.roleTypeID = 1 WHERE B.roleTypeID = 1`,

    free_query : `SELECT 
                    user_id, 
                    first_name, 
                    last_name, 
                    email, 
                    roleType 
                    FROM users AS A 
                    INNER JOIN role AS B ON A.id = B.userID 
                    INNER JOIN roletype AS D ON D.roleTypeID = 2 WHERE B.roleTypeID = 2`,
    
    all_users:  `SELECT * FROM users`,
    insert_user:  `INSERT INTO users (`+ user_fields +`) VALUES ?;`,
    update_user_info : `UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE user_id = ?`,
    delete_user : `DELETE FROM USERS WHERE user_id = ?;`,
    user_authentication: `SELECT * FROM users WHERE email = ? AND password = ?`,
    update_login_token: `UPDATE users SET login_token = ? WHERE user_id = ?`,
    user_auth: `SELECT * FROM users WHERE login_token = ?`,
    remove_login_token: `UPDATE users SET login_token = ? WHERE login_token = ?`
}
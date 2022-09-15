import { dbconnect, userquery} from '../db';
import Users from './Users';

// function to generate a unique token
export function generateToken(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// function to get all the users
// promise wil allow to return a result object
export function QueryAllUsers() {
    return new Promise((resolve, reject) => {
        dbconnect.query(userquery.all_users, (err: Error, result: Users) => {
            if(err) return reject(err);
            resolve(Object.values(JSON.parse(JSON.stringify(result))));
        });
    });
}
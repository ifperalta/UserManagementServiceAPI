export default class Users{
    id!:	number
    user_id!:	string;
    email!: string;
    first_name!:	string;
    last_name!: string
    password!: string;
    registered_date!: Date;	
    is_active!: number;
    login_token!: string;
    
    // db queries
    length!: number;
    affectedRows!: number;
}
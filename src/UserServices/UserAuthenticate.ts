import { Request, Response } from 'express';
import Users from './Users';
import { dbconnect, userquery} from '../db';
import { generateToken } from './Functions';
import { md } from '../config';
import { UserAuthFailResponse, 
         UserAuthSuccessResponse, 
         ErrorResponse, 
         GetResponseJson} from "../Library/Response"

let token: string;

// authenticate user credintials
export const authenticate = async (req: Request, res: Response) => {
    await dbconnect.query(userquery.user_authentication, [req.body.email, md(req.body.password)], (error: Error, result: any) => {       
        if(error){  UserAuthFailResponse(res, "failed"); }        
        else{
            if(result.length > 0){
                token = generateToken(100);
                dbconnect.query(userquery.update_login_token, [token, result[0].user_id], (error: Error, result: any) => {
                    if(error)
                    UserAuthFailResponse(res, "failed");
                });
                UserAuthSuccessResponse(res, token);
            }else{
                UserAuthFailResponse(res, "failed");
            }    
        }    
    }); 
}

// authenticate user if logged in
export const userauth = async (req: Request, res: Response) => {
    await dbconnect.query(userquery.user_auth, [req.params.token], (error: Error, result: any) => {       
        if(error)
            ErrorResponse(error, res);
        else if(result.length > 0) 
            res.send(true);
        else
            res.send(false);
    }); 
}

// signout user and remove login token
export const signout = async (req: Request, res: Response) => {
    await dbconnect.query(userquery.remove_login_token, ["", req.params.token], (error: Error) => {       
        if(error)
        ErrorResponse(error, res);
        else
        res.send(true);
    }); 
}

export const userdata = async (req: Request, res: Response) => {
    await dbconnect.query(userquery.user_auth, [req.params.token], (error: Error, result: Users) => {       
        if(error)
        ErrorResponse(error, res);
        else
        GetResponseJson(res, result);
    }); 
}
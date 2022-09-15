import { Request, Response } from 'express';
import Users from './Users';
import { dbconnect, userquery, } from '../db';
import { md } from '../config';
import { v4 as uuidv4 } from 'uuid';
import { QueryAllUsers, generateToken } from './Functions';
import { ErrorResponse, GetResponseJson, ActionResponseJson, GetResponseAll} from "../Library/Response"

// get all users
export const getAllPremiums = async (req: Request, res: Response) => {
    await dbconnect.query(userquery.premium_query, (error: Error, result: Users ) => {
        if(error)
        ErrorResponse(error, res);
        else
        GetResponseJson(res, result);
    });
}

// get all users
export const getAllFree = async (req: Request, res: Response) => {
    await dbconnect.query(userquery.free_query, (error: Error, result: Users ) => {
        if(error)
        ErrorResponse(error, res);
        else
        GetResponseJson(res, result);
    });
}

// get user by email
export const getUserByID = async (req: Request, res: Response) => {
    await dbconnect.query(userquery.by_id, [req.params.user_id], (error: Error, result: Users) => {
        if(error)
        ErrorResponse(error, res);
        else
        GetResponseJson(res, result);
    });
}

// insert new user to db
export const addNewUser = async (req: Request, res: Response) => {
    let now = new Date();
    let newUser = [
        [ generateToken(5), req.body.email, req.body.first_name, req.body.last_name, md(req.body.password), '', now.toISOString(), 1]
    ];
    await dbconnect.query(userquery.insert_user, [newUser], (error: Error, result: Users) => {
        if(error)
        ErrorResponse(error, res);
        else
        ActionResponseJson(res, result);
    });
} 

// Update a user
export const updateUser = async (req: Request, res: Response) => {
    await dbconnect.query(userquery.update_user_info, [req.body.first_name, req.body.last_name, req.body.email, req.body.user_id], (error: Error, result: Users) => {
        if(error)
        ErrorResponse(error, res);
        else
        ActionResponseJson(res, result);
    });
}

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
    await dbconnect.query(userquery.delete_user, [req.params.user_id], (error: Error, result: Users)  => {
        if(error)
        ErrorResponse(error, res);
        else
        ActionResponseJson(res, result);
    });
}

//--------------------------------------------------------------

// get All Users
export const getAllUsers = async (req: Request, res: Response) => {
    const userdata = await QueryAllUsers();
    GetResponseAll(res, userdata);
}
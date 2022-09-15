import { Response } from 'express';
import Users from '../UserServices/Users';

const status = {
    success: 201,
    not_found: 404,
    error: 500
}

let response_status: number;

// json response to all query requests
export function GetResponseJson(res : Response, result: Users){
    (result.length > 0) ? response_status = status.success :  response_status = status.not_found;
    res.json({
        "status" : response_status,
        "response": result
    });
}

// update, delete, insert
export function ActionResponseJson(res : Response, result: Users){
    res.json({
        "status" : status.success,
        "response": result.affectedRows
    });
}

// return generic error messages
export function ErrorResponse(error: Error, res : Response){
    res.json({
        "status" : status.error,
        "response": error
    });
}

// json response to all query requests
export function GetResponseAll(res : Response, result: any){
    (result.length > 0) ? response_status = status.success :  response_status = status.not_found;
    res.json({
        "status" : response_status,
        "response": result
    });
}

// Authentication Success
export function UserAuthSuccessResponse(res : Response, token: string){
    res.json({
        "response": token
    });
}

// Authentication Faile
export function UserAuthFailResponse(res : Response, message: string){
    res.json({
        "response": message
    });
}

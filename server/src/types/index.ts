import {Request} from "express"
export interface AuthenticatedRequest extends Request {
    email:string
}
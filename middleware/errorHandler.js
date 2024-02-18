import { DEBUG_MODE } from '../config'
import {ValidationError} from 'joi'
import CustomErrorHandler from '../services/CustomErrorHandler' 
 const errorHandler=(err,req,res,next) => {
    let statusCode=500;
    let data={
        massage:"Internal Server Error",
        ...(DEBUG_MODE=="true" && {originalMassage: err.message})
    }

    if(err instanceof ValidationError) {
        statusCode=401;
        data={
            massage:err.message,
        }
       
    }
    if(err instanceof CustomErrorHandler) {
        statusCode=err.starus;
        data={
            massage:err.message,
        }
       
    }
    return res.status(statusCode).json(data)

}
export default errorHandler
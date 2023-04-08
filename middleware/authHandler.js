import CustomErrorHandler from '../services/CustomErrorHandler' 
const authHandler =(req,res,next)=>{
    const auth_headers = req.headers.authorization;
    if(!auth_headers){
        return next(CustomErrorHandler.unAuthorized())
    }
    const token = auth_headers.split(" ")[1];
    
}
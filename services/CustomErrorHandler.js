class CustomErrorHandler extends Error{
    constructor(starus,message){
        super()
        this.starus = starus;
        this.message = message;
    }
    static alreadyExists(message){
        return new CustomErrorHandler(409,message);
    }
    static wrongCredentials(message="Invalid credentials"){
        return new CustomErrorHandler(401,message);
    }
    static unAuthorized(message="unAuthorized"){
        return new CustomErrorHandler(403,message);
    }
}
export default CustomErrorHandler 
import jwt  from 'jsonwebtoken';
class JwtService{
    static sign(payload,secret,expiry='60s'){
        return jwt.sign(payload,secret,{expiresIn:expiry})
    }
    static verify(token,secret){
        jwt.verify(token,secret)
    }
}
export default JwtService;
import {User}  from '../models'
const userController={
    async me(req, res,next){
        try{
            const user =await User.findById(req.body.id,'name email address').exec()
            res.json(user)
        }catch(err){
         return next(err);
        }
    } 
}
export default userController
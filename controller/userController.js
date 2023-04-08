import {User}  from '../models'
const userController={
    async me(req, res,next){
        try{
            const user =await User.findOne({_id:req.body.id})
            console.log(user)
        }catch(err){
         return next(err);
        }
    } 
}
export default userController
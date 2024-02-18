import Joi from "joi";
import bcrypt from "bcrypt";
import { CustomErrorHandler, JwtService } from "../../services";
import { User } from "../../models";
import { JWT_SECRET } from "../../config";
const authController = {
  async register(req, res, next) {
    const registerScheme = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });
    const { error } = registerScheme.validate(req.body);
    if (error) {
      return next(error);
    }

    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExists("This email already exists")
        );
      }
    } catch (err) {
      return next(err);
    }
    const { name, email, password,address } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const data = {
      name,
      email,
      password: hashPassword,
      address
    };
    let token = "";
    try {
      const user = new User(data);
      const result = await user.save();
      token = JwtService.sign(
        { _id: result._id, role: result.role },
        JWT_SECRET
      );
    } catch (err) {
      return next(err);
    }
    res.json({ token });
  },
  async login(req, res, next) {
    const loginScheme = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    const { error } = loginScheme.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const token = JwtService.sign(
          { _id: user._id, role: user.role },
          JWT_SECRET
        );
        return res.json({ status: true, token: token });
      } else {
        return next(CustomErrorHandler.wrongCredentials());
      }
    } catch (err) {
      return next(err);
    }
  },
};
export default authController;

import { CustomErrorHandler, JwtService } from "../services";
import { JWT_SECRET } from "../config";
const authHandler = (req, res, next) => {
  const auth_headers = req.headers.authorization;
  if (!auth_headers) {
    return next(CustomErrorHandler.unAuthorized());
  }
  try {
    JwtService.verify(auth_headers, JWT_SECRET);
    return next();
  } catch (err) {
    return next(CustomErrorHandler.unAuthorized());
  }
};
export default authHandler;

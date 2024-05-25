import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { responseError } from '../utils/responseAPI.mjs';
import { errors } from "../utils/messageError.mjs";

dotenv.config();

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(errors.HTTP.CODE.INTERNAL_SERVER_ERROR).send(
      responseError(errors.HTTP.CODE.INTERNAL_SERVER_ERROR, errors.HTTP.STATUS.INTERNAL_SERVER_ERROR, "Unauthorized")
    )
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(errors.HTTP.CODE.INTERNAL_SERVER_ERROR).send(
      responseError(errors.HTTP.CODE.INTERNAL_SERVER_ERROR, errors.HTTP.STATUS.INTERNAL_SERVER_ERROR, e.message)
    )
  }
};

export default isAuthenticated;

import {prismaClient} from "../app/db.mjs";
import {ResponseError} from "../utils/responseError.mjs";
import {errors} from "../utils/messageError.mjs";

const test = async () => {
   const users=  prismaClient.user.findMany();
   if (!users) {
       throw new ResponseError(
           errors.HTTP.CODE.NOT_FOUND,
           errors.HTTP.STATUS.NOT_FOUND,
           errors.HTTP.MESSAGE.NOT_FOUND
       )
   }
   return users
}

export default {
    test
}

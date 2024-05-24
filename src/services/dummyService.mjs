import {prismaClient} from "../app/db.mjs";

const test = async () => {
   return prismaClient.user.findMany();
}

export default {
    test
}

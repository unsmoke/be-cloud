import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'

dotenv.config()

const getUserShop = async (requestUserId) => {
  const shopItemCount = await prismaClient.shopItem.count({
    where: { user_id: requestUserId },
  })

  if (shopItemCount === 0) {
    return { shop: [] }
  }

  const shop = await prismaClient.shopItem.findMany({
    where: { user_id: requestUserId },
    include: { user: false, item: true },
  })

  const formattedShop = shop.map((shop) => shop.item)

  return { shop: formattedShop }
}

const buyShopItem = async (requestUserId, requestBody) => {
  const { itemId } = requestBody

  const user = await prismaClient.user.findUnique({
    where: { user_id: requestUserId },
    select: { balance_coin: true },
  })

  const shopItem = await prismaClient.shopItem.findFirst({
    where: { user_id: requestUserId, item_id: itemId },
    include: { user: false, item: true },
  })

  if (!shopItem) {
    throw new ResponseError(
      errors.HTTP.CODE.BAD_REQUEST,
      errors.HTTP.STATUS.BAD_REQUEST,
      errors.ITEM.NOT_FOUND
    )
  }

  if (user.balance_coin < shopItem.item.price) {
    throw new ResponseError(
      errors.HTTP.CODE.BAD_REQUEST,
      errors.HTTP.STATUS.BAD_REQUEST,
      errors.USER.INSUFFICIENT_BALANCE
    )
  }

  await prismaClient.user.update({
    where: { user_id: requestUserId },
    data: { balance_coin: user.balance_coin - shopItem.item.price },
  })

  await prismaClient.userItem.create({
    data: { user_id: requestUserId, item_id: itemId },
  })

  await prismaClient.shopItem.deleteMany({ where: { user_id: requestUserId, item_id: itemId } })

  const formattedShop = shopItem.map((shop) => shop.item)

  return { shop: formattedShop }
}

export default { getUserShop, buyShopItem }

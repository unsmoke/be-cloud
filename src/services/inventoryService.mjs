import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'

dotenv.config()

const getInventory = async (requestUserId) => {

  const inventoryItemCount = await prismaClient.userItem.count({
    where: { user_id: requestUserId },
  })

  if (inventoryItemCount === 0) {
    return { inventory: [] };
  }

  const inventory = await prismaClient.userItem.findMany({
    where: { user_id: requestUserId },
    include: { user: false, item: { select: { item_id: true, name: true, description: true, price: true, img_url: true} } },
  })

  const formattedInventory = inventory.map((item) => item.item)

  return { inventory: formattedInventory };
}

export default { getInventory }

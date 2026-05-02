import ordersData from './orders.json'

export const orders = ordersData

export function getOrdersByUserId(userId) {
  return orders.filter(o => o.userId === Number(userId))
}

export function getOrderById(id) {
  return orders.find(o => o.id === Number(id))
}

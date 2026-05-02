import productsData from './products.json'

export const products = productsData

export function getProductById(id) {
  return products.find(p => p.id === Number(id))
}

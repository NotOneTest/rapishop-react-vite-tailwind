import usersData from './users.json'

export const users = usersData

export function getUserById(id) {
  return users.find(u => u.id === Number(id))
}

export function getUserByEmail(email) {
  return users.find(u => u.email === email)
}

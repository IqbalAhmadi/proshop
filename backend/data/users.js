import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('1234567890', 10), // hashed password
    isAdmin: true,
  },
  {
    name: 'Ibra',
    email: 'ibra@email.com',
    password: bcrypt.hashSync('1234567890', 10), // hashed password
    isAdmin: false,
  },
  {
    name: 'Baran',
    email: 'baran@email.com',
    password: bcrypt.hashSync('1234567890', 10), // hashed password
    isAdmin: false,
  },
]

export default users

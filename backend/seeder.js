import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

// import data into database
const importData = async () => {
  try {
    // clear all data in database
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // insert users data
    const createdUsers = await User.insertMany(users)

    // get admin user
    const adminUser = createdUsers[0]._id

    // insert products data
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    // exit with failure
    process.exit(1)
  }
}

// destroy data in database
const destroyData = async () => {
  try {
    // clear all data in database
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    // exit with failure
    process.exit(1)
  }
}

// check if we are importing or destroying data
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}

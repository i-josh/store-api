import dotenv from 'dotenv'
import { connectDB } from './db/connect.js'
import Product from './models/product.js'
import jsonProducts from './products.json' assert { type: 'json' }
dotenv.config()

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('success!!!');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()


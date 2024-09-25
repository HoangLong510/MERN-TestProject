import mongoose from "mongoose"

const connectDB = async () => {
	console.log('-------------------------------')
	console.log('Connecting to database...')
	console.log('-------------------------------')
	await mongoose.connect(process.env.MONGODB_URI, {
		dbName: process.env.DATABASE_NAME || 'test'
	})
}

export default connectDB
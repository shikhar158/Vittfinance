require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    const users = await mongoose.connection.db.collection('users').find().toArray()
    console.log('\n👥 Users found in DB:')
    users.forEach(u => console.log(` - ${u.name} (${u.email})`))
    await mongoose.disconnect()
  } catch (err) {
    console.error('Error listing users:', err.message)
  }
}
run()

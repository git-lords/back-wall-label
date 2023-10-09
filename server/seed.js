import connectToDB from "./db.js";
import bcrypt from 'bcryptjs'

const db = await connectToDB('postgresql:///backwalldb')

await db.sync({force: true}).then(async () => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync('test', salt)

    await User.create({username: 'tester', hashedPass: hash})
    console.log('db has been successfully reset and seeded!')
})
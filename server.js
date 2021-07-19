require('dotenv').config()

const users = require('./users.json')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require ('jsonwebtoken')


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error' , (error) => console.error(error))  
db.once('open' , () => console.log('Connection to database')) 


app.use(express.json())

const subscriberRouter = require('./routes/subscribers')
app.use('/subscribers', subscriberRouter)




app.post('/login', (req, res) => {
    const username = req.body.username
    const user = { name : username }
    const password = req.body.password

    if (users[username] && users[username] === password)
{ const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
   res.json({ accessToken: accessToken }) 
}
else {
    res.status(401).json({err : "unauthorized"})
}
})



app.listen(3000, () => console.log('Server Started'))
require('dotenv').config()

const express= require('express')

const app = express();
const cookieParser=require('cookie-parser')
const PORT = process.env.PORT || 3500 
const path = require('path')
const {logger} = require('./middleware/logger')
const errorHandler= require('./middleware/errorHandler')
const cors =require('cors')
const corsOptions=require('./config/corsOptions')

app.use(logger)
app.use(cors(corsOptions))

app.use(express.json())
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/',require('./routes/root'))

app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    } else if(req.accepts('json')){
        res.json({message:"404 Not Found"})
    } else {
        res.type('txt').send('404 Not found')
    }

})


app.listen(PORT,()=>{console.log(`server listening at port-${PORT}`)})
app.use(errorHandler)
import express, { Application, NextFunction } from "express"
import cors from 'cors'
import { dataSource } from "./src/config/ormconfig"
import errorhandler from "./src/middlewares/errorHandler.middleware"
import route from "./src/routes/routes"
import { CustomError } from "./src/errors/errorhandler"

const app: Application = express()

dataSource
.initialize()
.then(() => console.log("Connected"))
.catch((err) => console.log(err))

app.use(express.json())
app.use(cors())
app.use('/api/v1', route)
app.use('*', (_: express.Request, __: express.Response, next: express.NextFunction) => {
	next(new CustomError(`Given path is not found`, 404))
})
app.use(errorhandler)

app.listen(8080, () =>{
    console.log(8080)
})

// const server = http.createServer(async(req, res){
    // res.writeHead(200, {'Content-Type': 'text/plain'})
    // res.end('Hello World')
// })

// server.listen(9000, ()=>{
//     console.log(9000);
// })
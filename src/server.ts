import express from "express"
import helment from "helmet"
import cors from "cors"
import { mainRouter } from "./routers/main"

const server = express()
server.use(helment())
server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

const port = process.env.PORT || 3000

server.use(mainRouter)

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

import 'dotenv/config.js'
import express from 'express'
import path from 'path' //provides utilities for working with file and directory paths
import { fileURLToPath } from 'url' //ensures correct decodings of percent-encoded characters as well as ensuring a cross-platform valid absolute path string
import logger from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { router as usersRouter } from './routes/users.js'
import { router as authRouter } from './routes/auth.js'
import { router as charactersRouter } from './routes/characters.js'
import { router as profilesRouter } from './routes/profiles.js'
import { router as buildsRouter } from './routes/builds.js'

// Connect to database
import('./config/database.js')

//Create express app
const app = express()

// Mount middleware
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),'build'))) //need to figure out what this is doing....
app.use(cors())
app.use(logger('dev')) //HTTP request logger middleware for node.js
app.use(express.json()) //Now can access req.body
app.use(cookieParser()) //use cookie method of response object

// Mount routes
app.use('/api/users', usersRouter)
// app.use('/api/auth', authRouter)
app.use(authRouter)
app.use('/api/characters', charactersRouter)
app.use('/api/profiles', profilesRouter)
app.use('/api/builds', buildsRouter)

// Set cookies

// app.get('/*', function (req, res) {
//   res.sendFile(
//     path.resolve("build/index.html")
//   )
// })

//listen for requests at port 4000
const port = process.env.PORT || 4000

app.listen(port, ()=> {
  console.log(`Express is listening on port ${port}.`)
})
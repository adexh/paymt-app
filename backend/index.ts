import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connection from './utils/db'
import rootRouter from './routes/index'

const app = express();

const whitelist = [process.env.ORIGIN]
const corsOptions = {
  origin (origin: any, callFunc: any) {
    if (whitelist.includes(origin) || origin === undefined) {
      callFunc(null, true)
    } else {
      console.log('Not allowed by CORS')
      callFunc('Not allowed by CORS')
    }
  },
  credentials: true // Added this to handle CORS cookie set issue
}

app.use(cookieParser())

app.use(express.json())
app.use(cors(corsOptions))

const PORT = process.env.PORT

connection()

app.use("/api/v1", rootRouter);

app.get('/logout', (req, res) => {
  res.clearCookie('jwt')
  res.end()
})

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
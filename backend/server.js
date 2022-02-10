const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const { errorHanlder } = require("./src/middleware/errorMiddleware")
const connectDB = require("./src/config/db")
const goalsRoutes = require("./src/routes/goals")
const usersRoutes = require("./src/routes/user")

const port = process.env.PORT || 5000
connectDB()
const app = express()
// Routes

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/goals", goalsRoutes)
app.use("/api/users", usersRoutes)
app.use(errorHanlder)

app.listen(port, () => { console.log(`server is runing http://localhost:${port}`) })


const express = require("express")
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000
const { errorHanlder } = require("./src/middleware/errorMiddleware")
const goalsRoutes = require("./src/routes/goals")
const app = express()
// Routes

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/goals", goalsRoutes)
app.use(errorHanlder)

app.listen(port, () => { console.log(`server is runing http://localhost:${port}`) })


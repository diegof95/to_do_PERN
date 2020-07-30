const express = require('express')
const pool = require('./db')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
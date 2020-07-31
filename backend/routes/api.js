const express = require('express')

const router = express.Router()
const pool = require('../db')

router.get(
  '/',
  async (request, response) => {

    try{
      const to_dos = await pool.query('SELECT * FROM to_do')
      response.json(to_dos.rows)
    }
    catch(error){
      console.log(error.stack)
    }
  }
)

router.post(
  '/',
  async (request, response) => {
    try{
      const { description } = request.body
      const query = await pool.query(
        'INSERT INTO to_do(description) VALUES ($1)',
        [description]
      )
      response.redirect('/api')
    }
    catch(error){
      console.log(error.stack)
    }
  }
)
/*
router.put(
  '/',
  (request, response) => {
    
  }
)

router.delete(
  '/',
  (request, response) => {
    
  }
)*/

module.exports = router
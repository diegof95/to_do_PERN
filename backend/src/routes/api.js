const express = require('express')

const router = express.Router()
const pool = require('../db')

router.get(
  '/',
  async (request, response) => {

    try{
      const to_do_list = await pool.query('SELECT * FROM to_do')
      response.json(to_do_list.rows)
    }
    catch(error){
      console.log(error.stack)
      response.status(400).json({msg: `Error: ${error.message}`})
    }
  }
)

router.post(
  '/',
  async (request, response) => {
    try{
      const { description } = request.body
      console.log(description)
      const query = await pool.query(
        'INSERT INTO to_do(description) VALUES ($1)',
        [description]
      )
      response.redirect('/api')
    }
    catch(error){
      console.log(error.stack)
      response.status(400).json({msg: `Error: ${error.message}`})
    }
  }
)

router.put(
  '/',
  async (request, response) => {
    try{
      const id = request.query.id
      const {description, is_done} = request.body
      console.log(description, is_done)
      const query = await pool.query(
        `UPDATE to_do
          SET
            description = ($1),
            is_done = ($2)
          WHERE to_do_id = ($3)`,
        [description, is_done, id]
      )
      response.redirect(200,'/api')
    }
    catch(error){
      console.log(error.stack)
      response.status(400).json({msg: `Error: ${error.message}`})
    }
  }
)

router.delete(
  '/',
  async (request, response) => {
    try{
      const id = request.query.id
      console.log(id)
      const query = await pool.query(
        `DELETE FROM to_do
          WHERE to_do_id = ($1)`,
        [id]
      )
      response.redirect(200,'/api')
    }
    catch(error){
      console.log(error.stack)
      response.status(400).json({msg: `Error: ${error.message}`})
    }
  }
)

module.exports = router
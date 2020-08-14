import React, { useState, useEffect, useReducer } from 'react'
import { Container, Form, Table } from 'react-bootstrap'
import axios from 'axios'
import useFetchToDoList from './fetching'
import 'regenerator-runtime/runtime'

const API_ENDPOINT = 'http://localhost:5000/api'

function App(props) {
  
  const {toDoList, loading, error} = useFetchToDoList()

  console.log(toDoList, loading, error)
  return (
    <Container>
      <h1 className="title">My To Do List</h1>
      <AddForm />
      <hr />
      { toDoList.error && <p>Something went wrong loading data...</p> }
      { toDoList.loading ?
        <p>Loading data...</p>
        :
        <List
          list={ toDoList }
        />
      }
    </Container>
  )
}

function AddForm(props){

  const [toDo, setToDo] = useState('')

  /**
  * Handler that adds a ToDo to my To Do list
  * 
  */
  const handleAdd = async (event) => {
    event.preventDefault()

    try{
      const reqBody = { description: toDo }
      const response = await axios.post(
        API_ENDPOINT,
        reqBody
      )
    }
    catch(error){
      console.log(`error:${error}`)
    }

    location.reload() // Probably temporary way of showing ToDo list + added ToDo
  }

  /**
  * Handler that makes toDo input controlled
  * 
  */
  const handleInput = (event) => {
    setToDo(event.target.value)
  }

  return(
    <Form onSubmit={handleAdd}>
      <Form.Group>
        <LabeledInput
          id="toDo"
          value={toDo}
          handleChange={handleInput}
        >
          To Do 
        </LabeledInput>
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </Form.Group>
    </Form>
  )
}

function LabeledInput({id, type="text", value, handleChange, children}){
  return(
    <div className="form-group">
    <label htmlFor={id} className="label">{children}</label>
    <input
      id={id}
      className="form-control"
      type={type}
      value={value}
      onChange={handleChange}
    />
    </div>
  )
}

function List({list}){

  return(
    <Table>
      <thead>
        <tr>
          <th>To Do Description</th>
          <th>Done!</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      { list.map( (item) => (
        <ToDo
          key={item.to_do_id}
          to_do_id={item.to_do_id}
          description={item.description}
        />
      )) }
      </tbody>
    </Table>
  )
}


function ToDo({to_do_id, description}){

  const handleDone = async () => {
    try{
      const reqBody = { description, is_done: true }
      console.log(reqBody)
      const response = await axios.put(
        API_ENDPOINT,
        reqBody,
        {
          params: { id: to_do_id }
        }
      )
    }
    catch(error){
      console.log(`error:${error}`)
    }
  }

  const handleEdit = () => {

  }

  const handleDelete = () => {

  }

  return(
    <tr>
      <td>{description}</td>
      <td>
        <button className="btn btn-success" onClick={handleDone}>
          Done
        </button>
      </td>
      <td><button className="btn btn-danger">Edit</button></td>
      <td><button className="btn btn-danger">Delete</button></td>
    </tr>
  )
}

export default App
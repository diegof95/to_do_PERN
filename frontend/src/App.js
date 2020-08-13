import React, { useState, useEffect, useReducer } from 'react'
import { Container, Form } from 'react-bootstrap'
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
      console.log(`response:${response.headers}`)
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
    list.map( (item) => (
      <ToDo
        key={item.to_do_id}
        description={item.description}
      />
    ))
  )
}


function ToDo({description}){

  return(
    <div>
      {description}
    </div>
  )
}

export default App
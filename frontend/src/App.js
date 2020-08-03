import React, { useState, useEffect, useReducer } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import useFetchToDoList from './fetching'
import 'regenerator-runtime/runtime'

const API_ENDPOINT = 'localhost:5000/api'

function App(props) {
  
  const {toDoList, Loading, error} = useFetchToDoList()

  return (
    <Container>
      <h1 className="title">My To Do List</h1>
      <Form />
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

function Form(props){

  const [toDo, setToDo] = useState('')

  /**
  * Handler that adds a ToDo to my To Do list
  * 
  */
  const handleAdd = async (event) => {
    event.preventDefault()

    try{
      const reqBody = { description: toDo, done: false }
      const response = await axios.post(
        API_ENDPOINT, reqBody
      )
    }
    catch(error){
      console.log(error)
    }
  }

  /**
  * Handler that makes toDo input controlled
  * 
  */
  const handleInput = (event) => {
    setToDo(event.target.value)
  }

  return(
    <form className="" onSubmit={handleAdd}>
      <LabeledInput
        id="toDo"
        value={toDo}
        handleChange={handleInput}
      >
        To Do 
      </LabeledInput>
      <button className="button button-large" type="submit">
        Add
      </button>
    </form>
  )
}

function LabeledInput({id, type="text", value, handleChange, children}){
  return(
    <React.Fragment>
    <label htmlFor={id} className="label">{children}</label>
    <input
      id={id}
      className="input"
      type={type}
      value={value}
      onChange={handleChange}
    />
    </React.Fragment>
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
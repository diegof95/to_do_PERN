import React, { useState, useEffect, useReducer } from 'react'
import { Container, FormControl, Col, Form, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { reducer } from './utils'
import 'regenerator-runtime/runtime'

const API_ENDPOINT = 'http://localhost:5000/api'

function App(props) {
  
  const [newToDo, setNewToDo] = useState('')
  const [toDos, dispatchToDos] = useReducer(
    reducer,
    {
      toDoList: [],
      loading: false,
      error: false
    }
  )

  /**
  * Handler that makes toDo input controlled
  */
  const handleInput = (event) => {
    setNewToDo(event.target.value)
  }

  /**
  * Handler that adds a ToDo to my To Do list
  */
  const handleAdd = async (event) => {
    event.preventDefault()

    try{
      const reqBody = { description: newToDo }
      const response = await axios.post(
        API_ENDPOINT,
        reqBody
      )
      dispatchToDos({
          type: 'ADD_TODO',
          payload: response.data,
        })
    }
    catch(error){
      console.log(`error:${error}`)
    }
  }

  const handleDelete = async (toDoId) => {
    console.log(toDoId)
    try{
      const response = await axios.delete(
        API_ENDPOINT,
        {
          params: { id: toDoId }
        }
      )
      dispatchToDos(
        {
          type: 'DELETE_TODO',
          payload: { toDoId }
        }
      )
    }
    catch(error){
      console.log(`error:${error}`)
    }
  }

  const getToDoList = () => {
    const fetchData = async () => {
      dispatchToDos({type: 'MAKE_REQUEST'})

      try{
        const result = await axios.get(API_ENDPOINT)
        dispatchToDos({
          type: 'SUCCESS_REQUEST',
          payload: result.data,
        })
      }
      catch(error){
        console.error(error)
      }
    }
    fetchData()
  }

  useEffect(getToDoList, [])

  return (
    <Container>
      <h1 className="title text-center my-4">My To Do List</h1>
      <AddForm handleInput={handleInput} handleAdd={handleAdd}/>
      <hr />
      { toDos.error && <p>Something went wrong loading data...</p> }
      { toDos.loading ?
        <p>Loading data...</p>
        :
        <List
          list={toDos.toDoList}
          handleDelete={handleDelete}
        />
      }
    </Container>
  )
}

function AddForm({toDo, handleInput, handleAdd}){

  return(
    <Form onSubmit={handleAdd}>
        <Form.Row>
          <Col sm={10}>
            <LabeledInput
              id="toDo"
              value={toDo}
              placeholder="What do you wanna do next?"
              handleChange={handleInput}
            >
              Add new ToDo
            </LabeledInput>
          </Col>
          <Col sm={2}>
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </Col>
        </Form.Row>
    </Form>
  )
}

function LabeledInput({id, type="text", placeholder="", value, handleChange, children}){
  return(
    <>
      <Form.Label htmlFor={id} className="label" srOnly>{children}</Form.Label>
      <FormControl
        id={id}
        placeholder={placeholder}
        className="form-control"
        type={type}
        value={value}
        onChange={handleChange}
      />
    </>
  )
}

function List({list, handleDelete}){

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
          toDoId={item.to_do_id}
          description={item.description}
          isDone={item.is_done}
          handleDelete={handleDelete}
        />
      )) }
      </tbody>
    </Table>
  )
}


function ToDo({toDoId, description, isDone, handleDelete}){

  const [toDoDesc, setToDoDesc] = useState(description)
  const [editing, setEditing] = useState(false)

  /* const handleDone = async () => {
    try{
      const reqBody = { description, is_done: true }
      const response = await axios.put(
        API_ENDPOINT,
        reqBody,
        {
          params: { id: toDoId }
        }
      )
    }
    catch(error){
      console.log(`error:${error}`)
    }
  }
 */
  const handleEdit = async () => {
    if(editing){
      try{
        const reqBody = { description: toDoDesc, is_done: isDone }
        const response = await axios.put(
          API_ENDPOINT,
          reqBody,
          {
            params: { id: toDoId }
          }
        )
        setEditing(false)
      }
      catch(error){
        console.log(`error:${error}`)
      }
    }else{
      setEditing(true)
    }
  }

  const handleInput = (event) => {
    setToDoDesc(event.target.value)
  }

  return(
    <tr>
      { editing ?
      <td> 
        <LabeledInput
          id="editToDo"
          value={toDoDesc}
          placeholder="What you wanna do next?"
          handleChange={handleInput}
        />
      </td>
      :
      <td>{toDoDesc}</td>
      }
      <td>
        <button className="btn btn-success" >
          Done
        </button>
      </td>
      <td>
        <Button
          variant={editing ? "primary" : "outline-primary"}
          onClick={handleEdit}
        >
          Edit    
        </Button>
      </td>
      <td>
        <button 
          className="btn btn-danger"
          onClick={() => handleDelete(toDoId)}>
            Delete
        </button>
      </td>
    </tr>
  )
}

export default App
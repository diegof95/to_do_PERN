import { useReducer, useEffect } from 'react'
import axios from 'axios'

// const PROXY = 'https://cors-anywhere.herokuapp.com/' // Not needed, using cors on server
const API_ENDPOINT = 'http://localhost:5000/api'

export function reducer(state, action){

  switch(action.type){
    case 'MAKE_REQUEST':
      return {
        ...state,
        toDoList: [],
        loading: true,
        error: false
      }
    case 'SUCCESS_REQUEST':
      return {
        ...state,
        toDoList: action.payload,
        loading: false,
        error: false
      }
    case 'ADD_TODO':
      return {
        ...state,
        toDoList: action.payload
      }
    case 'DELETE_TODO':
      return {
        ...state,
        toDoList: state.toDoList.filter(
          (toDo) => (action.payload.toDoId !== toDo.to_do_id)
        )
      }
    default:
      return state
  }
}
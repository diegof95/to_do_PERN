import { useReducer, useEffect } from 'react'
import axios from 'axios'

// const PROXY = 'https://cors-anywhere.herokuapp.com/' // Not needed, using cors on server
const API_ENDPOINT = 'http://localhost:5000/api'

function reducer(state, action){

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
    default:
      return state
  }
}

function useFetchToDoList(){

  const [state, dispatch] = useReducer(
    reducer,
    {
      toDoList: [],
      loading: false,
      error: false
    }
  )

  useEffect(
    () => {
      const fetchData = async () => {
        dispatch({type: 'MAKE_REQUEST'})

        try{
          const result = await axios.get(API_ENDPOINT)
          dispatch({
            type: 'SUCCESS_REQUEST',
            payload: result.data,
          })
        }
        catch(error){
          console.error(error)
        }

      }
      fetchData()
    },
    []
  )

  return state
}

export default useFetchToDoList
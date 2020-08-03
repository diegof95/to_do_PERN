import { useReducer, useEffect } from 'react'
import axios from 'axios'

const API_ENDPOINT = 'localhost:5000/api'

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
          result = await axios.get(API_ENDPOINT)
          dispatchStories({
            type: 'STORIES_FETCH_SUCCESS',
            payload: result,
          })
        }
        catch(error){

        }
      }
      fetchData()
    },
    []
  )

  return state
}

export default useFetchToDoList
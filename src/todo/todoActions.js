import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export const changeDescription = (event) => ({
  type: 'DESCRIPTION_CHANGED',
  payload: event.target.value
})

export const clearDescription = () => ({
  type: 'DESCRIPTION_CLEAR'
})

export const searchDescription = () => ({
  type: 'DESCRIPTION_SEARCH'
})

export const search = (description) => {
  return (dispatch, getState) => {
    const description = getState().todo.description
    const search = description ? `&description__regex=/${description}/` : ''
    const request = axios.get(`${URL}?sort=-createdAt${search}`)
      .then((resp) => dispatch({ type: 'TODO_SEARCHED', payload: resp.data }))
  }
}

export const add = (description) => {
  return dispatch => {
    axios.post(URL, { description })
      .then(() => dispatch(clear()))
      .then(() => dispatch(search()))
  }
}

export const markAsDone = todo => {
  return dispatch => {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then(() => dispatch(search()))
  }
}

export const markAsPeding = todo => {
  return dispatch => {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
      .then(() => dispatch(search()))
  }
}

export const remove = todo => {
  return dispatch => {
    axios.delete(`${URL}/${todo._id}`)
      .then(() => dispatch(search()))
  }
}

export const clear = () => {
  return [{ type: 'ASYNC_TODO_CLEAR' }, search()]
}
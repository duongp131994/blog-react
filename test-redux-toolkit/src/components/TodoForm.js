import React, {memo, useState} from 'react'
import { addTodo } from '../store/reducers/todosSlice'
import { useDispatch } from 'react-redux'

const TodoForm = memo(() => {
    const [title, setTitle] = useState('')

    const changeTitle = event => {
        setTitle(event.target.value)
    }

    const dispatch = useDispatch()

    const addSingleTodo = event => {
        event.preventDefault()
        dispatch(addTodo({title}))
        setTitle('')
    }

    console.log(title)

    return (
        <div>
            <form onSubmit={addSingleTodo}>
                <input type='text' value={title} onChange={changeTitle} />
                <input type='submit' value='Add' disabled={title === ''}/>
            </form>
        </div>
    )
})

export default TodoForm
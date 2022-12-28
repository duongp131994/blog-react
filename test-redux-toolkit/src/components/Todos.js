import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {todosSelector, markComplete, deleteTodo, getTodos} from "../store/reducers/todosSlice";
import TodoForm from "./TodoForm";

const Todos = () => {
    const dispatch = useDispatch()

    const todos = useSelector(todosSelector)
    // const [todos2, setTodos2] = useState()

    useEffect(() => {
            // fetch(`https://jsonplaceholder.typicode.com/todos`)
            //     .then((res) => res.json())
            //     .then((postData) => {
            //         setTodos2(postData.slice(0, 30));
            //     });
        console.log(123)
        dispatch(getTodos())
    }, [dispatch]);
    console.log(todos)


    const toggleTodoCompleted = (id) => {
        dispatch(markComplete(id))
    }
    const deleteSingleTodo = (id) => {
        dispatch(deleteTodo(id))
    }
    return (
        <div className='todo-list'>
            <TodoForm />
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        {todo.title}
                        <input
                            type='checkbox'
                            checked={todo.completed}
                            onChange={toggleTodoCompleted.bind(this, todo.id)}
                        />
                        <button onClick={deleteSingleTodo.bind(this, todo.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export {Todos}
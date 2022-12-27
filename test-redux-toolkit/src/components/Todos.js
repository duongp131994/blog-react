import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {todosSelector} from "../store/reducers/todosSlice";

const Todos = () => {
    const todos = useSelector(todosSelector)
    const [todos2, setTodos2] = useState()
    useEffect(() => {
            fetch(`https://jsonplaceholder.typicode.com/todos`)
                .then((res) => res.json())
                .then((postData) => {
                    setTodos2(postData.slice(0, 30));
                });
    }, []);
    console.log(todos2)
    return (
        <div className='todo-list'>
            {/*<TodoForm />*/}
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        {todo.title}
                        {/*<input*/}
                        {/*    type='checkbox'*/}
                        {/*    checked={todo.completed}*/}
                        {/*    onChange={toggleTodoCompleted.bind(this, todo.id)}*/}
                        {/*/>*/}
                        {/*<button onClick={deleteSingleTodo.bind(this, todo.id)}>*/}
                        {/*    Delete*/}
                        {/*</button>*/}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export {Todos}
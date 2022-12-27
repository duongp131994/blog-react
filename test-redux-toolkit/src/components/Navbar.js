import React, {memo} from "react";

import {useSelector} from "react-redux";
import {todosSelector} from "../store/reducers/todosSlice";

const Navbar = memo(() => {
    const todos = useSelector(todosSelector)
    console.log(todos.length)
    return (
        <div className={'navbar'}>
            <h1>my react app todos</h1>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Total Todos: {todos.length}</li>
            </ul>
        </div>
    )
})

export {Navbar}
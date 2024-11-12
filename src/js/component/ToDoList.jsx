import React, { useState } from 'react'


const ToDoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([])


    function getTodos() {
        fetch("https://playground.4geeks.com/todo/users/wiston_travieso")
            .then((response) => {
                console.log(response.ok);
                console.log(response.status);
                console.log(response.text());
                return response.json()
            })
            .then(data => {
                setTodos(data.todos);
                console.log(data);

            })
            .catch((err) => { console.log(err) })
    }


    function addTask(inputValue, e) {
        setTodos(todos.concat(inputValue))
        e.target.value = ""
    }
    function addTodo(inputValue) {
        if (inputValue !== "") {
            let newTask = {
                label: inputValue,
                is_done: false
            }
            fetch("https://playground.4geeks.com/todo/todos/wiston_travieso", {
                method: "POST",
                body: JSON.stringify(newTask),
                headers: { "Content-Type": "application/json" }
            })
                .then((response) => {
                    response.json()
                })
                .then((data) => {
                    setTodos((prevTodos) => [...prevTodos, newTask]);
                    console.log()
                })
                .catch((err) => { console.log(err) })
        }
    }




    function deleteTask(task, index) {
        setTodos(todos.filter((task, taskIndex) => index != taskIndex))
    }

    return (
        <div className="container col-6">
            <div className="container">

                <input className="form-control" type="text"
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                    //value={inputValue}
                    onKeyUp={(e) => {
                        e.key === "Enter"
                            ? addTask(inputValue, e)
                            : null
                    }
                    } placeholder="Que necesitas Hacer?">

                </input>

                <ul className="list-group">

                    {todos.map((task, index) => (
                        <li className="list-group-item" key={index}
                        >{task}  <button type="button" class="btn btn-dark"
                            onClick={(e) =>
                                deleteTask(task, index)}
                        >X</button>

                        </li>
                    ))}
                    <div className="text-align-right">
                        {todos.length} item left
                    </div>
                </ul>
            </div>
        </div >

    )

}


export default ToDoList;
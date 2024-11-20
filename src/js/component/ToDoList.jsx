import React, { useState, useEffect } from 'react'


const ToDoList = () => {
    const [inputValue, setInputValue] = useState({
        label: "",
        is_done: false
    });
    const [todos, setTodos] = useState([])


    async function getTodos() {
        try {

            const response = await fetch("https://playground.4geeks.com/todo/users/wiston_travieso")
            const data = await response.json()

            if (response.ok) {
                setTodos(data.todos)
            }

        } catch (error) {
            console.log(error)
        }
        // fetch("https://playground.4geeks.com/todo/users/wiston_travieso")
        //     .then((response) => {
        //         console.log(response.ok);
        //         console.log(response.status);
        //         console.log(response.text());
        //         return response.json()
        //     })
        //     .then(data => {
        //         setTodos(data.todos);
        //         console.log(data);
        //         console.log("data desde get");
        //     })
        //     .catch((err) => { console.log(err) })
    }


    async function deleteTask(id) {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
                method:"DELETE"
            })
          if (response.ok){
            getTodos()
          }            
        } catch (error) {
            console.log(error)
        }
    }

    function handleChange(e) {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        })
    }
    async function saveTask(e) {
        if (e.key == "Enter") {
            try {
                let response = await fetch("https://playground.4geeks.com/todo/todos/wiston_travieso",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(inputValue)
                    }
                )
                if (response.ok) {
                    getTodos()
                }

            } catch (error) {
                console.log(error)
            }
        }

    }


    useEffect(() => {
        console.log("me ejecuto")
        getTodos()
    }, [])

    return (
        <div className="container col-6">
            <div className="container">

                <input className="form-control" type="text"
                    onChange={handleChange}
                    value={inputValue.label}
                    name="label"

                    onKeyDown={saveTask}

                    placeholder="Que necesitas Hacer?">

                </input>

                <ul className="list-group">
                    {todos.map((task) => (
                        <li
                            className="list-group-item"
                            key={task.id}
                        >
                            {task.label}
                            <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => deleteTask(task.id)}
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
import React from "react";
import ToDoList from "./ToDoList";

//create your first component
const Home = () => {

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">todos</h1>
			<ToDoList />
		</div>
	);
};

export default Home;

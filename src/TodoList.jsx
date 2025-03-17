import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const ToDoList = ({ username, onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const tasksCollectionRef = collection(db, "tasks");

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await getDocs(tasksCollectionRef);
            setTasks(data.docs.map(doc => ({ id: doc.id, text: doc.data().text })));
        };
        fetchTasks();
    }, []);

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = async () => {
        if (newTask.trim() !== "") {
            const docRef = await addDoc(tasksCollectionRef, { text: newTask });
            setTasks([...tasks, { id: docRef.id, text: newTask }]);
            setNewTask("");
        }
    };

    const deleteTask = async (id) => {
        await deleteDoc(doc(db, "tasks", id));
        setTasks(tasks.filter(task => task.id !== id));
    };

    const moveTaskUp = async (index) => {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    };

    const moveTaskDown = async (index) => {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    };

    return (
        <div className="to-do-list">
            <h1>To-Do App</h1>
            <br />

            <div>
                <input type="text" placeholder="Enter a task..." value={newTask} onChange={handleInputChange} />
                <button className="add-button" onClick={addTask}>Add</button>
            </div>

            <br />
            <ol>
                {tasks.map((task, index) => (
                    <li key={task.id}>
                        <span className="text">{task.text}</span>
                        <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
                        <button className="move-button" onClick={() => moveTaskUp(index)}>☝</button>
                        <button className="move-button" onClick={() => moveTaskDown(index)}>👇</button>
                    </li>
                ))}
            </ol>
            <div> 
                <button className="logout-button" onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
};

export default ToDoList;
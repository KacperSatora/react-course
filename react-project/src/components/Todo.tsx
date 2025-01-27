import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Task {
    id: number;
    title: string;
}

export default function Todo() {
    const location = useLocation();
    const { userName } = location.state || {};
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");

    useEffect(() => {
        const fetchTasks = async () => {
            if (userName) {
                try {
                    const response = await fetch(`http://localhost:3001/todo-list/${userName}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch tasks");
                    } else {
                        const data = await response.json();
                        setTasks(data);
                    };
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                }
            }
        };
        fetchTasks();
    }, [userName]);

    const removeTask = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3001/todo-list/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete task");
            } else {
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            };
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const addTask = async () => {
        if (!newTaskTitle.trim()) {
            alert("Tytuł nie może być pusty");
            return;
        }
        try {
            const response = await fetch("http://localhost:3001/todo-list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName,
                    title: newTaskTitle,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to add task");
            } else {
                const newTask = await response.json();
                setTasks((prevTasks) => [...prevTasks, newTask]);
                setNewTaskTitle("");
            };
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="m-auto mt-[200px] w-[600px] p-[30px] bg-slate-500 rounded-md text-white">
            <h1 className="text-[32px] font-bold">Cześć, {userName || "Guest"}!</h1>
            <h2 className="text-[24px] mt-[20px]">Twoje zadania:</h2>

            <ul className="mt-[15px] list-disc list-inside">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task.id} className="text-[18px] flex justify-between items-center pb-2">
                            {task.title}
                            <button
                                onClick={() => removeTask(task.id)}
                                className="ml-[10px] text-[14px] bg-red-600 px-[10px] py-[5px] rounded-md"
                            >
                                Usuń zadanie
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="text-[18px]">Brak zadań</p>
                )}
            </ul>

            <div className="mt-[30px]">
                <input
                    type="text"
                    placeholder="Tytuł zadania"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-[70%] p-[10px] text-black rounded-md"
                />
                <button
                    onClick={addTask}
                    className="ml-[10px] px-[15px] py-[10px] bg-green-600 rounded-md text-white"
                >
                    Dodaj Zadanie
                </button>
            </div>
        </div>
    );
}

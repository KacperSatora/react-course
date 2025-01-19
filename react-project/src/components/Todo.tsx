import { useState } from "react";
import { useLocation } from "react-router-dom";

interface Task {
    id: number;
    title: string;
}

export default function Todo() {
    const location = useLocation();
    const { userName } = location.state || {};

    const initialTasks: Record<string, Task[]> = {
        Kacper: [
            { id: 1, title: "Zrobić zakupy" },
            { id: 2, title: "Umyć naczynia" },
        ],
        Jan: [
            { id: 3, title: "Skończyć projekt" },
            { id: 4, title: "Wyczyścić mieszkanie" },
        ],
    };

    const [tasks, setTasks] = useState<Task[]>(initialTasks[userName] || []);
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");

    const removeTask = (id: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const addTask = () => {
        if (!newTaskTitle.trim()) {
            alert("Task title cannot be empty.");
            return;
        }
        const newTask: Task = {
            id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            title: newTaskTitle,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setNewTaskTitle("");
    };

    return (
        <div className="m-auto mt-[200px] w-[600px] p-[30px] bg-slate-500 rounded-md text-white">
            <h1 className="text-[32px] font-bold">Cześć, {userName || "Guest"}!</h1>
            <h2 className="text-[24px] mt-[20px]">Twoje zadania:</h2>

            <ul className="mt-[15px] list-disc list-inside">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task.id} className="text-[18px] flex justify-between items-center">
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
                    placeholder="New Task Title"
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
};
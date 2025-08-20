import React, { useContext, useEffect, useState } from "react";
import { Search, Plus, Calendar, Pencil, Trash2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import TaskForm from "./TaskForm";

const TaskManager = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const fetchUserAndTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const userRes = await axios.get("http://localhost:3030/user/data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userId = userRes.data._id;
        const taskRes = await axios.get(
          `http://localhost:3030/user/getTasks/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks(taskRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) fetchUserAndTasks();
  }, [user]);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3030/user/deleteTask/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === "All" || task.status === statusFilter)
    );
  });

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3030/user/updateStatuse/${taskId}`,
        { status: newStatus }
      );

      // Update local state instantly
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  return (
    <div className="mx-auto p-10 text-white bg-zinc-950 min-h-screen w-full ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Task Manager</h1>
        <button
          className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={() => {
            setEditTask(null);
            setIsModalOpen(true);
          }}
        >
          <Plus size={18} /> Add Task
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center border border-zinc-500 rounded-lg px-3 py-2 w-full md:w-1/3">
          <Search size={18} className="" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="ml-2 w-full outline-none bg-zinc-950"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="border px-4 py-2 rounded-lg border-zinc-500 bg-zinc-950"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const formattedDate = task?.dueDate
              ? new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(task.dueDate))
              : "No Date";

            return (
              <div
                key={task._id}
                className="border bg-white p-4 rounded-2xl shadow-sm w-64 h-64 flex flex-col justify-between text-black"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-gray-500"
                      checked={task.status === "Completed"}
                      onChange={() =>
                        handleStatusChange(
                          task._id,
                          task.status === "Completed" ? "Pending" : "Completed"
                        )
                      }
                    />

                    <h3
                      className={`text-lg font-bold ${
                        task.status === "completed"
                          ? "line-through text-gray-500"
                          : ""
                      }`}
                    >
                      {task?.title}
                    </h3>
                  </div>
                  <div className="h-16 overflow-hidden text-sm">
                    {task.description}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <Calendar size={16} />
                  <span>{formattedDate}</span>
                  <span
                    className={`w-24 h-8 rounded-lg flex justify-end items-center text-sm font-medium ${
                      task.priority === "Low"
                        ? "text-green-600"
                        : task.priority === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-black text-white px-3 py-1 rounded-lg flex items-center gap-2"
                    onClick={() => handleEdit(task)}
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    className="bg-black text-white px-3 py-1 rounded-lg flex items-center gap-2"
                    onClick={() => handleDelete(task._id)}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-center w-full">No tasks found.</p>
        )}
      </div>

      {isModalOpen && (
        <TaskForm task={editTask} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default TaskManager;

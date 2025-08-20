import React, { useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const TaskForm = ({ task, onClose }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "");
  const [date, setDate] = useState(task?.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "");
  const { user } = useContext(AuthContext);
  const [userid, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3030/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserId(res.data._id);
    };
    if (user) fetchUser();
  }, [user]);

  const handleTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (task) {
        // Update task
        await axios.put(
          `http://localhost:3030/user/updateTask/${task._id}`,
          {
            title,
            description,
            priority,
            date,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Task updated successfully!");
        window.location.reload();
      } else {
        // Create new task
        await axios.post(
          "http://localhost:3030/user/addtask",
          {
            userid,
            title,
            description,
            priority,
            date,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("New Task added successfully!");
        window.location.reload();
      }
      onClose();
    } catch (error) {
      console.log(error);
      alert("Failed to save task.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-zinc-50 text-black p-6 rounded-2xl w-96 relative">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">{task ? "Edit Task" : "Add New Task"}</h2>
        <label className="block font-medium">Title *</label>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="border border-zinc-500 w-full px-2 py-1 rounded mb-3"
        />

        <label className="block font-medium">Description</label>
        <textarea
          placeholder="Task description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className="border border-zinc-500 w-full px-2 py-1 rounded mb-3"
        ></textarea>

        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="block font-medium">Priority</label>
            <select
              value={priority}
              required
              onChange={(e) => setPriority(e.target.value)}
              className="border border-zinc-500 w-full px-2 py-1 rounded"
            >
              <option>Select</option>
              <option>Medium</option>
              <option>High</option>
              <option>Low</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block font-medium">Due Date</label>
            <input
              type="date"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
              className="border border-zinc-500 w-full px-2 py-1 rounded"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 border text-white bg-black rounded-lg" onClick={onClose}>
            Cancel
          </button>
          <button
            onClick={handleTask}
            className="text-white bg-black px-4 py-2 rounded-lg"
          >
            {task ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;

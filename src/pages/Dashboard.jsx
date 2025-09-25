import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import TaskItem from "../components/TaskItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 bg-yellow-100 border border-yellow-600 h-[100px] px-5">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="text-center mb-6 px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Your Dashboard</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage your daily tasks with ease. Add new tasks, edit existing ones,
          and keep track of everything in one place. Stay organized and boost
          your productivity 🚀.
        </p>
      </div>

      <Link
        to="/task/add"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-[200px] mx-auto shadow-md hover:bg-blue-600 transition mb-6"
      >
        Add Task
      </Link>

      <div className="flex flex-col items-center gap-4 px-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="w-full max-w-xl">
              <TaskItem task={task} refresh={fetchTasks} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-6">No tasks available. Add your first task!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

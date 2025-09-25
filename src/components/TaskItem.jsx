import API from "../api/axios";
import { Link } from "react-router-dom";

const TaskItem = ({ task, refresh }) => {
  const handleDelete = async () => {
    await API.delete(`/tasks/${task._id}`);
    refresh();
  };

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold text-lg">{task.title}</h2>
      <p>{task.description}</p>
      <div className="flex justify-end mt-2">
        <Link to={`/task/edit/${task._id}`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</Link>
        <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;

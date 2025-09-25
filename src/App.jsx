import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaskForm from "./components/TaskForm";
import "./index.css";

function App() {
  const ProtectedLayout = ({ children }) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      return <Navigate to="/login" replace />;
    }
  
    return (
      <>
        {children}
      </>
    );
  };
  const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("token");
  
    if (token) {
      return <Navigate to="/dashboard" replace />;
    }
  
    return <>{children}</>;
  };
  
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  return (
    <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Root path redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        }
      />
      <Route
        path="/task/add"
        element={
          <ProtectedLayout>
            <TaskForm />
          </ProtectedLayout>
        }
      />
      <Route
        path="/task/edit/:id"
        element={
          <ProtectedLayout>
            <TaskForm />
          </ProtectedLayout>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
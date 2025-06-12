import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import TaskList from './components/tasks/TaskList';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App; 
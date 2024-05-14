import React from 'react';

import './output.css';
import './App.css';
import Wrapper from './components/Wrapper';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Projects from './components/Projects';
import Members from './components/Members';
import ProjectManagementList from './components/project-management';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Wrapper />}>
        <Route path='' element={<Dashboard />} />
        <Route path='projects' element={<Projects />} />
        <Route path='members' element={<Members />} />
        <Route path='app-project-list' element={<ProjectManagementList />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default App;

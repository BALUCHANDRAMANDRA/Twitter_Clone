import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Signin } from './pages/Signin';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route path="register" element={<Register />} />
            <Route path="signin" element={<Signin />} />
          </Route>
          <Route path="/home/*" element={<Home />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Books from './pages/Books';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route 
            path="/admin" 
            element={
              currentUser?.isAdmin ? 
                <Admin /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/books" 
            element={
              currentUser ? 
                <Books /> : 
                <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

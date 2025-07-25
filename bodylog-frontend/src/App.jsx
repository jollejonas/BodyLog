import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MeasurementsPage from './pages/MeasurementsPage';
import AuthPage from './pages/AuthPage';
import { jwtDecode } from 'jwt-decode';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');
  const token = localStorage.getItem('token');
  let email = "";
  if( token ) {
    const decoded = jwtDecode(token);
    email = decoded.sub;
  }

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 text-gray-800">
      <header className="py-8 px-2 text-center bg-white shadow">
        <a href="/">
          <h1 className="text-3xl font-bold text-gray-800">BodyLog</h1>
        </a>
        <p className="text-gray-600 mt-2">Hold styr på dine kropsmål og vægt over tid</p>
        {!isLoggedIn ? (<div className="text-center mt-4">
          <a
          href="/auth"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Log ind eller opret bruger
          </a>
        </div>) : 
  (<div><p className="mt-4 text-green-600">Du er logget ind som {email} </p>
    <button onClick={handleLogout} className="mt-2 text-red-600 hover:underline">
      Log ud
    </button>
  </div>)}

        </header>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/measurements"
            element={isLoggedIn ? <MeasurementsPage /> : <Navigate to="/login" />}
          />
          
          <Route path="/auth" element={<AuthPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

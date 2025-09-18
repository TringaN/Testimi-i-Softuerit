import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Books from "./components/Books";
import Users from "./components/users";
import Login from "./components/Login";
import Register from "./components/Register";
import UsersLocal from "./components/UsersLocal";

function App() {
  // kontrollo nëse përdoruesi është loguar dhe merr rolin
  const isAuth = !!localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "admin" ose "user"

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/login"; // redirect pas logout
  };

  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          {/* Logo majtas */}
          <Link className="navbar-brand fw-bold" to="/">
            📚 Mini-Library
          </Link>

          {/* Menutë */}
          <div className="mx-auto">
            <ul className="navbar-nav">
              {!isAuth ? (
                // Nëse nuk është loguar
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                // Nëse është loguar
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/books">
                      Books
                    </Link>
                  </li>
                  {role === "admin" && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/users">
                        Users
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>

          {/* Logout në të djathtë */}
          {isAuth && (
            <div className="ms-auto">
              <button
                className="btn btn-sm btn-outline-light logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Routes */}
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Books për të gjithë të loguarit */}
          <Route
            path="/books"
            element={isAuth ? <Books /> : <Navigate to="/login" />}
          />

          {/* Users vetëm për admin */}
          <Route
            path="/users"
            element={
              isAuth && role === "admin" ? <Users /> : <Navigate to="/books" />
            }
          />

          {/* Local users CRUD vetëm test */}
          <Route path="/users-local" element={<UsersLocal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

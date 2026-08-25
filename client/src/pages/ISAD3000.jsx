import "./ISAD3000.css";
import logo from "./logo.webp";
import { useNavigate } from "react-router-dom";

function ISAD3000() {
  const navigate = useNavigate();

  const sidebar = [
    {
      name: "Institution Page",
      path: "/ucdashboard/institution"
    },
    {
      name: "Units",
      path: "/ucdashboard"
    },
    {
      name: "Settings",
      path: "/ucdashboard/settings"
    }
  ];

  return (
    <div className="isad3000-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>UC Dashboard</h2>

        <nav>
          <ul>
            {sidebar.map((item) => (
              <li
                key={item.name}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </li>
            ))}

            <li
              onClick={() => navigate("/ucdashboard/isad3000/students")}
            >
              Student List
            </li>

            <li
              onClick={() => navigate("/ucdashboard/isad3000/groups")}
            >
              Group Allocation
            </li>
          </ul>
        </nav>
      </aside>

      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="top-logo"
      />

      {/* Main Content */}
      <main className="main-content">

        <section className="unit-name">
          <h1>Capstone Project 1 | ISAD3000</h1>
          <p>Student List and Group Allocation</p>
        </section>

      </main>

    </div>
  );
}

export default ISAD3000;
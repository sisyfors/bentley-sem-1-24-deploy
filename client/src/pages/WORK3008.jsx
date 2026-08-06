import "./WORK3008.css";
import logo from "./logo.webp";
import Dropdown from "./Dropdown";
import Projects from "./Projects";
import "./Projects.css";



function WORK3008() {
    return (
    <div className="work3008-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>UC Dashboard</h2>

        <nav>
          <ul>
            <li>Institution Page</li>
            <li>Units</li>
   
            <Dropdown />
            
            <li>Discover Event</li>
            <li>Settings</li>
          </ul> 
        </nav>
      </aside>

      <img src={logo} alt="Logo" className="top-logo" />

      <main className="main-content">
        <section className="unit-name">
          <h1>Work Based Project | WORK3008</h1>
          <p></p>
        </section>

        <div className="round-box">
          <div className="round-header">
            <h2>Current available Round</h2>
            <button className="add-round-btn">+ Add Round</button>
          </div>

          <div className="round-content">

            {/* Example Round */}
            <div className="round-card">
              <h3>Round 1</h3>
              <p>Semester: Semester 1, 2026</p>
              <p>Status: Open</p>
              <p>Duration: From "MM/DD/YYY" to "MM/DD/YYY"</p>
              <p>Applications: 45 Students</p>
              <Projects />

            </div>
          </div>
        </div>
      </main>  

    </div>
    );
}

export default WORK3008;
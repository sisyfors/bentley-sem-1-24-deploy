import { useState } from "react";
import "./Dropdown.css";

function Dropdown() {
  const [open, setOpen] = useState(true);

  return (
    <div className="dropdown">
      <button onClick={() => setOpen(!open)}>
        WORK3008
      </button>

      {open && (
        <div className="dropdown-content">
          <a href="#">Announcements</a>
          <a href="#">Class-List</a>
          <a href="#">Group Allocation</a>
          <a href="#">Supervisors</a>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
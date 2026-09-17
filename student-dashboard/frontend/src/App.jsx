import './App.css'
import { useState } from "react";
import UploadResume from "./components/uploadResume";
import ApplicationStatus from "./components/applicationStatus";
import ProjectPage from "./components/projectPage";
import RoundPage from "./components/roundPage";
import PreferencePage from "./components/preferencePage";

function App() {

  const [rounds, setRounds] = useState([
    // for temporarily only
    { id: 1, name: "Round 1", status: "OPEN" },
    { id: 2, name: "Round 2", status: "CLOSED" },
    { id: 3, name: "Round 3", status: "OPEN" }
  ]);
  const [status, setStatus] = useState("OPEN");

  const handleUpload = (file) => {
    setUpload(file);
    setStatus("Applied"); // Once the document is uploaeded, status becomes "Applied"
  };

  return (
    <div className="app-container">
      <h1> 
        Student Dashboard
      </h1>
      <h2> Round Page </h2>

      <RoundPage rounds={rounds}/>

      <h2>Application Status</h2>
      <ApplicationStatus status={status}/>

      <div>
        <UploadResume applicationUploaded={handleUpload}/>
      </div>

      <h2> Preference Page </h2>
      <PreferencePage></PreferencePage>
    </div>
  );
}

export default App;
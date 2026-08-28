import './App.css'
import StudentList from "./components/studentList";

function App() {
  return (
    <div className="app-container">
      <h1> 
        Add Student List
      </h1>

      <div>
        <StudentList></StudentList>
      </div>
    </div>
  );
}

export default App;
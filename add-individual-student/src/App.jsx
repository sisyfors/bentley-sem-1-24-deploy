import './App.css'
import AddStudent from "./components/addStudent";

function App() {
  return (
    <div className="app-container">
      <h1> 
        Add Individual student to the student list
      </h1>

      <div>
        <AddStudent></AddStudent>
      </div>
       
    </div>
  );
}

export default App;
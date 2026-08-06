import './App.css'
import ApplicationRound from "./components/applicationRound";
import Curtin_University from "./assets/Curtin_University.png";

function App() {
  return (
    <div className="app-container">
      <img src={Curtin_University} alt="Curtin University" className="logo" />
      
      <h1> 
        Application Round Form
      </h1>

      <div>
        <ApplicationRound></ApplicationRound>
      </div>
       
    </div>
  );
}

export default App;
import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import NoteState from "./context/noteState.js";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Alert from "./Components/Alert.js";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(msg,type)=>{
    setAlert({
      message:msg,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }
  return (
    <>
      <NoteState> 
        <Router>
          <Navbar />
          <Alert  alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
              <Route exact path="/signup" element={<Signup  showAlert={showAlert}/>}></Route>

            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

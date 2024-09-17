import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate();
 const onChange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  const  onSubmit =async(e)=>{
        e.preventDefault();
        const response =  await fetch("http://localhost:4000/api/auth/login",{
            method:"POST",
            headers: {
                 "Content-Type": "application/json"
                },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json = await response.json();
        if(json.success){
            console.log("authenticated");
            // localStorage.setItem("name","ramoji");
            localStorage.setItem("token",json.token);
           navigate("/");  
           props.showAlert("Authentication Completed","success")
        }
        else{
            props.showAlert("Authentication Failed","danger")
        }
    }
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

import React,{useState} from 'react';
import {useHistory} from 'react-router-dom'


const Signup = () => {
    let history = useHistory();
    const [credential, setCredential] = useState({email:"",password:"",name:""})
    const onchange = (e) =>{
        setCredential({...credential,[e.target.name]:e.target.value});
      }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log({email:credential.email,password:credential.password});
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credential.email,password:credential.password,name:credential.name})
          });
          const token = await response.json();
          if (token.authToken) {
              localStorage.setItem("authToken",token.authToken);
              history.push("/")
              
          }else{
              alert("account exist please login here");
          }}
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                <input value={credential.name} onChange={onchange} name="name" type="text" className="form-control" id="name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input value={credential.email} onChange={onchange} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input value={credential.password} onChange={onchange} name="password" type="password" className="form-control" id="password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}


export default Signup

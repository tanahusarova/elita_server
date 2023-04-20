import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { addUser, checkUser } from "../api/User";




export const Register = (props) => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [errMsg, setErrMsg] = useState();


    let navigate = useNavigate(); 



    const handleSubmit = async (e) => {
 
      console.log('som tu');
      addUser({nickname:name, mail:email, password:pass}).then((res) => res.json()).then((res) => {
        console.log(res)
        if (res.token) {
            localStorage.setItem("token", res.token);
            navigate("/calendar");

    }}).catch((err) => {
    setErrMsg('Already used mail');
  });

            
    }

    const goToLoginPage = async(e) =>{
        let path = `/login`; //SPYTAT SA NA TUTO CAST
        navigate(path);
    }

    return (
<div>
        <div className="front-pages">
        <div className="auth-form-container">
        <warning ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</warning>

        <form className="register-form" onSubmit={handleSubmit}>
            
            <label htmlFor="name">nickname</label>
            <input value={name} 
                onChange={(e) => setName(e.target.value)} 
                name="name" 
                id="name" 
                placeholder="geter_prochal_na_hrad" 
                required
                autoComplete="off"/>

            <label htmlFor="email">email</label>
            <input value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                placeholder="elitak@gmail.com" 
                id="email" 
                name="email" />
            
            <label htmlFor="password">password</label>
            <input value={pass} 
                onChange={(e) => setPass(e.target.value)} 
                type="password" 
                placeholder="••••••••" 
                id="password" 
                name="password" />
            
            <button className="button-front-page" type="submit" 
            disabled={!name || !email || !pass ? true : false}
            >Sign Up</button>
        </form>
        <button className="link-btn" onClick={(e) => goToLoginPage(e)}>Already have an account? Log In here.</button>
        </div>
        </div>
    </div>
    )
}
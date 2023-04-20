import {useState, useRef, useEffect, useContext} from "react"
import { useNavigate } from "react-router-dom";
import { checkUser, loginUser } from "../api/User";


export const Login = (props) => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState();
    const { logedUser } = props;

    let navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        loginUser({email:email, password: pass}).then((res) => res.json()).then((res) => {
                console.log(res)
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("id", res.id);
                    console.log(res.id);
                    props.logedUser(res.id);
                    navigate("/calendar");

            }}).catch((err) => {
            setErrMsg('Wrong mail or password');
          });
          
        }

    

    const goToRegisterPage = async(e) =>{
        let path = `/register`; //SPYTAT SA NA TUTO CAST
        navigate(path);
    }


    return (
        <div>
        <div className="front-pages">
        <div className="auth-form-container">
        <warning ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</warning>

        <napis>ELITA</napis>
        <form className="login-form" onSubmit={handleSubmit}>

            <label htmlFor="email">email</label>
            <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                ref={userRef}
                placeholder="elitak@gmail.com" 
                id="email" 
                name="email" 
                autoComplete="off" 
                required
            />
            <label htmlFor="password">password</label>
            <input 
                value={pass} 
                onChange={(e) => setPass(e.target.value)} 
                type="password" 
                placeholder="••••••••" 
                id="password"  
                name="password" 
                required 
                />
        <button 
            className="button-front-page" 
            type="submit" 
            >Log In</button>
        </form>
        <button className="link-btn" onClick={(e) => goToRegisterPage(e)}>Don't have an account? Register here.</button>
        </div>
        </div>
        </div>
    )
}
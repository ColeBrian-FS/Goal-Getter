import React from 'react'
import{useState,useEffect}from "react"
import{ FaSignInAlt } from "react-icons/fa"
import{useSelector, useDispatch}from "react-redux"
import {useNavigate} from "react-router-dom"
import {toast} from"react-toastify"
import {login,reset} from"../features/auth/authSlice"
import Spinner from "../components/Spinner"
function Login() {
const [form, setForm] = useState({
    email:"",
    password:"",
});

const { email ,password } = form
const navigate = useNavigate()
const dispatch = useDispatch()
const { user , isloading , isError, isSuccess, message} =useSelector((state)=>state.auth)


const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }



const onSubmit = (e) =>{
    e.preventDefault()
    const userData={
        email,
        password
    }
    // validating user 
    dispatch(login(userData))

}

// if depencies changes this will run
useEffect(() => {
    if(isError){
        toast.error(message)
    }
    // register successful or user logged in
    if(isSuccess || user){
        navigate("/")
    }
    // reset global state
    dispatch(reset())

}, [user, isError, isSuccess, message, navigate, dispatch]);

if(isloading){
    return <Spinner/>
}


  return (<>
    <section className="heading">
        <h1> <FaSignInAlt/> Login</h1>
        <p>Login and start setting goals</p>
    </section>
        <section className="form">
         <form onSubmit={onSubmit}>
           
             <div className="form-group">
             <input type="text" className="form-control" id="email"  name="email" value={email} placeholder="Enter your Email" onChange={onChange}  />
             </div>
             <div className="form-group">
             <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your Password" onChange={onChange} />
             </div>
            
             <div className="form-group">
                 <button type="submit" className="btn btn-black">Submit</button>
             </div>
         </form>
        </section>
  </>
  
  )
}

export default Login
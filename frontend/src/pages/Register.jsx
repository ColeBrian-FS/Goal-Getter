import React from 'react'
import{useState,useEffect}from "react"
import{ FaUser } from "react-icons/fa"
import{useSelector, useDispatch}from "react-redux"
import {useNavigate} from "react-router-dom"
import {toast} from"react-toastify"
import {register,reset} from"../features/auth/authSlice"
import Spinner from "../components/Spinner"
function Register() {
const [form, setForm] = useState({
    name:'',
    email:"",
    password:"",
    renter_password:""
});

const {name, email ,password ,renter_password} = form
const navigate = useNavigate()
const dispatch = useDispatch()
const { user , isloading , isError, isSuccess, message} =useSelector((state)=>state.auth)


useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])



// set input change
const onChange = (e) =>{
    setForm((prevState) => ({...prevState, [e.target.name]:e.target.value}))
}


const onSubmit = (e) =>{
    
    e.preventDefault()
    if (password !== renter_password) {
        toast.error('Passwords do not match')
      } else {
        const userData = {
          name,
          email,
          password,
        }
  
        dispatch(register(userData))
      }
}

if(isloading){
    return <Spinner/>
}


  return (<>
    <section className="heading">
        <h1> <FaUser/> Register</h1>
        <p>Please create an Account</p>
    </section>
        <section className="form">
         <form onSubmit={onSubmit}>
             <div className="form-group">
             <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Enter your name" onChange={onChange} />
             </div>
             <div className="form-group">
             <input type="email" className="form-control" id="email"  name="email" value={email} placeholder="Enter your Email" onChange={onChange} />
             </div>
             <div className="form-group">
             <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your Password" onChange={onChange} />
             </div>
             <div className="form-group">
             <input type="password" className="form-control" id="renter_password" name="renter_password" value={renter_password} placeholder="Conform Password" onChange={onChange} />
             </div>
             <div className="form-group">
                 <button type="submit" className="btn btn-block">Submit</button>
             </div>
         </form>
        </section>
  </>
  
  )
}

export default Register
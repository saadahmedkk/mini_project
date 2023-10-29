import React, { useState} from 'react';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './DivStyle.css'


// eslint-disable-next-line
function SignInForm({}) {
  const  {setAuth} = useAuth();


  const navigate = useNavigate();
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

   
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [confirmation, setResponse] = useState('');
  const [token, setToken] = useState('');
  
 
 
  const handleChange = (e)=>{
    const {name,value} =  e.target
    setFormData({...formData,[name]:value})
  } 
console.log(formData)

console.log(confirmation)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:3000/users/signin",formData);
      if(response.data.status == "success"){
        const authToken = response.data.data.token; // Assuming the token is returned in the 'token' field
        sessionStorage.setItem("token",authToken)
        const sessData=sessionStorage.getItem("token")
        setToken(authToken);
        setAuth({authToken})
        setResponse(`Sign in successful!`);
        navigate(from, { replace: true })
      }
      setResponse(`Sign in failed!`);
      
    }
    catch(err){
      console.log(err)
      

    }
     
  };


  
  return (
    <>
    
    <section>
      <div className='mydiv'>
      <h1 className="display-1">Sigin in</h1>
        
        <form onSubmit={handleSubmit}>
          <div class="form-group container mystylepadding">
            <input type="text" class="form-control" id="username" name="username" value={formData.username} placeholder="username" onChange={handleChange}/>
          </div>
          <div class="form-group container mystylepadding">
            <input type="password" class="form-control" id="password" name="password" value={formData.password} placeholder="password" onChange={handleChange}/>
          </div>
          <div className='vertical-align mystylepadding'>
            <a href='/user/signup'>Not Registered ? </a>
            <button type="submit" class="btn btn-outline-success">Submit</button>
            <h6 className="alert-danger">{confirmation}</h6>
          </div>
        </form>
        

      </div> 

    </section>
    
    


    
    
    
    </>
  )
}

export default SignInForm

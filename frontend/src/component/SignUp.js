import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [confirmation, setResponse] = useState('');
  

  const navigate = useNavigate()
  
  const handleChange = (e)=>{
    const {name,value} =  e.target
    setFormData({...formData,[name]:value})
  }
console.log(formData)



  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:3000/users/signup", formData)
      .then((response) => {
        if(response.data.status){
         
          setResponse(`Signup in successful!`);
          navigate('/home/index')
          console.log(confirmation)
        }else{
            setResponse('unsuccessfull')
        }
        
        
      
      })
      .catch((error) => {
        setResponse(`Sign in failed. Error: ${error.response.data}`);
      });
  };
  return (
    <>
    
  
    <section>
      <div className='mydiv'>
      <h1 className="display-1">User Registeration</h1>
        
        <form onSubmit={handleSubmit}>
          <div class="form-group container mystylepadding">
            <input type="text" class="form-control" id="username" name="username" value={formData.username} placeholder="username" onChange={handleChange}/>
          </div>
          <div class="form-group container mystylepadding">
            <input type="password" class="form-control" id="password" name="password" value={formData.password} placeholder="password" onChange={handleChange}/>
          </div>
          <div className='vertical-align mystylepadding'>
            
            
            <button type="submit" class="btn btn-outline-success">Sign Up</button>
            <a href='/home/index'>Back to home</a>
          </div>
        </form>
        

      </div> 

    </section>
    
    
    

   
    
    
    </>
  )
}

export default SignUp

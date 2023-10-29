import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function AddTodo() {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [confirmation, setResponse] = useState('');
  const sessData = sessionStorage.getItem("token")
      const config = {
        headers : {
          'token': `${sessData}`
        }
        
      };

  const navigate = useNavigate()
  
  const handleChange = (e)=>{
    const {name,value} =  e.target
    setFormData({...formData,[name]:value})
  }
console.log(formData)



  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:3000/todo/add", formData,config)
      .then((response) => {
        if(response.data.status){
          setResponse(`Added successful!y`)
          navigate('/home/index')
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
    
  <div className='mydiv'>
  <h1 className="display-1">Add task</h1>
   <form onSubmit={handleSubmit}>
      <div class="form-group container mystylepadding">
        <input type="text" class="form-control" id="title" name="title" value={formData.title} placeholder="title" onChange={handleChange}/>
      </div>
      <div class="form-group container mystylepadding">
        <input type="description" class="form-control" id="description" name="description" value={formData.description} placeholder="description" onChange={handleChange}/>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    
    <div>{confirmation}</div>
    <a href='/home/index'>Back to home</a>

  </div>
   

   
    
    
    </>
  )
}

export default AddTodo

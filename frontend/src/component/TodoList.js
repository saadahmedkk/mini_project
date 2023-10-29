import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export default function TodoList() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const sessData = sessionStorage.getItem("token")
      const config = {
        headers : {
          'token': `${sessData}`
        }
        
      };
   
    const apiURL = "http://localhost:3000/todo/list"
    const apiURLforDelete = "http://localhost:3000/todo/delete"
    useEffect(()=>{
      axios.get(apiURL,config)
      .then((post)=> setData(post.data.data))
      .catch((error)=>console.log(error.response.data))
    },[])

     function handleDelete(id){
      
        axios.delete(apiURLforDelete+`/${id}`,config)
        .then((response) => console.log('Deleted successfully:', response))
        .catch((error)=>console.log(error.response.data))
       
   
    }



    return (
      <>
      <Header/>
      <div className='homepageLayout'>
      <button type="button" class="btn btn-outline-success" onClick={()=>{navigate('/task/add')}}>Add</button>
{data.map((item, index) => (
        <div class="accordion accordion-flush" id="accordionFlushExample" sty>
  <div class="accordion-item" >
    <h2 class="accordion-header" id={`flush-heading${item.id}`}>
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${item.id}`} aria-expanded="false" aria-controls={`flush-collapse${item.id}`}>
        {item.title}
      </button>
    </h2>
    <div id={`flush-collapse${item.id}`} class="accordion-collapse collapse" aria-labelledby={`flush-heading${item.id}`} data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Details:   {item.description}</div>
      <button class="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
    </div>
  </div>
  
</div>

))}

      </div>
      



        <Footer/>
      </>
      
      
          
        
    )
}

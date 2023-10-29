import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
export default function UserList() {
    const [data, setData] = useState([]);

    const apiURL = "http://localhost:3000/users/profile"

    useEffect(()=>{
      const sessData = sessionStorage.getItem("token")
      const config = {
        headers : {
          'token': `${sessData}`
        }
        
      };

      axios.get(apiURL,config)
      .then((post)=> 
            setData(post.data.data) )
      .catch((error)=>console.log(error))
    },[])
    
    return (
      <> 
      <Header/>
      <div className="container d-flex justify-content-center">
         <table className=' table  border-1 '>
         <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
           
              <tr >
                <td>{data.username}</td>
                <td>{data.password}</td>
              </tr>
          
          </tbody>
          
         </table>
        </div>
        <Footer/>
      
      </>
      
          
        
    )
}

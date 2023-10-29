import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Header() {
  const navigate = useNavigate()
  const signout= () =>{
    sessionStorage.clear()
    navigate('/signin')

  }
  return (
    <>
    <div className=' container justify-content-center '>
    <h1 className="display-1">Todo List</h1>
    <button onClick={signout}>Signout</button>
    </div>
        <nav className="navbar sticky-top navbar-dark bg-dark">
            <div className="container d-flex justify-content-center">
                <a className="navbar-brand" href="/Home/index">Home</a>  
                <a className="navbar-brand" href='/user/profile'>Profile</a>
                
            </div>
        </nav>
    
   </>
  )
}

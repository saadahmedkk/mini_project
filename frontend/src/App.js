
import { Routes,Route } from "react-router-dom";
import UserList from "./component/UserList";
import Layout from "./component/Layout";
import SignUp from "./component/SignUp";
import SignInForm from "./component/SignInForm"
import RequireAuth from "./component/RequireAuth";
import TodoList from "./component/TodoList";
import AddTodo from "./component/AddTodo";
function App() {

 


   
  return (
    <>
    
      <Routes>

        
        <Route path="/signin" element={<SignInForm/>}/>
        <Route path="/user/signup" element={<SignUp/>}></Route>
        
        

        <Route element={<RequireAuth/>}>
          <Route path="/layout" element={<Layout/>}></Route>
          <Route path="/" element={<TodoList/>}></Route>
          <Route path="/home/index" element={<TodoList/>}></Route> 
          <Route path="/user/profile" element={<UserList/>}></Route>
          <Route path="/task/add" element={<AddTodo/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

import { Outlet } from "react-router-dom";


const Layout =()=>{
    return(
        <> 
            <Outlet/>
            <a href="/">HOme</a>
        </>
    )
}
export default Layout
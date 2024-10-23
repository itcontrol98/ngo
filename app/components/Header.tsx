import NavbarData from "./Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import getDriver from "@/actions/getDriver";
import { getCurrentUser } from "@/actions/getCurrentUser";


const Header = async() =>{
    const session = await getServerSession(authOptions)
    const drivers = await getDriver()
    const currentUser = await getCurrentUser()

    
return( 
 <NavbarData email={session?.user.email} id={currentUser?.id} name={session?.user.name} role={session?.user.role} drivers={drivers} />
)}
export default Header;

import { Link } from 'react-router-dom'
import { getIdFromCookie, removeToken } from '../lib/auth';
function Navbar() {
  return (

    <>
      <div className='flex justify-between items-center px-3 sm:px-10 py-2 bg-gray-200'>
        <div className='flex gap-3 items-center'>
         
          <p className='text-2xl font-bold'>T&P cell</p>
        </div>
        <div className='flex gap-3 items-center sm:gap-3  md:gap-5'>
          <Link to='/'><p className='hover:cursor-pointer  hidden sm:block'>Home</p></Link>
          
          {!getIdFromCookie()?
          <>
          <Link to={'/register'}><p className='hover:cursor-pointer bg-black text-white p-2 rounded-xl'>Register</p></Link>
          <Link to={'/login'}><p className='hover:cursor-pointer bg-black text-white p-2 rounded-xl'>Login</p></Link>
          </>
          :
          <p className='hover:cursor-pointer bg-black text-white p-2 rounded-xl'
          onClick={()=>{
            removeToken()
          }}
          >Logout</p>}
        </div>

        



      </div>

    </>
  )
}

export default Navbar
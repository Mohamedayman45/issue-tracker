import React from 'react'
import Link from 'next/link'



const Navbar = () => {
  return (
    <>
        <nav className='flex gap-3 border-b p-3'>
            <Link href="/">Logo</Link>
            <ul className='flex gap-3'>
                <li><Link href="/Dashboard">Dashboard</Link></li>
                <li><Link href="/issues">issues</Link></li>
            </ul>
        </nav>
     </>
  )
}

export default Navbar
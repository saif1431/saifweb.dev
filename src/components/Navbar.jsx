import React, { useState } from 'react'
import { CiLinkedin } from "react-icons/ci";
import { Link, NavLink } from 'react-router-dom'
import { VscGithub } from "react-icons/vsc";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import SaifLogo from './Logo.jsx';
function Navbar() {
  // Note: React Router's <BrowserRouter> must wrap the app (see main.jsx).
  // In react-router-dom v6 `NavLink` no longer supports `activeClassName`.
  // Instead pass a function to `className` that receives `{ isActive }`.
  // We use `activeClass` below to add styles for the active route.

  const activeClass = ({ isActive }) => isActive ? 'text-cyan-300 font-semibold' : ''
  const [open, setOpen] = useState(false)

  return (
    // Glass navbar: translucent background, border, and backdrop blur
    <div className='sticky left-0 right-0 top-0 mx-0 z-40'>
      <div className=' lg:px-20 md:px-16 px-4 lg:py-8 '>
        <div className=' flex items-center justify-between'>
 <Link className="inline-block  w-36" to={"/"}>
  <img 
    src="/logo.png" 
    alt="Saif Logo" 
    className="  object-contain" 
  />
</Link>



          <nav className='bg-white/5 backdrop-blur-md border border-white/10 py-3 px-12 sticky top-0 left-0 hidden md:block rounded-full'>
            <ul className='flex items-center gap-8 text-lg'>
              <li><NavLink className={activeClass} to="/">Home</NavLink></li>
              <li><NavLink className={activeClass} to="/about">About</NavLink></li>
              <li><NavLink className={activeClass} to="/projects">Projects</NavLink></li>
              <li><NavLink className={activeClass} to="/contact">Contact</NavLink></li>
            </ul>
          </nav>

          {/* Right side icons + mobile hamburger */}
                  <div className='flex  items-center gap-5 text-2xl'>
            <a className='hover:text-cyan-300' href="https://www.linkedin.com/in/saif-butt-791170268?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><CiLinkedin /></a>
            <a className='hover:text-cyan-300' href="https://github.com/saif1431?tab=repositories"><VscGithub /></a>
            <a className='hover:text-cyan-300' href="https://www.facebook.com/saif.butt.1232"><CiFacebook /></a>
            <a className='hover:text-cyan-300' href="https://www.instagram.com/saif.butt.1232/"><FaInstagram /></a>
          </div>
          {/* Mobile hamburger - visible on small screens */}
          <button
            aria-label='Toggle menu'
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
            className='ml-4 inline-flex items-center justify-center rounded-md p-2 text-neutral-200 md:hidden'
          >
            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              {open ? (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {open && (
          <div className='mt-4 md:hidden'>
            <ul className='flex flex-col gap-3 text-lg'>
              <li><NavLink onClick={() => setOpen(false)} className={activeClass} to="/">Home</NavLink></li>
              <li><NavLink onClick={() => setOpen(false)} className={activeClass} to="/about">About</NavLink></li>
              <li><NavLink onClick={() => setOpen(false)} className={activeClass} to="/projects">Projects</NavLink></li>
              <li><NavLink onClick={() => setOpen(false)} className={activeClass} to="/contact">Contact</NavLink></li>
              <li className='pt-2 flex items-center gap-4 text-2xl'>
                <a href="https://www.linkedin.com/in/saif-butt-791170268?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><CiLinkedin /></a>
                <a href="https://github.com/saif1431?tab=repositories"><VscGithub /></a>
                <CiFacebook />
                <FaInstagram />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar

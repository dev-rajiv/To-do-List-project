import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between  bg-slate-600 text-white py-2">
      <div className="Title"> 
      <span className="font-bold text-xl mx-10"> TodoMatric </span>
      </div>
      <ul className="flex gap-8 mx-10">
        <li className="cursor-pointer hover:font-bold text-center">Home</li>
        <li className="cursor-pointer hover:font-bold">Your Tasks</li>
      </ul>
    </nav>
 
  )
}

export default Navbar

import React from 'react'
import './navbar.css'

const NavBar = () => {
  return (
    <div>
      <nav id="main-menu">
       <ul class="nav-bar">
          <li class="nav-button-home"><a href="#">Dashboard</a></li>
          <li class="nav-button-services"><a href="#">Calculate Fuel Expenses</a></li>
          <li class="nav-button-products"><a href="#">Exe Monthly Travel Summery</a></li>
       </ul>
      </nav>
    </div>
  )
}

export default NavBar;
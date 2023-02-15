import React from 'react'
import './App.css'

export default function NavBar() {
  return (
    //<div>NavBar</div>


    <nav className="nav">
      <nav className='navFirst'>
        <img src="images/blackAppoMo.png" height="50px" width="150px" className='AppoMoLogo' />
        <a href="www.youtube.com" className="a"><img src="images/notification.png" height="40px" width="40px" />
        </a>
        <a href="www.youtube.com" className="a"><img src="images/profile.png" height="40px" width="40px" />
        </a>
      </nav>


      <nav className='navSecond'>
        <ul className='active'>
          <li>
            <a href="www.youtube.com" className="a">Dashboard</a>
          </li>
          <li>
            <a href="www.youtube.com" className="">Appointment</a>
          </li>
          <li>
            <a href="www.youtube.com" className="">Service</a>
          </li>
        </ul>
        <hr color='#324B4F'></hr>
      </nav>



    </nav>
  )

}

import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import { Dropdown } from 'rsuite';

const Navbar = () => {
return (
	<>
	<Nav>
		{/* <Bars /> */}

		<NavMenu>
		<NavLink to='/Dashboard' activeStyle>
			Appointment
		</NavLink>
        <NavLink to='/AppointmentConfirm' activeStyle>
			Issues
		</NavLink>
		<NavLink to='/BrUpdate' activeStyle>
			Branch Details
		</NavLink>
		{/* <NavLink to='/annual' activeStyle>
			Annual Report
		</NavLink>
		<NavLink to='/team' activeStyle>
			Teams
		</NavLink>
		<NavLink to='/blogs' activeStyle>
			Blogs
		</NavLink>
		<NavLink to='/sign-up' activeStyle>
			Sign Up
		</NavLink> */}
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		
		{/* <NavBtn>
		<NavBtnLink to='/signin'>Sign In</NavBtnLink>
		</NavBtn> */}
        <Dropdown title="Dropdown">
    <Dropdown.Item><NavLink to='/EditProfile' activeStyle>
			Edit Profile
		</NavLink></Dropdown.Item>
    <Dropdown.Item><NavLink to='/ResetPassword' activeStyle>
			Change Password
		</NavLink>

	</Dropdown.Item>
    {/* <Dropdown.Item>Download As...</Dropdown.Item>
    <Dropdown.Item>Export PDF</Dropdown.Item>
    <Dropdown.Item>Export HTML</Dropdown.Item>
    <Dropdown.Item>Settings</Dropdown.Item>
    <Dropdown.Item>About</Dropdown.Item> */}
  </Dropdown>
  </NavMenu>
	</Nav>
	</>
);
};

export default Navbar;

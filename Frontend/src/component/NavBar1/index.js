import React,{useEffect,seContext}from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements1';
import { Dropdown } from 'rsuite';
// import {Menu ,MenuItem ,ListItemIcon , Divider , IconButton, Typography ,Tooltip} from '@mui/material';
import {PersonAdd ,Settings , Logout} from '@mui/icons-material';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

// import Box from '@mui/material/Box';
// import Avatar from 'react-avatar';

const Navbar1 = () => {
	// const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	// const open = Boolean(anchorEl);
	// const handleClick = (event: React.MouseEvent<HTMLElement>) => {
	//   setAnchorEl(event.currentTarget);
	// };
	// const handleClose = () => {
	//   setAnchorEl(null);
	// };

  const {objectId} = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname ===`/NavBar1/${objectId}`){
      // Programmatically navigate to the default route
      navigate(`/Dashboard/${objectId}`,{objectId});
    }
  }, [location.pathname, navigate, objectId]);

return (
	<>
	<Nav>
		{/* <Bars /> */}

		<NavMenu>

		<NavLink  exact to={`/Dashboard/${objectId}`} activeStyle>
	Appointments 
		</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
    <NavLink to={`/AppointmentConfirm/${objectId}`} activeStyle>
			Issues
		</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
		{/* <NavLink to={`/EditProfileB/${objectId}`} activeStyle>
		Edit Profile
		</NavLink>&nbsp;&nbsp;&nbsp;&nbsp; */}
		<NavLink to={`/ResetPasswordB/${objectId}`} activeStyle>
		Change Password
		</NavLink>
		<NavLink to='/' activeStyle>&nbsp;&nbsp;&nbsp;&nbsp;
		<Logout fontSize="small" />Logout
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
        {/* <Dropdown title="Dropdown">
    <Dropdown.Item><NavLink to='/EditProfile' activeStyle>
			Edit Profile
		</NavLink></Dropdown.Item>
    <Dropdown.Item><NavLink to='/ResetPassword' activeStyle>
			Change Password
		</NavLink>

	</Dropdown.Item> */}
    {/* <Dropdown.Item>Download As...</Dropdown.Item>
    <Dropdown.Item>Export PDF</Dropdown.Item>
    <Dropdown.Item>Export HTML</Dropdown.Item>
    <Dropdown.Item>Settings</Dropdown.Item>
    <Dropdown.Item>About</Dropdown.Item> */}
  {/* </Dropdown> */}
  {/* <React.Fragment> */}
      {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box> */}
      {/* <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
       Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
        My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu> */}
    {/* </React.Fragment> */}
  </NavMenu>
	</Nav>
	</>
);
};

export default Navbar1;

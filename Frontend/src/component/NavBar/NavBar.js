// import React,{useState} from 'react'
// import './navbar.css'

// import {
//   AppBar,
//   Toolbar,
//   CssBaseline,
//   makeStyles,
// } from "@material-ui/core";
// import { Link } from "react-router-dom";

// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
// // import PersonAdd from '@mui/icons-material/PersonAdd';
// // import Settings from '@mui/icons-material/Settings';
// // import Logout from '@mui/icons-material/Logout';

// const useStyles = makeStyles((theme) => ({
//   navlinks: {
//     // marginLeft: theme.spacing(5),
//     color:"#042A2C",
//     display: "flex",
//     margin:"auto",
//     marginLeft:"320px"
//   },
// //  logo: {
// //     flexGrow: "1",
// //     cursor: "pointer",
// //   },
//   link: {
//     display:"flex",
//     textDecoration: "none",
//     color:"black",
//     fontSize: "20px",
//     marginLeft: theme.spacing(10),
//     "&:hover": {
//       color: "#0C6D71",
//       // backgroundColor:"yellow",
//       borderBottom: "1px solid white",
//     },
//   },
// }));


// export default function NavBar() {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = useState(false);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(false);
//   };
 
//   return (
  
//     //<div>NavBar</div>
    
//   <div className="nav">
   
//       <AppBar className='navSecond' style={{backgroundColor:'white'}}>
//       {/* <CssBaseline /> */}
//       {/* <Toolbar> */}
//         <React.Fragment>
//           <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
//             <div>
//               <img src="images/blackAppoMo.png" height="40px" width="120px" className='AppoMoLogo'/>
//             </div>
           
//             <div className={classes.navlinks}>
//                 <Link to="/" className={classes.link}>
//                   Dashboard
//                 </Link>
//                 <Link to="/Appointment" className={classes.link}>
//                   Appointments
//                 </Link>
//                 <Link to="/" className={classes.link}>
//                   Service
//                 </Link>
//             </div>
            
                
//             <div className="divide">
//               <div className="notify">
//               <Link to="/" className={classes.link}>
//                 <img src="images/notification.png" height="35px" width="35px"/>
//               </Link>
//               </div>
//               <div>
//                 <Tooltip title="Account settings">
//                   <IconButton
//                       onClick={handleClick}
//                       size="small"
//                       sx={{ ml: 2 }}
//                       aria-controls={open ? 'account-menu' : undefined}
//                       aria-haspopup="true"
//                       aria-expanded={open ? 'true' : undefined}
//                     >
//                       <img src="images/profile.png" height="35px" width="35px" className='profile'/>
//                       {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
//                   </IconButton>
//                 </Tooltip>
//             </div>
//             </div>
            
            
//           </Box>
    
//           <Menu
              
//             anchorEl={anchorEl}
//             id="account-menu"
//             open={open}
//             onClose={handleClose}
//             onClick={handleClose}
//             PaperProps={{
//               elevation: 0,
//               sx: {
//                 overflow: 'visible',
//                 filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                 mt: 1.5,
//                 '& .MuiAvatar-root': {
//                   width: 32,
//                   height: 32,
//                   ml: -0.5,
//                   mr: 1,
//                 },
//                 '&:before': {
//                   content: '""',
//                   display: 'block',
//                   position: 'absolute',
//                   top: 0,
//                   right: 14,
//                   width: 10,
//                   height: 10,
//                   bgcolor: 'background.paper',
//                   transform: 'translateY(-50%) rotate(45deg)',
//                   zIndex: 0,
//                 },
//               },
//             }}
//             transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//             anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//           >
//                 <MenuItem onClick={handleClose} >
//                   Edit Profile
//                 </MenuItem>
//                 <MenuItem onClick={handleClose}>
//                   <Link to="/service">Reset Password</Link>
//                 </MenuItem>
//                 <MenuItem onClick={handleClose}>
//                   Edit Branch Details
//                 </MenuItem>
//                 <Divider />
//                 <MenuItem onClick={handleClose} style={{backgroundColor:"#0C6D71",color:"white"}}>
                  
//                   Logout
//                 </MenuItem>
//           </Menu> 
        
//       </React.Fragment>
//     {/* </Toolbar> */}
//     </AppBar>   
  
// </div>
// )

// }




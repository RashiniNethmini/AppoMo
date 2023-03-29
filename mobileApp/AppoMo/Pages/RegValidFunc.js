const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    return usernameRegex.test(username);
};  
// ensure that the username contains only letters, numbers, underscores, or hyphens and is between 3 and 16 characters long

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
};
//ensure that the password contains at least 8 characters with at least one uppercase letter, one lowercase letter, and one number.

const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
};
//checks if the password and confirm password fields match.

const validateFullName =(fullname) =>{
    return fullname.trim().length > 0;
}
//checks if the fullName field is not empty after removing any leading or trailing whitespace.

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
//ensure that the email address is in a valid format.

const validateAddress = (address) => {
    return address.trim().length > 0;
};
// checks if the address field is not empty after removing any leading or trailing whitespace.


const validateNIC = (nic) => {
    const nicRegex1 = /^[0-9]{9}[vVxX]$/;
    const nicRegex2 = /^[0-9]{11}$/;
    return (nicRegex1.test(nic) || nicRegex2.test(nic));
};
//ensure that the NIC contains exactly 9 or 11 digits followed by a letter 'v', 'V', 'x', or 'X'.


  const validateContactNo= (contactNo) => {
    const contctreg = /^[0-9]+$/;
    return contctreg.test(contactNo);
   
  };
  //ensure that the contact number is valid

// import React from 'react'

// var emailRegex =
// 	/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

// const isEmailValid = (email) => {
// 	if (!email) return false;

// 	if (email.length > 254) return false;

// 	var valid = emailRegex.test(email);
// 	if (!valid) return false;

// 	// Further checking of some things regex can't handle
// 	var parts = email.split("@");
// 	if (parts[0].length > 64) return false;

// 	var domainParts = parts[1].split(".");
// 	if (
// 		domainParts.some(function (part) {
// 			return part.length > 63;
// 		})
// 	)
// 		return false;

// 	return true;
// };

// export default function signupVerify(props){
//     const {username,email,password,city,accType,errFunc} = props

//     const areas = ['Kalutara','Colombo','Gampaha','Ampara','Anuradhapura','Badulla','Batticaloa','Galle','Hambantota','Jaffna','Kandy','Kegalla','Kilinochchi','Kurunegala','Mannar','Matale','Matara','Moneragala','Mullaitivu','Nuwara Eliya','Polonnaruwa','Puttalam','Ratnapura','Trincomalee','Vavuniya']
    
//     if (!username || typeof username != "string") {
//         errFunc("Invalid Username")
//         return(null)
//     }

//     if (username.length < 5) { 
//         errFunc("Username must be at least 5 characters")
//         return(null)
//     }

//     if (!email || !isEmailValid(email)) {
//         errFunc("Invalid Email")
//         return(null) 
//     }

//     if (!password || typeof password !== "string") {
//         errFunc("Invalid Password")
//         return(null)
//     }

//     if (password.length < 5) {
//         errFunc("Password must be at least 5 characters")
//         return(null) 
//     }

//     if(!city || !areas.includes(city)){
//         errFunc("Invalid Living Area")
//         return(null)
//     }

//     if(!accType){
//         errFunc("Invalid Account Type")
//         return(null)
//     }

//     if(accType !== 'Buyer' && accType !== 'Seller'){
//         errFunc("Invalid Account Type")
//         return(null) 
//     }

//     errFunc("Done")
//     return(null)
// }
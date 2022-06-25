import React, { useEffect } from 'react'
import axios from 'axios'
import SignInUI from './SignInUI'

export default function(){

    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")
    const [token,setToken] = React.useState("")
    const [userId,setUserId] = React.useState("")

    const [isLoading,setIsLoading] = React.useState(false)

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    useEffect(()=>{
        const reqObj = {
            token
        }

        setIsLoading(true)

		axios.post('http://localhost:8080/getUserId', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    document.cookie = `jwt=`;
                    setToken("")
                }else{
                    setUserId(res.data.id)
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

        setIsLoading(false)

    },[token])


    useEffect(()=>{
        const reqObj = {
            token,
            id:userId
        }

        setIsLoading(true)

		axios.post('http://localhost:8080/getUser', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    setUserId("")
                }else{
                    console.log(res.data.user)
                    if(res.data.user.accountType == 'Buyer'){
                        window.location.assign('/buyer/profile')
                    }
                    else if(res.data.user.accountType == 'Seller'){
                        window.location.assign('/buyer/profile')
                    }
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

        setIsLoading(false)

    },[userId])

    function handleSubmit(e){
        e.preventDefault()

        const reqObj = {
            email,
            password
        }

        setIsLoading(true)

		axios.post('http://localhost:8080/login', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    alert(res.data.message)
                    document.cookie = `jwt=`;
                }else{
                    alert(res.data.message)
                    document.cookie = `jwt=${res.data.token}`;
                }

                if(document.cookie.length > 1){
                    const myArray = document.cookie.split("=");
                    setToken(myArray[1])
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

        setIsLoading(false)    
    }

    function handleEmail(email){
        setEmail(email)
    }

    function handlePassword(pwd){
        setPassword(pwd)
    }

    return(
        <SignInUI 
            handleSubmit={handleSubmit}
            handleEmail={handleEmail}
            handlePassword={handlePassword}
        />
    )
}
import React from 'react'
import axios from 'axios'
import SignUpUI from './SignUpUI'
import {setCookie} from 'react-cookie'

export default function(){

    const [username,setUsername] = React.useState("")
    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")
    const [city,setCity] = React.useState("")
    const [accType,setAccType] = React.useState("")
    const [errors,setErrors] = React.useState("")
    const [isErr,setIsErr] = React.useState(false)

    const [isLoading,setIsLoading] = React.useState(false)

    function handleErrors(err){
        setErrors(err)
    }

    function handleSubmit(e){
        e.preventDefault()

        const reqObj = {
            username,
            email,
            password,
            accountType:accType,
            livingArea:city
        }

        let axiosConfig = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

        setIsLoading(true)

		axios.post('http://localhost:8080/signup', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    setErrors(res.data.message)
                    setIsErr(true)
                }else{
                    alert(res.data.message)
                    setErrors("")
                    setIsErr(false)
                    // document.cookie = `jwt=${res.data.token}`;
                    setCookie('jwt',res.data.token)
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

        setIsLoading(false)    
    }

    function handleUsername(username){
        setUsername(username)
    }

    function handleEmail(email){
        setEmail(email)
    }

    function handlePassword(pwd){
        setPassword(pwd)
    }

    function handleCity(city){
        setCity(city)
    }

    function handleAccType(acc){
        setAccType(acc)
    }

    return(
        <SignUpUI 
            handleSubmit={handleSubmit}
            handleUsername={handleUsername}
            handleEmail={handleEmail}
            handlePassword={handlePassword}
            handleCity={handleCity}
            handleAccType={handleAccType}
            errors={errors}
            isErr={isErr}
            isLoading={isLoading}
        />
    )
}
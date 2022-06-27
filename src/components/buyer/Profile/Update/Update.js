import React from 'react'
import UpdateUI from './UpdateUI'
import axios from 'axios'

export default function Update(){

    const [username,setUsername] = React.useState(null)
    const [email,setEmail] = React.useState(null)
    const [password,setPassword] = React.useState("")
    const [city,setCity] = React.useState(null)
    const [accType,setAccType] = React.useState(null)
    const [errors,setErrors] = React.useState(null)
    const [isErr,setIsErr] = React.useState(false)

    const [token,setToken] = React.useState(null)
    const [userId,setUserId] = React.useState(null)
    const [user,setUser] = React.useState(null)

    const [isLoading,setIsLoading] = React.useState(false)

    function handleErrors(err){
        setErrors(err)
    }

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    React.useEffect(()=>{
        if(document.cookie.length > 1){
            const myArray = document.cookie.split("=");
            setToken(myArray[2])
        }
    },[0])

    React.useEffect(()=>{
        const reqObj = {
            token
        }

        token !== null && axios.post('http://localhost:8080/checkUserToken', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    alert(res.data.message)
                    window.location.assign("/")
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

        token !== null && axios.post('http://localhost:8080/getUserId', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    alert(res.data.message)
                    window.location.assign("/")
                }else{
                    setUserId(res.data.id)
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

    },[token])

    React.useEffect(()=>{
        const reqObj = {
            token,
            id:userId
        }

		userId !== null &&axios.post('http://localhost:8080/getUser', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    alert(res.data.message)
                    window.location.assign("/")
                }else{
                    //setUser(res.data.user)
                    setUsername(res.data.user.username)
                    setEmail(res.data.user.email)
                    setCity(res.data.user.livingArea)
                    setAccType(res.data.user.accountType)
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

    },[userId])

    React.useEffect(()=>{
        setUser({
            username,
            email,
            password,
            city
        })
    },[username])

    React.useEffect(()=>{
        setUser({
            username,
            email,
            password,
            city
        })
    },[email])

    React.useEffect(()=>{
        setUser({
            username,
            email,
            password,
            city
        })
    },[city])

    React.useEffect(()=>{
        setUser({
            username,
            email,
            password,
            city
        })
    },[password])

    React.useEffect(()=>{
        setUser({
            username,
            email,
            password,
            city
        })
    },[accType])

    function handleSubmit(e){
        e.preventDefault()

        const reqObj = {
            userId,
            username,
            email,
            password,
            accountType:accType,
            livingArea:city,
            token
        }

        setIsLoading(true)

		user !== null && axios.put('http://localhost:8080/updateUser', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    setErrors(res.data.message)
                    setIsErr(true)
                }else{
                    alert(res.data.message)
                    setErrors("")
                    setIsErr(false)
                    window.location.assign('/buyer/profile')
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

    return(
        <UpdateUI
            handleSubmit={handleSubmit}
            handleUsername={handleUsername}
            handleEmail={handleEmail}
            handlePassword={handlePassword}
            handleCity={handleCity}
            errors={errors}
            isErr={isErr}
            isLoading={isLoading}
            user={user}
        />
    )
}
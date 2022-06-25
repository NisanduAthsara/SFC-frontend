import React from 'react'
import axios from 'axios'
import ProfileUI from './ProfileUI'

export default function Profile(){
    const [user,setUser] = React.useState({})
    const [token,setToken] = React.useState("")
    const [userId,setUserId] = React.useState("")

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if(document.cookie.length > 1){
        const myArray = document.cookie.split("=");
        setToken(myArray[1])
    }

    React.useEffect(()=>{
        const reqObj = {
            token
        }

        axios.post('http://localhost:8080/checkUserToken', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    alert(res.data.message)
                    window.location.assign("/")
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

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

    },[token])

    React.useEffect(()=>{
        const reqObj = {
            token
        }

		axios.post('http://localhost:8080/getUser', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    document.cookie = `jwt=`;
                }else{
                    setUser(res.data.user)
                    console.log(res.data.user)
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

    },[userId])


    return(
        <ProfileUI
            username={user.username}
            email={user.email}
            city={user.livingArea}
        />
    )
}
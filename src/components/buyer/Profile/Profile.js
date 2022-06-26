import React from 'react'
import axios from 'axios'
import ProfileUI from './ProfileUI'

export default function Profile(){
    const [user,setUser] = React.useState({})
    const [token,setToken] = React.useState(null)
    const [userId,setUserId] = React.useState(null)

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };   

    React.useEffect(()=>{
        if(document.cookie.length > 1){
            const myArray = document.cookie.split("=");
            setToken(myArray[1])
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
                    setUser(res.data.user)
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
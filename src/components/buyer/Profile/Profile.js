import React from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";
import ProfileUI from './ProfileUI'

export default function Profile(){
    const [user,setUser] = React.useState({})
    const [token,setToken] = React.useState(null)
    const [userId,setUserId] = React.useState(null)
    const [isDelOn,setIsDelOn] = React.useState(false)
    const [isAccDel,setIsAccDel] = React.useState(false)
    const [isLogOut,setIsLogOut] = React.useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

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
                    setUser(res.data.user)
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

    },[userId])

    React.useEffect(()=>{
        if(token !== null){
            const reqObj = {
                token,
                userId
            }
    
            isAccDel === true && axios.delete('http://localhost:8080/deleteUser', reqObj, axiosConfig)
                .then((res) => {
                    if(res.data.success === false){
                        // alert(res.data.message)
                        // window.location.assign("/")
                        console.log(res.data)
                    }else{
                        window.location.assign("/")
                    }
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
    },[isAccDel])

    React.useEffect(()=>{
        if(isLogOut){
            removeCookie('jwt',{path:'/'})
            window.location.assign('/')
        }
    },[isLogOut])

    function handleDelOn(){
        setIsDelOn((prev)=>{
            return !prev
        })
    }

    function handleAccDel(){
        setIsAccDel(true)
    }

    function handleLogout(){
        setIsLogOut(true)
    }

    return(
        <ProfileUI
            username={user.username}
            email={user.email}
            city={user.livingArea}
            isDelOn={isDelOn}
            handleDelOn={handleDelOn}
            handleAccDel={handleAccDel}
            handleLogout={handleLogout}
        />
    )
}
import React from 'react'
import axios from 'axios'
import { useCookies} from "react-cookie";
import ProfileUI from './ProfileUI'

export default function Profile(){
    const [user,setUser] = React.useState({})
    const [token,setToken] = React.useState(null)
    const [userId,setUserId] = React.useState(null)
    const [isDelOn,setIsDelOn] = React.useState(false)
    const [isAccDel,setIsAccDel] = React.useState(false)
    const [isLogOut,setIsLogOut] = React.useState(false)
    const [isOrg,setIsOrg] = React.useState(false)
    const [cookies, setCookie,removeCookie] = useCookies(['jwt','orgJwt']);

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };   

    React.useEffect(()=>{
        if(document.cookie.length > 1){
            const tokenCookie = cookies.jwt
            setToken(tokenCookie)
        }
    },[0])

    React.useEffect(()=>{
        const reqObj = {
            token
        }

        token !== null && axios.post('http://localhost:8080/checkSellerToken', reqObj, axiosConfig)
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

        const secReqObj = {
            token,
            userId
        }    
         
        userId !== null && axios.post('http://localhost:8080/findOrg',secReqObj,axiosConfig)
            .then((res)=>{
                if(res.data.success === false){
                    if(res.data.message === 'Haven\'t an organization...!'){
                        setIsOrg(false)
                    }
                }else{
                    setIsOrg(true)
                }    
            })    

    },[userId])

    React.useEffect(()=>{
        if(token !== null){
            const reqObj = {
                token,
                userId
            }
    
            isAccDel === true && axios.delete('http://localhost:8080/deleteUser', {data:reqObj}, axiosConfig)
                .then((res) => {
                    if(res.data.success === false){
                        alert(res.data.message)
                        window.location.assign("/")
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
            removeCookie('orgJwt',{path:'/'})
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
            isOrg={isOrg}
        />
    )
}
import React from 'react'
import axios from 'axios'
import { useCookies} from "react-cookie";
import ProfileUI from './ProfileUI'

export default function Profile(){
    const [user,setUser] = React.useState(null)
    const [organization,setOrganization] = React.useState({})
    const [token,setToken] = React.useState(null)
    const [orgToken,setOrgToken] = React.useState(null)
    const [userId,setUserId] = React.useState(null)
    const [orgId,setOrgId] = React.useState(null)
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
        const reqObj = {
            userId,
            token
        }

		userId !== null &&axios.post('http://localhost:8080/findOrg', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    alert(res.data.message)
                    window.location.assign("/")
                }else{
                    setOrgToken(res.data.token)
                    setCookie('orgJwt',res.data.token,{path:'/'})
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

    },[user])

    React.useEffect(()=>{
        const reqObj = {
            token:orgToken
        }

		orgToken !== null &&axios.post('http://localhost:8080/getOrgId', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    alert(res.data.message)
                    window.location.assign("/")
                    console.log(res.data.message)
                }else{
                    setOrgId(res.data.id)
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

    },[orgToken])

    React.useEffect(()=>{
        const reqObj = {
            token:orgToken,
            id:orgId
        }

		orgId !== null &&axios.post('http://localhost:8080/getOrgById', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    alert(res.data.message)
                    window.location.assign("/")
                    console.log(res.data.message)
                }else{
                    setOrganization(res.data.organization)
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

    },[orgId])


    return(
        <ProfileUI
            name={organization.name}
            contactNo={organization.contactNo}
            city={organization.city}
            address={organization.address}
            imgLink={organization.imgLink}
        />
    )
}
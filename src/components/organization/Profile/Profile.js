import React from 'react'
import axios from 'axios'
import { useCookies} from "react-cookie";
import { getStorage, ref, deleteObject } from "firebase/storage";
import ProfileUI from './ProfileUI'

export default function Profile(){
    const [user,setUser] = React.useState(null)
    const [organization,setOrganization] = React.useState({})
    const [token,setToken] = React.useState(null)
    const [orgToken,setOrgToken] = React.useState(null)
    const [userId,setUserId] = React.useState(null)
    const [orgId,setOrgId] = React.useState(null)
    const [isDelOn,setIsDelOn] = React.useState(false)
    const [isAccDel,setIsAccDel] = React.useState(false)
    const [products,setProducts] = React.useState(null)
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

		orgId !== null && axios.post('http://localhost:8080/getOrgById', reqObj, axiosConfig)
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

        const reqObj2 = {
            token:orgToken,
            orgId
        }

        orgId !== null && axios.post('http://localhost:8080/findProducts', reqObj2, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    alert(res.data.message)
                    window.location.assign("/")
                    console.log(res.data.message)
                }else if(res.data.message === 'No Products...!'){
                    setProducts(null)
                }else{
                    setProducts(res.data.products)
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})    

    },[orgId])

    React.useEffect(()=>{
        if(orgToken !== null){
            const reqObj = {
                token:orgToken,
                orgId
            }
    
            isAccDel === true && axios.delete('http://localhost:8080/deleteOrg', {data:reqObj}, axiosConfig)
                .then((res) => {
                    if(res.data.success === false){
                        alert(res.data.message)
                        window.location.assign("/seller/profile")
                    }else{
                        const storage = getStorage();
                        const desertRef = ref(storage, organization.imgLink);

                        deleteObject(desertRef).then(() => {
                            removeCookie('orgJwt')
                            alert('Successfully deleted organization!')
                            window.location.assign("/seller/profile")
                        }).catch((error) => {
                            alert('Something went wrong!')
                            window.location.assign("/seller/profile")
                        });
                    }
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
    },[isAccDel])

    function handleDelOn(){
        setIsDelOn((prev)=>{
            return !prev
        })
    }

    function handleAccDel(){
        setIsAccDel(true)
    }


    return(
        <ProfileUI
            name={organization.name}
            contactNo={organization.contactNo}
            city={organization.city}
            address={organization.address}
            imgLink={organization.imgLink}
            isDelOn={isDelOn}
            products={products}
            handleDelOn={handleDelOn}
            handleAccDel={handleAccDel}
        />
    )
}
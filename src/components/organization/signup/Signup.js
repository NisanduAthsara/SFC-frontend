import React from 'react'
import axios from 'axios'
import {storage} from './firebase/firebase'
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage'
import {v4} from 'uuid'
import SignupUI from './SignupUI'
import { removeCookie , useCookies} from "react-cookie";

export default function Signup(){
    const [name,setName] = React.useState(null)
    const [contact,setContact] = React.useState(null)
    const [city,setCity] = React.useState(null)
    const [sellItem,setSellItem] = React.useState(null)
    const [address,setAddress] = React.useState(null)
    const [openingHours,setOpeningHours] = React.useState(null)
    const [imgLink,setImgLink] = React.useState(null)
    const [imgFile,setImgFile] = React.useState(null)
    const [isSubmit,setIsSubmit] = React.useState(false)
    const [isErr,setIsErr] = React.useState(false)

    const [token,setToken] = React.useState(null)
    const [userId,setUserId] = React.useState(null)
    const [user,setUser] = React.useState(null)
    const [cookies, setCookie] = useCookies(['jwt']);

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
        if(isSubmit == false) return;
        const imageTypes = ['image/jpeg','image/png','image/jpg']
        //console.log(imgFile.type)
        if(!imageTypes.includes(imgFile.type)){
            alert('invalid file type')
            return
        }
        const imageRef = ref(storage,`image/${imgFile.name+v4()}`)
        uploadBytes(imageRef,imgFile).then((res)=>{
            alert('Image uploaded')
            getDownloadURL(res.ref).then((response)=>{
                setImgLink(response)
            })
        })
    },[isSubmit])

    React.useEffect(()=>{
        if(imgLink == null) return
        const reqObj = {
            name,
            contactNo:contact,
            city,
            sellItem,
            address,
            userId,
            openingHours,
            imgLink,
            token,
            accountType:user.accountType
        }

        imgLink !== null && axios.post('http://localhost:8080/orgSignup', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    alert(res.data.message)
                }else{
                    alert(res.data.message)
                    window.location.assign('/seller/profile')
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})
    },[imgLink])

    function handleName(e){
        setName(e.target.value)
    }

    function handleContact(e){
        setContact(e.target.value)
    }

    function handleCity(e){
        setCity(e.target.value)
    }

    function handleSellItem(e){
        setSellItem(e.target.value)
    }

    function handleAddress(e){
        setAddress(e.target.value)
    }

    function handleOpeningHours(e){
        setOpeningHours(e.target.value)
    }

    function handleImgFile(e){
        setImgFile(e.target.files[0])
    }

    function handleSubmit(e){
        e.preventDefault()
        setIsSubmit(true)
    }


    return(
        <SignupUI
            handleName={handleName}
            handleContact={handleContact}
            handleCity={handleCity}
            handleSellItem={handleSellItem}
            handleAddress={handleAddress}
            handleOpeningHours={handleOpeningHours}
            handleSubmit={handleSubmit}
            handleImgFile={handleImgFile}
        />
    )
}
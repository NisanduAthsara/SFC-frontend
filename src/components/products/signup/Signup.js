import React from 'react'
import axios from 'axios'
import {storage} from './firebase/firebase'
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage'
import {v4} from 'uuid'
import SignupUI from './SignupUI'
import { removeCookie , useCookies} from "react-cookie";

export default function Signup(){

    const [orgId,setOrgId] = React.useState(null)
    const [organization,setOrganization] = React.useState(null)
    const [sellItem,setSellItem] = React.useState(null)
    const [productName,setProductName] = React.useState(null)
    const [brand,setBrand] = React.useState(null)
    const [status,setStatus] = React.useState(null)
    const [imgLink,setImgLink] = React.useState(null)
    const [imgFile,setImgFile] = React.useState(null)
    const [nextComingDate,setNextComingDate] = React.useState(null)

    const [orgToken,setOrgToken] = React.useState(null)
    const [isSubmit,setIsSubmit] = React.useState(false)
    const [cookies, setCookie] = useCookies(['jwt','orgJwt']);

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    React.useEffect(()=>{
        if(document.cookie.length > 1){
            const tokenCookie = cookies.orgJwt
            setOrgToken(tokenCookie)
        }
    },[0])

    React.useEffect(()=>{
        const reqObj = {
            token:orgToken
        }

        orgToken !== null && axios.post('http://localhost:8080/checkOrgToken', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    alert(res.data.message)
                    window.location.assign("/")
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

        orgToken !== null && axios.post('http://localhost:8080/getOrgId', reqObj, axiosConfig)
			.then((res) => {
				if(res.data.success === false){
                    alert(res.data.message)
                    window.location.assign("/")
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
                }else{
                    setOrganization(res.data.organization)
                    setSellItem(res.data.organization.sellItem)
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

    },[orgId])

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
            productName,
            brand,
            status,
            imgLink,
            nextComingDate,
            organizationId:orgId,
            token:orgToken
        }

        imgLink !== null && axios.post('http://localhost:8080/newProduct', reqObj, axiosConfig)
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
        setProductName(e.target.value)
    }

    function handleBrand(e){
        setBrand(e.target.value)
    }

    function handleStatus(e){
        setStatus(e.target.value)
    }

    function handleComingDate(e){
        setNextComingDate(e.target.value)
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
            handleBrand={handleBrand}
            handleStatus={handleStatus}
            handleComingDate={handleComingDate}
            handleImgFile={handleImgFile}
            handleSubmit={handleSubmit}
            sellItem={sellItem}
        />
    )
}
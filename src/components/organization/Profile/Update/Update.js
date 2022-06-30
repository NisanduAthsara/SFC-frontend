import React from 'react'
import UpdateUI from './UpdateUI'
import {useCookies} from "react-cookie";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {storage} from '../../signup/firebase/firebase'
import { uploadBytes,getDownloadURL } from 'firebase/storage'
import {v4} from 'uuid'
import axios from 'axios'

export default function Update(){
    const [token,setToken] = React.useState(null)
    const [organization,setOrganization] = React.useState(null)
    const [orgToken,setOrgToken] = React.useState(null)
    const [orgId,setOrgId] = React.useState(null)
    const [cookies, setCookie,removeCookie] = useCookies(['jwt','orgJwt']);

    const [name,setName] = React.useState(null)
    const [contact,setContact] = React.useState(null)
    const [city,setCity] = React.useState(null)
    const [sellItem,setSellItem] = React.useState(null)
    const [address,setAddress] = React.useState(null)
    const [openingHours,setOpeningHours] = React.useState(null)
    const [imgLink,setImgLink] = React.useState(null)
    const [userId,setUserId] = React.useState(null)
    const [image,setImage] = React.useState(null)
    const [isSubmitOn,setIsSubmitOn] = React.useState(false)
    const [accountType,setAccountType] = React.useState(null)

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    React.useEffect(()=>{
        if(document.cookie.length > 1){
            const tokenCookie = cookies.orgJwt
            const tokenUser = cookies.jwt
            setToken(tokenUser)
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
                    setName(res.data.organization.name)
                    setContact(res.data.organization.contactNo)
                    setCity(res.data.organization.city)
                    setSellItem(res.data.organization.sellItem)
                    setAddress(res.data.organization.address)
                    setOpeningHours(res.data.organization.openingHours)
                    setImgLink(res.data.organization.imgLink)
                    setUserId(res.data.organization.userId)
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})

    },[orgId])

    React.useEffect(()=>{
        const reqObj = {
            token,
            id:userId
        }

        userId !== null &&axios.post('http://localhost:8080/getUser', reqObj, axiosConfig)
			.then((res) => {
                console.log(userId)
				if(res.data.success === false){
                    alert(res.data.message)
                }else{
                    setAccountType(res.data.user.accountType)
                }
			})
			.catch((err) => {
				console.log("AXIOS ERROR: ", err);
			})
    },[userId])

    function handleRemoveImage(){
        const storage = getStorage();
        const desertRef = ref(storage, imgLink);

        deleteObject(desertRef).then(() => {
            alert('Successfully Deleted Image!')
            setImgLink('')
        }).catch((error) => {
            alert('Something went wrong!')
        });
    }

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

    function handleSubmit(e){
        e.preventDefault()

        // const storageFirebase = getStorage();
        // const desertRef = ref(storageFirebase, imgLink);

        if(imgLink.length > 1){
            setImgLink(null)
        }

        //imgLink!==null && deleteObject(desertRef).then(() => {
        if(image === null){
            console.log(imgLink)
            setIsSubmitOn(true)
        }
        // }).catch((error) => {
        //     alert('Something went wrong!')
        // });        
    }

    React.useEffect(()=>{
        if(image === null) return
        const imageTypes = ['image/jpeg','image/png','image/jpg']

        if(!imageTypes.includes(image.type)){
            alert('invalid file type')
            return
        }
        const imageRef = ref(storage,`image/${image.name+v4()}`)
        uploadBytes(imageRef,image).then((res)=>{
            getDownloadURL(res.ref).then((response)=>{
                setImgLink(response)
                setIsSubmitOn(true)
            })
        })
    },[image])

    React.useEffect(()=>{
        console.log(imgLink)
        const reqObj = {
            name,
            contactNo:contact,
            userId,
            city,
            sellItem,
            address,
            openingHours,
            imgLink,
            orgId,
            token:orgToken,
            accountType
        }

        isSubmitOn === true && axios.put('http://localhost:8080/updateOrg', reqObj, axiosConfig)
            .then((res) => {
                if(res.data.success === false){
                    console.log(reqObj)
                    console.log(res.data.message)
                    // alert(res.data.message)
                }else{
                    console.log('done')
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    },[isSubmitOn])

    function handleChangeSubmit(e){
        e.preventDefault()
    }

    function handleImage(e){
        setImage(e.target.files[0])
    }

    return(
        <UpdateUI
            name={name}
            contact={contact}
            city={city}
            sellItem={sellItem}
            address={address}
            openingHours={openingHours}
            imgLink={imgLink}
            handleName={handleName}
            handleContact={handleContact}
            handleCity={handleCity}
            handleSellItem={handleSellItem}
            handleAddress={handleAddress}
            handleOpeningHours={handleOpeningHours}
            handleSubmit={handleSubmit}
            handleRemoveImage={handleRemoveImage}
            handleChangeSubmit={handleChangeSubmit}
            handleImage={handleImage}
        />
    )
}
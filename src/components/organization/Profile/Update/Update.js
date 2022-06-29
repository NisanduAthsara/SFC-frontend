import React from 'react'
import UpdateUI from './UpdateUI'
import {useCookies} from "react-cookie";
import axios from 'axios'

export default function Update(){
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

    return(
        <UpdateUI
            organization={organization}
        />
    )
}
import React from 'react'
import {Link} from 'react-router-dom'

export default function ProfileUI(props){
    return(
        <div>
            <Link to="/seller/profile">Back</Link>
            <h1>{props.name}</h1>
            <h2>{props.contactNo}</h2>
            <h2>{props.city}</h2>
            <h2>{props.address}</h2>
            <img src={props.imgLink} width="90" height="90"/>
        </div>
    )
}
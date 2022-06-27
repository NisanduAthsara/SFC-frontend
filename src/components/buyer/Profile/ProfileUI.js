import React from 'react'
import {Link} from 'react-router-dom'

export default function ProfileUI(props){
    return (
        <div>
            <Link to="/buyer/profile/update">Update</Link>
            <h1>{props.username}</h1>
            <h3>{props.email}</h3>
            <h3>{props.city}</h3>
        </div>
    )
}
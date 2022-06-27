import React from 'react'
import {Link} from 'react-router-dom'

export default function ProfileUI(props){
    return (
        <div>
            {props.isDelOn && <div>
                <div>Are you sure to delete</div>
                <button onClick={props.handleAccDel}>Yes</button>  
                <button onClick={props.handleDelOn}>Cancle</button>  
            </div>}
            <button onClick={props.handleLogout}>Logout</button>
            <div>
                <Link to="/buyer/profile/update">Update</Link>
                <button onClick={props.handleDelOn}>Delete Your Account</button>
                <h1>{props.username}</h1>
                <h3>{props.email}</h3>
                <h3>{props.city}</h3>
            </div>
        </div>
    )
}
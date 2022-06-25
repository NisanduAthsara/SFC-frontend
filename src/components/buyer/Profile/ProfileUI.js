import React from 'react'

export default function ProfileUI(props){
    return (
        <div>
            <h1>{props.username}</h1>
            <h3>{props.email}</h3>
            <h3>{props.city}</h3>
        </div>
    )
}
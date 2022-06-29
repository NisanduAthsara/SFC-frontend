import React from 'react'

export default function UpdateUI(props){
    const {organization} = props
    return(
        <div>
            {organization !== null && 
                <div>
                    <h2>{organization.name}</h2>
                </div>
            }
        </div>
    )
}
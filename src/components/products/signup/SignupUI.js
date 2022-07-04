import React from 'react'

export default function SignupUI(props){
    return(
        <div>
            <form>
                <input type="text"/>
                <input type="text"/>
                <div onChange={(e)=>console.log(e.target.value)}>
                    <input type="radio" value="Available" name="gender" /> Available
                    <input type="radio" value="Not Available" name="gender" /> Not Available
                    <input type="radio" value="Final Bit" name="gender" /> Final Bit
                </div>
                <input type="file"/>
            </form>
        </div>
    )
}
import React from 'react'

export default function SignUpUI(props){
    return(
        <div>
            <form>
                <input type="email" name="email" onChange={(e)=>{props.handleEmail(e.target.value)}}/>
                <input type="password" name="password" onChange={(e)=>{props.handlePassword(e.target.value)}}/>
                <input type="submit" value="submit" onClick={(e)=>{props.handleSubmit(e)}}/>
            </form>
        </div>
    )
}
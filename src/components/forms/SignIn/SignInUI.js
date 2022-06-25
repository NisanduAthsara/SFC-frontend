import React from 'react'
import {Link} from 'react-router-dom'

export default function SignUpUI(props){
    return(
        <div>
            <Link to="/signup">SignUp</Link>
            <form>
                <input type="email" name="email" onChange={(e)=>{props.handleEmail(e.target.value)}}/>
                <input type="password" name="password" onChange={(e)=>{props.handlePassword(e.target.value)}}/>
                <input type="submit" value="submit" onClick={(e)=>{props.handleSubmit(e)}}/>
            </form>
        </div>
    )
}
import React from 'react'
import {Link} from 'react-router-dom'

export default function SignUpUI(props){
    const error = props.errors
    return(
        <div>
            <Link to="/">SignIn</Link>
            {props.isErr && <div>{error}</div>}
            {props.isLoading && <div>Loading...</div>}
            <form>
                <input type="text" name="username" onChange={(e)=>{props.handleUsername(e.target.value)}}/>
                <input type="email" name="email" onChange={(e)=>{props.handleEmail(e.target.value)}}/>
                <input type="password" name="password" onChange={(e)=>{props.handlePassword(e.target.value)}}/>
                <select name="accType" onChange={(e)=>{props.handleAccType(e.target.value)}}>
                    <option selected>--Select Account Type--</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                </select>
                <select name="livingArea" onChange={(e)=>{props.handleCity(e.target.value)}}>
                    <option selected>--Select City--</option>
                    <option value="Kalutara">Kalutara</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Ampara">Ampara</option>
                    <option value="Anuradhapura">Anuradhapura</option>
                    <option value="Badulla">Badulla</option>
                    <option value="Batticaloa">Batticaloa</option>
                    <option value="Galle">Galle</option>
                    <option value="Hambantota">Hambantota</option>
                    <option value="Jaffna">Jaffna</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Kegalla">Kegalla</option>
                    <option value="Kilinochchi">Kilinochchi</option>
                    <option value="Kurunegala">Kurunegala</option>
                    <option value="Mannar">Mannar</option>
                    <option value="Matale">Matale</option>
                    <option value="Matara">Matara</option>
                    <option value="Moneragala">Moneragala</option>
                    <option value="Mullaitivu">Mullaitivu</option>
                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                    <option value="Polonnaruwa">Polonnaruwa</option>
                    <option value="Puttalam">Puttalam</option>
                    <option value="Ratnapura">Ratnapura</option>
                    <option value="Trincomalee">Trincomalee</option>
                    <option value="Vavuniya">Vavuniya</option>
                </select>
                <input type="submit" value="submit" onClick={(e)=>{props.handleSubmit(e)}}/>
            </form>
        </div>
    )
}
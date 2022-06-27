import React from 'react'
import {Link} from 'react-router-dom'

export default function UpdateUI(props){
    const error = props.errors
    return(
        <div>
            <Link to="/buyer/profile">Back</Link>
            <form>
                {props.isErr && <div>{error}</div>}
                {props.isLoading && <div>Loading...</div>}
                <div>{props.user!==null&&<div>
                    <input type="text" name="username" value={props.user.username} onChange={(e)=>{props.handleUsername(e.target.value)}}/>
                    <input type="email" name="email" value={props.user.email} onChange={(e)=>{props.handleEmail(e.target.value)}}/>
                    <input type="password" name="password" value={props.user.password} onChange={(e)=>{props.handlePassword(e.target.value)}}/>
                    <select name="livingArea" value={props.user.city} onChange={(e)=>{props.handleCity(e.target.value)}}>
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
                </div>}</div>
            </form>
        </div>
    )
}
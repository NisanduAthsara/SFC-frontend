import React from 'react'

export default function SignupUI(props){
    return (
        <div>
            <form>
                <input type="text" onChange={(e)=>props.handleName(e)}/>
                <input type="text" onChange={(e)=>props.handleContact(e)}/>
                <select onChange={(e)=>props.handleCity(e)}>
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
                <select onChange={(e)=>props.handleSellItem(e)}>
                    <option>--Select Selling Item Type--</option>
                    <option value="fuel">Fuel</option>
                    <option value="gas">Gas</option>
                    <option value="milk powder">Milk Powder</option>
                </select>
                <input type="text" onChange={(e)=>props.handleAddress(e)}/>
                <input type="text" onChange={(e)=>props.handleOpeningHours(e)}/>
                <input type="file" onChange={(e)=>props.handleImgFile(e)}/>
                <button onClick={(e)=>props.handleSubmit(e)}>Sign Up</button>
            </form>
        </div>
    )
}
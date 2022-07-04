import React from 'react'
import { useState } from 'react'

export default function UpdateUI(props){
    const {name,contact,city,sellItem,address,openingHours,imgLink} = props
    const [isChange,setIsChange] = useState(false)
    const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThRGcLNaorK4esT7jd4P_MfhhrzowqyTHRqA8Ku2vZW7KNrswJYoA0CcmhlTTPsWSQZ5I&usqp=CAU'

    function handleChange(){
        setIsChange((prev)=>{
            return !prev
        })
    }

    return(
        <div>
            {imgLink !== null && 
                <div>
                    <form>
                        <input type="text" onChange={(e)=>props.handleName(e)} value={name}/>
                        <input type="text" onChange={(e)=>props.handleContact(e)} value={contact}/>
                        <select onChange={(e)=>props.handleCity(e)} value={city}>
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
                        <select onChange={(e)=>props.handleSellItem(e)} value={sellItem}>
                            <option>--Select Selling Item Type--</option>
                            <option value="fuel">Fuel</option>
                            <option value="gas">Gas</option>
                            <option value="milk powder">Milk Powder</option>
                        </select>
                        <input type="text" onChange={(e)=>props.handleAddress(e)} value={address}/>
                        <input type="text" onChange={(e)=>props.handleOpeningHours(e)} value={openingHours}/>
                        <button onClick={(e)=>props.handleSubmit(e)}>Sign Up</button>
                    </form>
                    <div>
                        <img src={imgLink} width="80" height="80"/>
                        {imgLink !== url &&<div>{imgLink !== null && <button onClick={props.handleRemoveImage}>Remove Image</button>}</div>}
                        {!isChange && <button onClick={handleChange}>Change Image</button>}
                        {isChange && <div>
                            <input type="file" onChange={props.handleImage}/>
                            <button onClick={handleChange}>Cancel</button>
                            <input type="submit" onClick={props.handleChangeSubmit}/>
                        </div>}
                    </div>
                </div>
            }
        </div>
    )
}
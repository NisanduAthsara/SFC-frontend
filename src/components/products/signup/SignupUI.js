import React from 'react'

export default function SignupUI(props){
    const sellItem = props.sellItem
    const fuel = ['IOC','Ceypetco']
    const gas = ['Litro','Laughs']
    const milk_powder = ['Anchor','Highland','Raththi','Pelawatta']

    let input = null
    if(sellItem === 'fuel'){
        input = fuel.map((item)=>{
            return <option value={item} key={item}>{item}</option>
        })
    }
    if(sellItem === 'gas'){
        input = gas.map((item)=>{
            return <option value={item}>{item}</option>
        })
    }
    if(sellItem === 'milk powder'){
        input = milk_powder.map((item)=>{
            return <option value={item}>{item}</option>
        })
    }
    return(
        <div>
            <form>
                <input type="text" onChange={(e)=>props.handleName(e)}/>
                <input type="text" onChange={(e)=>props.handleComingDate(e)}/>
                <div onChange={(e)=>props.handleStatus(e)}>
                    <input type="radio" value="Available" name="gender" /> Available
                    <input type="radio" value="Not Available" name="gender" /> Not Available
                    <input type="radio" value="Final Bit" name="gender" /> Final Bit
                </div>
                <select onChange={(e)=>props.handleBrand(e)}>
                    <option selected>--Select Brand--</option>
                    {input}
                </select>
                <input type="file" onChange={(e)=>props.handleImgFile(e)}/>
                <input type="submit" onClick={(e)=>props.handleSubmit(e)}/>
            </form>
        </div>
    )
}
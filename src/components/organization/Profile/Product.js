import React from 'react'
import {Link} from 'react-router-dom'

export default function Product(props){
    const [isDelOn,setIsDelOn] = React.useState(false)
    const [isAccDel,setIsAccDel] = React.useState(false)

    function handleDelOn(){
        setIsDelOn((prev)=>{
            return !prev
        })
    }

    function handleAccDel(id){
        props.handleProductId(id)
        setIsAccDel(true)
    }

    return(
        <div>
            <h1>{props.productName}</h1>
            <Link to={`/product/update?q=${props.id}`}>Update</Link>
            {/* <button onClick={()=>props.handleProductId(props.id)}>Delete</button> */}

            {isDelOn && <div>
                <div>Are you sure to delete</div>
                <button onClick={()=>handleAccDel(props.id)}>Yes</button>  
                <button onClick={handleDelOn}>Cancle</button>  
            </div>}

            <button onClick={handleDelOn}>Delete Your Product</button>
        </div>
    )
}
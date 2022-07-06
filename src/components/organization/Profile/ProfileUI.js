import React from 'react'
import Product from './Product'
import {Link} from 'react-router-dom'

export default function ProfileUI(props){
    let products
    if(props.products !== null){
        products = props.products.map((product)=>{
            // return <div>
            //     <h1>{product.productName}</h1>
            //     <Link to={`/product/update?q=${product._id}`}>Update</Link>
            //     <button onClick={()=>props.handleProductId(product._id)}>Delete</button>
            // </div>
            return <Product
                productName={product.productName}
                id={product._id}
                handleProductId={props.handleProductId}
            />
        })
    }
    return(
        <div>
            <Link to="/seller/profile">Back</Link>
            <Link to="/organization/profile/update">Update</Link>
            {props.isDelOn && <div>
                <div>Are you sure to delete</div>
                <button onClick={props.handleAccDel}>Yes</button>  
                <button onClick={props.handleDelOn}>Cancle</button>  
            </div>}

            <button onClick={props.handleDelOn}>Delete Your Organization</button>

            <h1>{props.name}</h1>
            <h2>{props.contactNo}</h2>
            <h2>{props.city}</h2>
            <h2>{props.address}</h2>
            <img src={props.imgLink} width="90" height="90"/>
            <div>
                {props.products !== null && <div>
                    {products}
                    {props.products.length <= 10 && <Link to='/addProducts'>Add New Product</Link>}
                </div>}
                {props.products === null && <div>
                    <h1>No Products</h1>
                    <Link to='/addProducts'>Add New Product</Link>
                </div>}
            </div>
        </div>
    )
}
import React from 'react'
import SignUp from './components/forms/SignUp/SignUp'
import SignIn from './components/forms/SignIn/SignIn'
import BuyerProfile from './components/buyer/Profile/Profile'
import BuyerUpdate from './components/buyer/Profile/Update/Update'
import SellerProfile from './components/seller/Profile/Profile'
import SellerUpdate from './components/seller/Profile/Update/Update'
import OrganizationSignup from './components/organization/signup/Signup'
import OrganizationProfile from './components/organization/Profile/Profile'
import OrganizationUpdate from './components/organization/Profile/Update/Update'
import ProductSignup from './components/products/signup/SignupUI'
import { CookiesProvider } from "react-cookie";
import {BrowserRouter,Routes,Route} from 'react-router-dom'


export default function App(){
    return(
        // <SignUp/>
        <CookiesProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/buyer/profile' element={<BuyerProfile/>} />
                <Route path='/buyer/profile/update' element={<BuyerUpdate/>}/>
                <Route path='/seller/profile' element={<SellerProfile/>} />
                <Route path='/seller/profile/update' element={<SellerUpdate/>}/>
                <Route path='/organization/signup' element={<OrganizationSignup/>}/>
                <Route path='/organization/profile' element={<OrganizationProfile/>}/>
                <Route path='/organization/profile/update' element={<OrganizationUpdate/>}/>
                <Route path='/addProducts' element={<ProductSignup/>}/>
            </Routes>
        </BrowserRouter>
        </CookiesProvider>
    )
}
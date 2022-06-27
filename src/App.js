import React from 'react'
import SignUp from './components/forms/SignUp/SignUp'
import SignIn from './components/forms/SignIn/SignIn'
import BuyerProfile from './components/buyer/Profile/Profile'
import Update from './components/buyer/Profile/Update/Update'
import {BrowserRouter,Routes,Route} from 'react-router-dom'


export default function App(){
    return(
        // <SignUp/>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/buyer/profile' element={<BuyerProfile/>} />
                <Route path='/buyer/profile/update' element={<Update/>}/>
            </Routes>
        </BrowserRouter>
    )
}
import React from 'react'
import SignUp from './components/forms/SignUp/SignUp'
import SignIn from './components/forms/SignIn/SignIn'
import BuyerProfile from './components/buyer/Profile/Profile'
// import {Router} from 'react-router-dom'
// import AppRoutes from './routes/AppRoutes'
import {BrowserRouter,Routes,Route} from 'react-router-dom'


export default function App(){
    return(
        // <SignUp/>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/buyer/profile' element={<BuyerProfile/>} />
            </Routes>
        </BrowserRouter>
    )
}
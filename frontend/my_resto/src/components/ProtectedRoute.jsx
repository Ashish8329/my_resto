import React from 'react'
import { get_localstorage } from './utils'
import { ADMIN_KEY, TOKEN_KEY } from '../constatns/api'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const token = get_localstorage(TOKEN_KEY)
    if(!token) {
        
        return <Navigate to='/staff/login' replace />
    }

    return children
   
}

export default ProtectedRoute

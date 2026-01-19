import React, { useState } from 'react'
import { post } from '../../api/api'
import { set_localstorage } from '../utils'
import { ADMIN_KEY, TOKEN_KEY } from '../../constatns/api'
import { useNavigate } from 'react-router-dom'



const StaffLogin = () => {
  const [username, SetUserName] = useState('')
  const [password, SetPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

 

  async function handlesubmit (e) {
     e.preventDefault();
    try {
      setLoading(true)

      const data = {
      'username' : username,
      'password' : password
    }
     
    const res = await post('/staff/login/', data)
    if (!res.access_token) {
      setError('something went wrong')
    }
    set_localstorage(TOKEN_KEY, res.access_token)

    if (res.user_role === ADMIN_KEY) {
      navigate('/staff/admin')
    } else {
      navigate('/staff/chef')
    }

    } catch (err) {
      setError(err.message)
    } finally{
      setLoading(false)
    }
   
    
  }

  if (loading) return <p> Loading...</p>


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
        
        {/* Logo / App Name */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">
            MyResto
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to continue
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handlesubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => SetUserName(e.target.value)}
              placeholder="admin12"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
            <span className="text-indigo-600 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
          >
            Login
          </button>
          {error ? <p className='text-red-700'>{error}</p> : ''}
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MyResto. All rights reserved.
        </div>

      </div>
    </div>
  )
}

export default StaffLogin

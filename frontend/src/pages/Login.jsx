import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ScrollAnimation from '../components/ScrollAnimation'
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi'

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [googleOAuthEnabled, setGoogleOAuthEnabled] = useState(false)
  const { login, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(user?.role === 'admin' ? '/admin' : '/dashboard')
    }
  }, [isAuthenticated, user, navigate])

  useEffect(() => {
    // Check if Google OAuth is enabled
    fetch('/api/auth/google/enabled')
      .then(res => res.json())
      .then(data => setGoogleOAuthEnabled(data.enabled))
      .catch(() => setGoogleOAuthEnabled(false))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Email or username is required'
    } else if (formData.identifier.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier)) {
      newErrors.identifier = 'Invalid email format'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    const result = await login(formData.identifier, formData.password)
    setLoading(false)

    if (result.success) {
      const redirectTo = result.user?.role === 'admin' ? '/admin' : '/dashboard'
      navigate(redirectTo)
    } else {
      setErrors({ submit: result.error })
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch('/api/auth/google/enabled')
      const data = await response.json()
      if (data.enabled) {
        window.location.href = '/api/auth/google'
      } else {
        setErrors({ submit: 'Google OAuth is not configured. Please use email/password to sign in.' })
      }
    } catch (error) {
      setErrors({ submit: 'Unable to connect to server. Please try again.' })
    }
  }

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center py-20">
      <ScrollAnimation direction="fade">
        <div className="w-full max-w-md">
          <div className="glass-effect rounded-2xl p-8">
            <h1 className="text-4xl font-heading font-bold text-center mb-2">
              Welcome <span className="text-gradient">Back</span>
            </h1>
            <p className="text-center text-blucia-white/70 font-body mb-8">
              Sign in to your account to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center space-x-2">
                  <FiAlertCircle className="text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-sm font-body">{errors.submit}</p>
                </div>
              )}

              <div>
                <label htmlFor="identifier" className="block text-sm font-heading font-semibold mb-2 text-white">
                  Email or Username
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blucia-white/50" size={20} />
                  <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body ${
                      errors.identifier ? 'border-red-500' : 'border-white/20'
                    }`}
                    placeholder="you@example.com or username"
                  />
                </div>
                {errors.identifier && <p className="text-red-400 text-sm mt-1">{errors.identifier}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-heading font-semibold mb-2 text-white">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blucia-white/50" size={20} />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body ${
                      errors.password ? 'border-red-500' : 'border-white/20'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-purple hover:bg-gradient-purple-light rounded-lg font-body font-semibold text-white transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {googleOAuthEnabled && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-blucia-dark text-blucia-white/70 font-body">Or continue with</span>
                  </div>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  className="mt-4 w-full px-6 py-3 glass-effect hover:bg-white/20 rounded-lg font-body font-semibold text-white transition-all flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Google</span>
                </button>
              </div>
            )}

            <p className="mt-6 text-center text-blucia-white/70 font-body">
              Don't have an account?{' '}
              <Link to="/register" className="text-blucia-accent hover:text-blucia-light font-semibold transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  )
}

export default Login


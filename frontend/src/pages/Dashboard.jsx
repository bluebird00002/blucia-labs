import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '../contexts/AuthContext'
import ScrollAnimation from '../components/ScrollAnimation'
import api from '../utils/api'
import { FiUser, FiMail, FiPhone, FiEdit, FiSave, FiX, FiClock, FiCheckCircle, FiAlertCircle, FiZap, FiShield, FiTrendingUp } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchRequests()
  }, [])

  useEffect(() => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    })
  }, [user])

  const normalizeRequest = (request) => ({
    ...request,
    serviceType: request.service_type || request.serviceType || 'Custom Engagement',
    projectDescription: request.project_description || request.projectDescription || '',
    createdAt: request.created_at || request.createdAt || new Date().toISOString(),
    budget: request.budget,
    timeline: request.timeline,
    status: request.status || 'pending'
  })

  const fetchRequests = async () => {
    try {
      const response = await api.get('/requests')
      const normalized = (response.data.requests || []).map(normalizeRequest)
      setRequests(normalized)
    } catch (error) {
      console.error('Failed to fetch requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProfileUpdate = async () => {
    setSaving(true)
    try {
      await api.put('/users/profile', profileData)
      setEditingProfile(false)
      // Refresh user data
      window.location.reload()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50', icon: FiClock },
      'in-progress': { color: 'bg-blue-500/20 text-blue-400 border-blue-500/50', icon: FiClock },
      completed: { color: 'bg-green-500/20 text-green-400 border-green-500/50', icon: FiCheckCircle },
      cancelled: { color: 'bg-red-500/20 text-red-400 border-red-500/50', icon: FiAlertCircle }
    }
    const config = statusConfig[status] || statusConfig.pending
    const Icon = config.icon
    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-body border ${config.color}`}>
        <Icon size={14} />
        <span className="capitalize">{status.replace('-', ' ')}</span>
      </span>
    )
  }

  const requestStats = useMemo(() => {
    const stats = {
      total: requests.length,
      pending: 0,
      inProgress: 0,
      completed: 0
    }
    requests.forEach((request) => {
      if (request.status === 'pending') stats.pending += 1
      if (request.status === 'in-progress') stats.inProgress += 1
      if (request.status === 'completed') stats.completed += 1
    })
    return stats
  }, [requests])

  const recentActivity = requests.slice(0, 4)

  const statusChipVariants = {
    pending: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/40',
    'in-progress': 'bg-blue-500/20 text-blue-200 border-blue-500/40',
    completed: 'bg-green-500/20 text-green-200 border-green-500/40',
    cancelled: 'bg-red-500/20 text-red-200 border-red-500/40'
  }

  const quickActions = [
    {
      title: 'Launch New Request',
      description: 'Tell us about your next build',
      link: '/contact',
      accent: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      title: 'Explore Services',
      description: 'Discover our full capabilities',
      link: '/services',
      accent: 'bg-gradient-to-br from-blue-500 to-indigo-500'
    },
    {
      title: 'Consult Strategist',
      description: 'Schedule a strategy session',
      link: '/contact',
      accent: 'bg-gradient-to-br from-emerald-500 to-teal-500'
    }
  ]

  return (
    <div className="pt-20 min-h-screen pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="fade">
          <div className="mb-10 glass-effect rounded-3xl p-8 border border-white/10 shadow-xl shadow-blucia-light/10">
            <p className="uppercase tracking-[0.3em] text-xs text-blucia-white/50 font-semibold mb-3">Client Mission Hub</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
              Welcome back, <span className="text-gradient">{user?.name || 'Visionary'}</span>
            </h1>
            <p className="text-blucia-white/70 font-body text-lg max-w-3xl">
              Your personal launch control for orchestrating BluCia Labs experiences. Track engagements, refine your profile,
              and keep every initiative on velocity.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <ScrollAnimation direction="up">
            <div className="glass-effect rounded-2xl p-6 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-blucia-white/60 font-semibold">Active Pipeline</p>
                <h3 className="text-3xl font-heading font-bold text-white mt-2">{requestStats.total}</h3>
                <p className="text-blucia-white/60 text-sm mt-1">Total engagements in play</p>
              </div>
              <FiTrendingUp className="text-blucia-accent" size={32} />
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.1}>
            <div className="glass-effect rounded-2xl p-6 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-blucia-white/60 font-semibold">Building Now</p>
                <h3 className="text-3xl font-heading font-bold text-white mt-2">{requestStats.inProgress}</h3>
                <p className="text-blucia-white/60 text-sm mt-1">Experiences in production</p>
              </div>
              <FiZap className="text-pink-400" size={32} />
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="glass-effect rounded-2xl p-6 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-blucia-white/60 font-semibold">Shipped Launches</p>
                <h3 className="text-3xl font-heading font-bold text-white mt-2">{requestStats.completed}</h3>
                <p className="text-blucia-white/60 text-sm mt-1">Delivered experiences</p>
              </div>
              <FiShield className="text-green-400" size={32} />
            </div>
          </ScrollAnimation>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <ScrollAnimation direction="right">
              <div className="glass-effect rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-white">Profile</h2>
                  {!editingProfile ? (
                    <button
                      onClick={() => setEditingProfile(true)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <FiEdit className="text-blucia-white/70" size={20} />
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleProfileUpdate}
                        disabled={saving}
                        className="p-2 hover:bg-green-500/20 rounded-lg transition-colors"
                      >
                        <FiSave className="text-green-400" size={20} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingProfile(false)
                          setProfileData({
                            name: user?.name || '',
                            email: user?.email || '',
                            phone: user?.phone || ''
                          })
                        }}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <FiX className="text-red-400" size={20} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-heading font-semibold mb-2 text-blucia-white/70">
                      <FiUser className="inline mr-2" size={16} />
                      Name
                    </label>
                    {editingProfile ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body"
                      />
                    ) : (
                      <p className="text-white font-body">{user?.name || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-heading font-semibold mb-2 text-blucia-white/70">
                      <FiMail className="inline mr-2" size={16} />
                      Email
                    </label>
                    {editingProfile ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body"
                      />
                    ) : (
                      <p className="text-white font-body">{user?.email || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-heading font-semibold mb-2 text-blucia-white/70">
                      <FiPhone className="inline mr-2" size={16} />
                      Phone
                    </label>
                    {editingProfile ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body"
                      />
                    ) : (
                      <p className="text-white font-body">{user?.phone || 'Not set'}</p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Requests Section */}
          <div className="lg:col-span-2 space-y-6">
            <ScrollAnimation direction="left">
              <div className="glass-effect rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-white">Experience Pipeline</h2>
                    <p className="text-blucia-white/60 text-sm">Track every engagement in one streamlined view.</p>
                  </div>
                  <Link
                    to="/contact"
                    className="px-4 py-2 bg-gradient-purple hover:bg-gradient-purple-light rounded-lg font-body font-semibold text-white transition-all text-sm"
                  >
                    Launch Request
                  </Link>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blucia-accent"></div>
                  </div>
                ) : requests.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-blucia-white/70 font-body mb-4">No service requests yet</p>
                    <Link
                      to="/contact"
                      className="inline-block px-6 py-3 bg-gradient-purple hover:bg-gradient-purple-light rounded-lg font-body font-semibold text-white transition-all"
                    >
                      Submit Your First Request
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <div
                        key={request.id}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <div>
                            <p className="uppercase tracking-[0.3em] text-xs text-blucia-white/50 font-semibold mb-2">
                              {request.serviceType || 'Service Request'}
                            </p>
                            <h3 className="text-2xl font-heading font-bold text-white mb-2">
                              {request.projectDescription.slice(0, 48)}...
                            </h3>
                            <p className="text-blucia-white/60 font-body text-sm">
                              Submitted on {new Date(request.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-blucia-white/80 font-body mb-4">
                          {request.projectDescription}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-blucia-white/60 font-body gap-2">
                          <span>Budget: {request.budget || 'Flexible'}</span>
                          <span>Timeline: {request.timeline || 'To be defined'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="left">
              <div className="glass-effect rounded-2xl p-6 border border-white/10">
                <h2 className="text-2xl font-heading font-bold text-white mb-4">Quick Launch Panel</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickActions.map((action) => (
                    <Link
                      key={action.title}
                      to={action.link}
                      className="p-4 rounded-2xl text-white transition-transform hover:-translate-y-1"
                      style={{ backgroundImage: undefined }}
                    >
                      <div className={`${action.accent} rounded-2xl p-4 h-full`}>
                        <p className="text-sm uppercase tracking-[0.3em] text-white/70 font-semibold mb-2">
                          {action.title}
                        </p>
                        <p className="text-white/90 text-sm">{action.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>

          <ScrollAnimation direction="right">
            <div className="glass-effect rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">Recent Signals</h2>
              <div className="space-y-4">
                {recentActivity.length === 0 ? (
                  <p className="text-sm text-blucia-white/60">No recent activity yet. Submit a project to get started!</p>
                ) : (
                  recentActivity.map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white font-heading font-semibold">{item.serviceType}</p>
                        <span className={`px-3 py-1 rounded-full text-xs border ${statusChipVariants[item.status] || ''}`}>
                          {item.status.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-blucia-white/70 line-clamp-2">{item.projectDescription}</p>
                      <p className="text-xs text-blucia-white/50 mt-3">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


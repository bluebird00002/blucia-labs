import { useEffect, useState } from 'react'
import { FiUsers, FiBriefcase, FiClock, FiCheckCircle, FiTrendingUp, FiRefreshCw, FiMail, FiX } from 'react-icons/fi'
import ScrollAnimation from '../components/ScrollAnimation'
import api from '../utils/api'

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
  'in-progress': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  completed: 'bg-green-500/20 text-green-300 border-green-500/40',
  cancelled: 'bg-red-500/20 text-red-300 border-red-500/40'
}

const statusOptions = ['pending', 'in-progress', 'completed', 'cancelled']

const StatCard = ({ title, value, subtitle, icon: Icon, accent }) => (
  <div className="glass-effect rounded-2xl p-6 flex items-center justify-between border border-white/10 shadow-lg shadow-blucia-light/10">
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-blucia-white/50 font-semibold">{title}</p>
      <h3 className="text-3xl font-heading font-bold text-white mt-3">{value}</h3>
      <p className="text-blucia-white/60 text-sm mt-1">{subtitle}</p>
    </div>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${accent}`}>
      <Icon size={24} className="text-white" />
    </div>
  </div>
)

// Currency conversion utility
const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const rates = {
    USD: 1,
    TZS: 2500,
    EUR: 0.92,
    GBP: 0.79,
    KES: 129,
    ZAR: 18.5,
    NGN: 1550,
    GHS: 15.5,
    UGX: 3750,
    RWF: 1300,
  }
  
  if (!amount || isNaN(amount)) return 0
  if (fromCurrency === toCurrency) return amount
  
  const fromRate = rates[fromCurrency] || 1
  const toRate = rates[toCurrency] || 1
  const amountInUSD = amount / fromRate
  return Math.round(amountInUSD * toRate * 100) / 100
}

const formatCurrency = (amount, currency = 'USD') => {
  const symbols = {
    USD: '$', TZS: 'TSh', EUR: '€', GBP: '£', KES: 'KSh',
    ZAR: 'R', NGN: '₦', GHS: '₵', UGX: 'USh', RWF: 'RF'
  }
  
  if (!amount || isNaN(amount)) return 'N/A'
  const symbol = symbols[currency] || currency
  const formatted = Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
  return `${symbol}${formatted}`
}

const EmailModal = ({ request, onClose, onSend }) => {
  const [subject, setSubject] = useState(`Update on Your Service Request #${request.id}`)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      alert('Please fill in both subject and message')
      return
    }

    setSending(true)
    try {
      await api.post(`/admin/requests/${request.id}/email`, { subject, message })
      alert('Email sent successfully!')
      onSend()
      onClose()
    } catch (error) {
      alert('Failed to send email: ' + (error.response?.data?.message || 'Unknown error'))
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-effect rounded-2xl max-w-2xl w-full p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-heading font-bold text-white">Email Client</h3>
          <button onClick={onClose} className="text-blucia-white/60 hover:text-white transition-colors">
            <FiX size={24} />
          </button>
        </div>

        <div className="mb-4 p-4 bg-white/5 rounded-lg">
          <p className="text-sm text-blucia-white/60">To:</p>
          <p className="text-white font-semibold">{request.userName} ({request.userEmail})</p>
          <p className="text-xs text-blucia-white/50 mt-1">Request #{request.id} - {request.serviceType}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-heading font-semibold mb-2 text-white">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white"
            placeholder="Email subject"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-heading font-semibold mb-2 text-white">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="10"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white resize-none"
            placeholder="Write your message to the client..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-3 glass-effect rounded-lg font-semibold hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending}
            className="px-6 py-3 bg-gradient-to-r from-blucia-medium to-blucia-light rounded-lg font-semibold hover:shadow-lg hover:shadow-blucia-accent/50 transition-all disabled:opacity-50 flex items-center space-x-2"
          >
            <FiMail />
            <span>{sending ? 'Sending...' : 'Send Email'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [requests, setRequests] = useState([])
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingStatus, setSavingStatus] = useState(null)
  const [emailModal, setEmailModal] = useState(null)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const normalizeRequest = (request) => ({
    ...request,
    serviceType: request.service_type || request.serviceType || 'Custom Engagement',
    projectDescription: request.project_description || request.projectDescription || '',
    createdAt: request.created_at || request.createdAt || new Date().toISOString(),
    userName: request.user_name || request.userName || 'Client',
    userEmail: request.user_email || request.userEmail || '',
    budget: request.budget,
    budgetAmount: request.budget_amount || request.budgetAmount,
    budgetCurrency: request.budget_currency || request.budgetCurrency || 'USD',
    timeline: request.timeline,
    status: request.status || 'pending'
  })

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      const [statsResponse, requestsResponse] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/requests')
      ])
      setStats(statsResponse.data.stats)
      setRecent((statsResponse.data.recentRequests || []).map(normalizeRequest))
      setRequests((requestsResponse.data.requests || []).map(normalizeRequest))
    } catch (error) {
      console.error('Failed to load admin data', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      setSavingStatus(requestId)
      await api.patch(`/admin/requests/${requestId}/status`, { status: newStatus })
      setRequests(prev =>
        prev.map((request) =>
          request.id === requestId ? { ...request, status: newStatus } : request
        )
      )
      setRecent(prev =>
        prev.map((request) =>
          request.id === requestId ? { ...request, status: newStatus } : request
        )
      )
      fetchDashboard()
    } catch (error) {
      console.error('Failed to update status', error)
    } finally {
      setSavingStatus(null)
    }
  }

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blucia-accent"></div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="fade">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-blucia-white/50 font-semibold mb-3">Admin Console</p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
                Mission Control Center
              </h1>
              <p className="text-blucia-white/60 mt-3 max-w-2xl">
                Monitor every client experience, triage requests, and orchestrate deliveries from a unified command center.
              </p>
            </div>
            <button
              onClick={fetchDashboard}
              className="self-start md:self-auto px-5 py-3 glass-effect rounded-xl flex items-center space-x-2 text-sm font-semibold hover:bg-white/20 transition-all"
            >
              <FiRefreshCw className={savingStatus ? 'animate-spin' : ''} />
              <span>Refresh Insights</span>
            </button>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <ScrollAnimation direction="up">
            <StatCard
              title="Total Requests"
              value={stats?.requests?.total || 0}
              subtitle="All client submissions"
              icon={FiBriefcase}
              accent="bg-gradient-to-br from-purple-500 to-pink-500"
            />
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.1}>
            <StatCard
              title="Active Pipelines"
              value={stats?.requests?.inProgress || 0}
              subtitle="Currently being built"
              icon={FiClock}
              accent="bg-gradient-to-br from-blue-500 to-purple-500"
            />
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.2}>
            <StatCard
              title="Completed Launches"
              value={stats?.requests?.completed || 0}
              subtitle="Shipped experiences"
              icon={FiCheckCircle}
              accent="bg-gradient-to-br from-green-500 to-emerald-500"
            />
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.3}>
            <StatCard
              title="Client Universe"
              value={stats?.clients || 0}
              subtitle={`${stats?.admins || 0} internal strategists`}
              icon={FiUsers}
              accent="bg-gradient-to-br from-pink-500 to-red-500"
            />
          </ScrollAnimation>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <ScrollAnimation direction="left" className="xl:col-span-2">
            <div className="glass-effect rounded-2xl p-6 border border-white/10 shadow-lg shadow-blucia-light/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-white">Intelligence Queue</h2>
                  <p className="text-blucia-white/60 text-sm">Track, prioritize, and elevate engagements in real time.</p>
                </div>
                <div className="flex items-center space-x-3 text-xs text-blucia-white/60 font-semibold uppercase tracking-[0.3em]">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span>Awaiting</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Active</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Shipped</span>
                  </span>
                </div>
              </div>

              <div className="overflow-auto">
                <table className="min-w-full text-left table-fixed">
                  <thead>
                    <tr className="text-sm text-blucia-white/50 uppercase tracking-widest">
                      <th className="py-3 pr-6 font-semibold w-[20%]">Client</th>
                      <th className="py-3 pr-6 font-semibold w-[25%]">Service</th>
                      <th className="py-3 pr-6 font-semibold w-[15%]">Budget (USD / TZS)</th>
                      <th className="py-3 pr-6 font-semibold w-[12%]">Status</th>
                      <th className="py-3 text-right font-semibold w-[28%]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {requests.map((request) => {
                      const amountUSD = request.budgetAmount ? convertCurrency(request.budgetAmount, request.budgetCurrency, 'USD') : null
                      const amountTZS = request.budgetAmount ? convertCurrency(request.budgetAmount, request.budgetCurrency, 'TZS') : null
                      
                      return (
                        <tr key={request.id} className="text-sm text-blucia-white/80">
                          <td className="py-4 pr-6">
                            <p className="font-heading font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis">{request.userName}</p>
                            <p className="text-xs text-blucia-white/50 whitespace-nowrap overflow-hidden text-ellipsis">{request.userEmail}</p>
                          </td>
                          <td className="py-4 pr-6">
                            <p className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">{request.serviceType}</p>
                            <p className="text-xs text-blucia-white/50 line-clamp-1">{request.project_description}</p>
                          </td>
                          <td className="py-4 pr-6">
                            {amountUSD ? (
                              <div className="whitespace-nowrap">
                                <p className="font-medium text-green-300">{formatCurrency(amountUSD, 'USD')}</p>
                                <p className="text-xs text-blucia-white/50">{formatCurrency(amountTZS, 'TZS')}</p>
                                {request.budgetCurrency !== 'USD' && request.budgetCurrency !== 'TZS' && (
                                  <p className="text-xs text-blucia-white/40">({formatCurrency(request.budgetAmount, request.budgetCurrency)})</p>
                                )}
                              </div>
                            ) : (
                              <span className="text-blucia-white/50 whitespace-nowrap">{request.budget || 'N/A'}</span>
                            )}
                          </td>
                          <td className="py-4 pr-6">
                            <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap ${statusColors[request.status] || ''}`}>
                              {request.status === 'in-progress' ? 'In Progress' : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => setEmailModal(request)}
                                className="p-2 glass-effect rounded-lg hover:bg-white/20 transition-all flex-shrink-0"
                                title="Email client"
                              >
                                <FiMail size={16} />
                              </button>
                              <select
                                value={request.status}
                                onChange={(e) => handleStatusChange(request.id, e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white min-w-[130px] flex-shrink-0"
                                disabled={savingStatus === request.id}
                              >
                                {statusOptions.map((status) => (
                                  <option key={status} value={status} className="text-black">
                                    {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right">
            <div className="glass-effect rounded-2xl p-6 border border-white/10 shadow-lg shadow-blucia-light/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-white">Realtime Signals</h2>
                  <p className="text-blucia-white/60 text-sm">Live client intelligence feed</p>
                </div>
                <FiTrendingUp className="text-blucia-accent" size={28} />
              </div>
              <div className="space-y-4">
                {recent.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-white font-heading font-semibold">{item.userName}</p>
                        <p className="text-xs text-blucia-white/60">{new Date(item.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs border ${statusColors[item.status] || ''}`}>
                        {item.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-blucia-white/80 text-sm font-body mb-3 line-clamp-2">{item.project_description}</p>
                    <div className="flex items-center justify-between text-xs text-blucia-white/50 font-semibold uppercase tracking-[0.2em]">
                      <span>{item.serviceType}</span>
                      <span>
                        {item.budgetAmount ? (
                          <div className="text-right">
                            <div>{formatCurrency(convertCurrency(item.budgetAmount, item.budgetCurrency, 'USD'), 'USD')}</div>
                            <div className="text-[10px]">{formatCurrency(convertCurrency(item.budgetAmount, item.budgetCurrency, 'TZS'), 'TZS')}</div>
                          </div>
                        ) : (
                          item.budget || 'Flexible'
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
      
      {emailModal && (
        <EmailModal
          request={emailModal}
          onClose={() => setEmailModal(null)}
          onSend={() => fetchDashboard()}
        />
      )}
    </div>
  )
}

export default AdminDashboard


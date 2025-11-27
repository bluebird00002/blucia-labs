import { useState } from 'react'
import ScrollAnimation from '../components/ScrollAnimation'
import api from '../utils/api'
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'

const Contact = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    clientType: 'individual', // 'individual' or 'company'
    companyName: '',
    companyLocation: '',
    projectReason: '',
    industry: '',
    projectDescription: '',
    serviceType: '',
    budget: '',
    budgetAmount: '',
    budgetCurrency: 'USD',
    timeline: '',
    hearAboutUs: ''
  })
  
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
    { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' },
    { code: 'RWF', symbol: 'RF', name: 'Rwandan Franc' },
  ]
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.clientType) newErrors.clientType = 'Please specify if you are an individual or company'
    if (formData.clientType === 'company' && !formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }
    if (formData.clientType === 'company' && !formData.companyLocation.trim()) {
      newErrors.companyLocation = 'Company location is required'
    }
    if (!formData.projectReason.trim()) {
      newErrors.projectReason = 'Please tell us the reason for this project'
    }
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required'
    }
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service type'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setLoading(true)
    try {
      await api.post('/requests', formData)
      setSubmitted(true)
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        clientType: 'individual',
        companyName: '',
        companyLocation: '',
        projectReason: '',
        industry: '',
        projectDescription: '',
        serviceType: '',
        budget: '',
        budgetAmount: '',
        budgetCurrency: 'USD',
        timeline: '',
        hearAboutUs: ''
      })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to submit request. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <ScrollAnimation direction="fade">
          <div className="glass-effect rounded-2xl p-12 text-center max-w-md">
            <FiCheckCircle size={64} className="text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-heading font-bold mb-4 text-white">
              Request Submitted!
            </h2>
            <p className="text-blucia-white/80 font-body">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="fade">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-center mb-6">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-blucia-white/80 font-body text-center max-w-3xl mx-auto">
              Ready to start your project? Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <ScrollAnimation direction="right">
                <div className="glass-effect rounded-2xl p-8 h-full">
                  <h2 className="text-2xl font-heading font-bold mb-6 text-white">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiMail size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-white mb-1">Email</h3>
                        <a href="mailto:blucialabs@gmail.com" className="text-blucia-white/70 hover:text-blucia-accent transition-colors font-body">
                          blucialabs@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiPhone size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-white mb-1">Phone</h3>
                        <a href="tel:+255772662181" className="text-blucia-white/70 hover:text-blucia-accent transition-colors font-body">
                          +(255) 7 72662181
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiMapPin size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-white mb-1">Support</h3>
                        <p className="text-blucia-white/70 font-body">
                          24/7 Available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ScrollAnimation direction="left">
                <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-heading font-semibold mb-2 text-white">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body ${
                          errors.name ? 'border-red-500' : 'border-white/20'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-heading font-semibold mb-2 text-white">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body ${
                          errors.email ? 'border-red-500' : 'border-white/20'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-heading font-semibold mb-2 text-white">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body ${
                          errors.phone ? 'border-red-500' : 'border-white/20'
                        }`}
                        placeholder="+(255) 7 72662181"
                      />
                      {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="serviceType" className="block text-sm font-heading font-semibold mb-2 text-white">
                        Service Type *
                      </label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body ${
                          errors.serviceType ? 'border-red-500' : 'border-white/20'
                        }`}
                      >
                        <option value="">Select a service</option>
                        <option value="development">Software Development</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="troubleshooting">Troubleshooting</option>
                        <option value="consulting">Consulting & Strategy</option>
                        <option value="design">UI/UX Design</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.serviceType && <p className="text-red-400 text-sm mt-1">{errors.serviceType}</p>}
                    </div>
                  </div>

                  {/* Client Type Section */}
                  <div className="mb-6">
                    <label className="block text-sm font-heading font-semibold mb-3 text-white">
                      Are you an Individual or Company? *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.clientType === 'individual' 
                          ? 'border-blucia-accent bg-blucia-accent/10' 
                          : 'border-white/20 hover:border-white/40'
                      }`}>
                        <input
                          type="radio"
                          name="clientType"
                          value="individual"
                          checked={formData.clientType === 'individual'}
                          onChange={handleChange}
                          className="mr-3 w-4 h-4 text-blucia-accent"
                        />
                        <div>
                          <span className="text-white font-semibold">Individual</span>
                          <p className="text-xs text-blucia-white/60 mt-1">Personal project or freelance work</p>
                        </div>
                      </label>
                      <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.clientType === 'company' 
                          ? 'border-blucia-accent bg-blucia-accent/10' 
                          : 'border-white/20 hover:border-white/40'
                      }`}>
                        <input
                          type="radio"
                          name="clientType"
                          value="company"
                          checked={formData.clientType === 'company'}
                          onChange={handleChange}
                          className="mr-3 w-4 h-4 text-blucia-accent"
                        />
                        <div>
                          <span className="text-white font-semibold">Company</span>
                          <p className="text-xs text-blucia-white/60 mt-1">Business or organization</p>
                        </div>
                      </label>
                    </div>
                    {errors.clientType && <p className="text-red-400 text-sm mt-1">{errors.clientType}</p>}
                  </div>

                  {/* Company Details (shown only if company is selected) */}
                  {formData.clientType === 'company' && (
                    <div className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10">
                      <h3 className="text-lg font-heading font-semibold text-white mb-4">Company Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <label htmlFor="companyName" className="block text-sm font-heading font-semibold mb-2 text-white">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body ${
                              errors.companyName ? 'border-red-500' : 'border-white/20'
                            }`}
                            placeholder="Your Company Ltd"
                          />
                          {errors.companyName && <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>}
                        </div>

                        <div>
                          <label htmlFor="companyLocation" className="block text-sm font-heading font-semibold mb-2 text-white">
                            Company Location *
                          </label>
                          <input
                            type="text"
                            id="companyLocation"
                            name="companyLocation"
                            value={formData.companyLocation}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body ${
                              errors.companyLocation ? 'border-red-500' : 'border-white/20'
                            }`}
                            placeholder="City, Country"
                          />
                          {errors.companyLocation && <p className="text-red-400 text-sm mt-1">{errors.companyLocation}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="industry" className="block text-sm font-heading font-semibold mb-2 text-white">
                          Industry (Optional)
                        </label>
                        <select
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body"
                        >
                          <option value="">Select industry</option>
                          <option value="technology">Technology</option>
                          <option value="finance">Finance & Banking</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="education">Education</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="real-estate">Real Estate</option>
                          <option value="hospitality">Hospitality & Tourism</option>
                          <option value="retail">Retail</option>
                          <option value="agriculture">Agriculture</option>
                          <option value="logistics">Logistics & Transportation</option>
                          <option value="media">Media & Entertainment</option>
                          <option value="ngo">Non-Profit / NGO</option>
                          <option value="government">Government</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Project Reason */}
                  <div className="mb-6">
                    <label htmlFor="projectReason" className="block text-sm font-heading font-semibold mb-2 text-white">
                      What is the reason for this project? *
                    </label>
                    <select
                      id="projectReason"
                      name="projectReason"
                      value={formData.projectReason}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body ${
                        errors.projectReason ? 'border-red-500' : 'border-white/20'
                      }`}
                    >
                      <option value="">Select a reason</option>
                      <option value="new-product">Launch a new product/service</option>
                      <option value="improve-existing">Improve existing system</option>
                      <option value="fix-issues">Fix technical issues</option>
                      <option value="scale-business">Scale business operations</option>
                      <option value="digital-transformation">Digital transformation</option>
                      <option value="cost-reduction">Reduce operational costs</option>
                      <option value="customer-experience">Enhance customer experience</option>
                      <option value="modernization">System modernization</option>
                      <option value="competitive-advantage">Gain competitive advantage</option>
                      <option value="compliance">Regulatory compliance</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.projectReason && <p className="text-red-400 text-sm mt-1">{errors.projectReason}</p>}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-heading font-semibold mb-2 text-white">
                      Budget Amount
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <select
                          id="budgetCurrency"
                          name="budgetCurrency"
                          value={formData.budgetCurrency}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body"
                        >
                          {currencies.map(currency => (
                            <option key={currency.code} value={currency.code} className="text-black">
                              {currency.code} - {currency.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <input
                          type="number"
                          id="budgetAmount"
                          name="budgetAmount"
                          value={formData.budgetAmount}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body"
                          placeholder={`Enter amount in ${formData.budgetCurrency}`}
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <p className="text-blucia-white/60 text-xs mt-2">Select your currency and enter your budget amount</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-heading font-semibold mb-2 text-white">
                        Budget Range (Optional)
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-10k">Under $10,000</option>
                        <option value="10k-50k">$10,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="over-100k">Over $100,000</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="timeline" className="block text-sm font-heading font-semibold mb-2 text-white">
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-3months">1-3 Months</option>
                        <option value="3-6months">3-6 Months</option>
                        <option value="6months+">6+ Months</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="projectDescription" className="block text-sm font-heading font-semibold mb-2 text-white">
                      Project Description *
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleChange}
                      rows="6"
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body resize-none ${
                        errors.projectDescription ? 'border-red-500' : 'border-white/20'
                      }`}
                      placeholder="Tell us about your project, goals, challenges, and what you hope to achieve..."
                    ></textarea>
                    {errors.projectDescription && (
                      <p className="text-red-400 text-sm mt-1">{errors.projectDescription}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="hearAboutUs" className="block text-sm font-heading font-semibold mb-2 text-white">
                      How did you hear about us?
                    </label>
                    <select
                      id="hearAboutUs"
                      name="hearAboutUs"
                      value={formData.hearAboutUs}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blucia-accent text-white font-body"
                    >
                      <option value="">Select an option</option>
                      <option value="google">Google Search</option>
                      <option value="social-media">Social Media</option>
                      <option value="referral">Referral from friend/colleague</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="twitter">Twitter/X</option>
                      <option value="advertisement">Online Advertisement</option>
                      <option value="blog">Blog or Article</option>
                      <option value="event">Conference or Event</option>
                      <option value="previous-client">Previous Client</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {errors.submit && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                      <p className="text-red-400 text-sm">{errors.submit}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-4 bg-gradient-purple hover:bg-gradient-purple-light rounded-lg font-body font-semibold text-white shadow-2xl shadow-blucia-light/30 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <FiSend />
                      </>
                    )}
                  </button>
                </form>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact


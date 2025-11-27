import { useState } from 'react'
import ScrollAnimation from '../components/ScrollAnimation'
import { FiCode, FiSettings, FiTool, FiCheck, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Services = () => {
  const [hoveredService, setHoveredService] = useState(null)

  const services = [
    {
      id: 1,
      icon: FiCode,
      title: 'Software Development',
      description: 'Transform your ideas into powerful, scalable software solutions.',
      features: [
        'Custom Web Applications',
        'Mobile App Development (iOS & Android)',
        'Full-Stack Development',
        'API Design & Integration',
        'Cloud-Based Solutions',
        'Progressive Web Apps (PWA)'
      ],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 2,
      icon: FiSettings,
      title: 'Software Maintenance',
      description: 'Keep your software running smoothly with proactive maintenance and updates.',
      features: [
        'Regular Updates & Patches',
        'Performance Optimization',
        'Security Audits & Fixes',
        'Database Maintenance',
        'Code Refactoring',
        'Version Control Management'
      ],
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 3,
      icon: FiTool,
      title: 'Troubleshooting & Support',
      description: 'Expert problem-solving to resolve issues quickly and efficiently.',
      features: [
        'Bug Fixing & Debugging',
        'Error Resolution',
        'Performance Troubleshooting',
        'Integration Issues',
        'Emergency Support',
        'Technical Consultation'
      ],
      color: 'from-pink-500 to-red-500',
      bgColor: 'bg-pink-500/10'
    }
  ]

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="fade">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-center mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-blucia-white/80 font-body text-center max-w-3xl mx-auto">
              Comprehensive software solutions designed to elevate your business and drive innovation
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <ScrollAnimation key={service.id} delay={index * 0.2} direction="up">
                  <div
                    className={`glass-effect rounded-2xl p-8 md:p-12 transition-all duration-500 ${
                      hoveredService === service.id ? 'scale-105 shadow-2xl shadow-blucia-light/30' : ''
                    }`}
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      {/* Icon Section */}
                      <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center flex-shrink-0 transform transition-transform ${
                        hoveredService === service.id ? 'rotate-6 scale-110' : ''
                      }`}>
                        <Icon size={40} className="text-white" />
                      </div>

                      {/* Content Section */}
                      <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
                          {service.title}
                        </h2>
                        <p className="text-lg text-blucia-white/80 font-body mb-6">
                          {service.description}
                        </p>

                        {/* Features List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {service.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-3"
                            >
                              <div className={`w-6 h-6 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                <FiCheck size={16} className="text-white" />
                              </div>
                              <span className="text-blucia-white/70 font-body">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <Link
                          to="/contact"
                          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-purple hover:bg-gradient-purple-light rounded-lg font-body font-semibold text-white transition-all transform hover:scale-105"
                        >
                          <span>Get Started</span>
                              <FiArrowRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services Info */}
      <section className="py-20 bg-blucia-dark/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="fade">
            <div className="max-w-4xl mx-auto glass-effect rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Need Something <span className="text-gradient">Custom</span>?
              </h2>
              <p className="text-lg text-blucia-white/80 font-body mb-8">
                We understand that every business is unique. If you don't see exactly what you're looking for, 
                we're happy to discuss custom solutions tailored to your specific needs.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-gradient-purple hover:bg-gradient-purple-light rounded-lg font-body font-semibold text-white shadow-2xl shadow-blucia-light/30 transition-all transform hover:scale-105"
              >
                Contact Us Today
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}

export default Services


import ScrollAnimation from '../components/ScrollAnimation'
import { FiTarget, FiEye, FiZap, FiShield } from 'react-icons/fi'

const About = () => {
  const values = [
    {
      icon: FiZap,
      title: 'Innovation',
      description: 'We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.'
    },
    {
      icon: FiShield,
      title: 'Reliability',
      description: 'Trust is the foundation of our relationships. We deliver on our promises, every time.'
    },
    {
      icon: FiTarget,
      title: 'Excellence',
      description: 'We strive for perfection in every line of code, every design, and every interaction.'
    },
    {
      icon: FiEye,
      title: 'Vision',
      description: 'We see beyond the present, anticipating future needs and trends in technology.'
    }
  ]

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="fade">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-center mb-6">
              About <span className="text-gradient">BluCia Labs</span>
            </h1>
            <p className="text-xl text-blucia-white/80 font-body text-center max-w-3xl mx-auto">
              Pioneering the future of software development with creativity, intelligence, and innovation
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-blucia-dark/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation direction="right">
              <div className="glass-effect rounded-2xl p-8 md:p-12 mb-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-purple rounded-xl flex items-center justify-center">
                    <FiTarget size={32} className="text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                    Our Mission
                  </h2>
                </div>
                <p className="text-lg text-blucia-white/80 font-body leading-relaxed">
                  At BluCia Labs, our mission is to empower businesses and individuals by creating 
                  software solutions that transcend conventional limits. We believe in the power of 
                  creativity combined with advanced intelligence to solve complex problems and unlock 
                  new possibilities. Every project we undertake is an opportunity to push boundaries, 
                  challenge the status quo, and deliver solutions that make a meaningful impact.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="left" delay={0.2}>
              <div className="glass-effect rounded-2xl p-8 md:p-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-purple rounded-xl flex items-center justify-center">
                    <FiEye size={32} className="text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                    Our Vision
                  </h2>
                </div>
                <p className="text-lg text-blucia-white/80 font-body leading-relaxed">
                  We envision a future where technology seamlessly integrates with human creativity 
                  to solve the world's most pressing challenges. BluCia Labs aims to be at the 
                  forefront of this transformation, pioneering AI-powered solutions, sustainable 
                  software practices, and innovative approaches that benefit society as a whole. 
                  Our vision extends beyond code—we're building a legacy of innovation that 
                  inspires the next generation of developers and entrepreneurs.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="fade">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
              Our <span className="text-gradient">Core Values</span>
            </h2>
            <p className="text-center text-blucia-white/70 font-body text-lg mb-12 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <ScrollAnimation key={value.title} delay={index * 0.15} direction="up">
                  <div className="glass-effect rounded-2xl p-8 card-hover">
                    <div className="w-14 h-14 bg-gradient-purple rounded-xl flex items-center justify-center mb-6">
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-heading font-semibold mb-4 text-white">
                      {value.title}
                    </h3>
                    <p className="text-blucia-white/70 font-body">
                      {value.description}
                    </p>
                  </div>
                </ScrollAnimation>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-blucia-dark/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="fade">
            <div className="max-w-4xl mx-auto glass-effect rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-8">
                Why Choose <span className="text-gradient">BluCia Labs</span>?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blucia-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-blucia-white/80 font-body">
                    <strong className="text-white">Cutting-Edge Technology:</strong> We stay ahead of the curve, 
                    utilizing the latest frameworks, tools, and methodologies to deliver superior results.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blucia-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-blucia-white/80 font-body">
                    <strong className="text-white">Client-Centric Approach:</strong> Your success is our success. 
                    We work closely with you to understand your needs and deliver solutions that exceed expectations.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blucia-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-blucia-white/80 font-body">
                    <strong className="text-white">Scalable Solutions:</strong> We build software that grows with 
                    your business, ensuring long-term value and adaptability.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blucia-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-blucia-white/80 font-body">
                    <strong className="text-white">24/7 Support:</strong> Our dedicated team is always available 
                    to assist you, ensuring your software runs smoothly around the clock.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}

export default About


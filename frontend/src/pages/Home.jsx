import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollAnimation from "../components/ScrollAnimation";
import AvatarGuide from "../components/AvatarGuide";
import { FiCode, FiSettings, FiTool, FiArrowRight } from "react-icons/fi";

const Home = () => {
  const services = [
    {
      icon: FiCode,
      title: "Software Development",
      description:
        "Custom software solutions tailored to your business needs. From web apps to mobile applications.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FiSettings,
      title: "Maintenance",
      description:
        "Keep your software running smoothly with our comprehensive maintenance and support services.",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: FiTool,
      title: "Troubleshooting",
      description:
        "Expert debugging and problem-solving to resolve issues quickly and efficiently.",
      color: "from-pink-500 to-red-500",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 md:pt-0">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blucia-light/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blucia-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto space-y-6 md:space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-balance leading-[1.1] md:leading-[1.05]"
            >
              <span className="text-gradient">Beyond Limits</span>
              <br />
              <span className="text-white">Ultimate Creativity</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-blucia-white/80 font-body mb-8 leading-relaxed"
            >
              Welcome to{" "}
              <span className="text-blucia-accent font-semibold">
                BluCia Labs
              </span>{" "}
              - Where innovation meets intelligence. We transform ideas into
              cutting-edge software solutions that push the boundaries of what's
              possible.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 justify-center text-left text-[0.8rem]"
            >
              {[
                "AI-Native Experiences",
                "Intelligent Automation",
                "Full-stack Engineering",
                "24/7 Elite Support",
              ].map((badge, index) => (
                <div
                  key={badge}
                  className="glass-effect border-white/10 rounded-xl px-4 py-3 text-blucia-white/80 font-body font-medium shadow-lg shadow-blucia-light/20"
                >
                  {badge}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/services"
                className="px-8 py-4 bg-gradient-purple hover:bg-gradient-purple-light rounded-lg font-body font-semibold text-white shadow-2xl shadow-blucia-light/30 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Explore Services</span>
                <FiArrowRight />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 glass-effect hover:bg-white/20 rounded-lg font-body font-semibold text-white transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-blucia-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blucia-accent rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-blucia-dark/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="fade">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-center text-blucia-white/70 font-body text-lg mb-12 max-w-2xl mx-auto">
              Comprehensive software solutions designed to elevate your business
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <ScrollAnimation
                  key={service.title}
                  delay={index * 0.2}
                  direction="up"
                >
                  <div className="glass-effect rounded-2xl p-8 card-hover group">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform`}
                    >
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-heading font-semibold mb-4 text-white">
                      {service.title}
                    </h3>
                    <p className="text-blucia-white/70 font-body mb-6">
                      {service.description}
                    </p>
                    <Link
                      to="/services"
                      className="inline-flex items-center space-x-2 text-blucia-accent hover:text-blucia-light font-body font-medium transition-colors"
                    >
                      <span>Learn More</span>
                      <FiArrowRight />
                    </Link>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="fade">
            <div className="glass-effect rounded-3xl p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Ready to <span className="text-gradient">Transform</span> Your
                Business?
              </h2>
              <p className="text-xl text-blucia-white/80 font-body mb-8">
                Let's discuss how BluCia Labs can help you achieve your goals
                with innovative software solutions.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-gradient-purple hover:bg-gradient-purple-light rounded-lg font-body font-semibold text-white shadow-2xl shadow-blucia-light/30 transition-all transform hover:scale-105"
              >
                Start Your Project
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <AvatarGuide />
    </div>
  );
};

export default Home;

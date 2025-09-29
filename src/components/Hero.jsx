import React from 'react'
import {HERO_CONTENT} from '../Constant'
import profileImg from "/portfolioImg2.jpg"
import { motion } from "framer-motion"

const container = (delay) => ({
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.6, delay: delay }
  },
})

function Hero() {
  return (
    <div className='relative border-b border-neutral-900 pb-20 overflow-hidden'>
      
      {/* Beautiful Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-slate-500/5 rounded-full blur-3xl"></div>
        
        {/* Moving Stars Animation */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div 
                className="w-1 h-1 bg-white/30 rounded-full"
                style={{
                  animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Shooting Stars */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={`shooting-${i}`}
              className="absolute w-px h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
              style={{
                left: `${Math.random() * 50}%`,
                top: `${Math.random() * 50}%`,
                width: '100px',
                height: '1px',
                transform: 'rotate(-45deg)',
                animation: `shoot ${4 + Math.random() * 2}s ease-out infinite`,
                animationDelay: `${i * 2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-sm"></div>
            </div>
          ))}
        </div>
        
        {/* Minimal Grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      <div className='relative z-10 container mx-auto px-8 py-10'>
        <div className='flex flex-col items-center text-center max-w-4xl mx-auto'>
          
          {/* Welcome Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='mb-8 px-6 py-2 bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-full'
          >
            <span className='text-sm text-neutral-300'>
              👋 Welcome to my portfolio
            </span>
          </motion.div>

          {/* Profile Image with subtle glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className='mb-8 relative'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-pink-300/20 via-slate-500/20 to-purple-500/20 rounded-full blur-xl'></div>
            <div className='relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-2 border-neutral-700 shadow-2xl bg-gradient-to-b from-zinc-600 to-zinc-800'>
              <img 
                className='w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-500 mix-blend-overlay' 
                src={profileImg} 
                alt="Saif ur Rehman" 
              />
            </div>
          </motion.div>

          {/* Name with clean styling */}
          <motion.h1  
            variants={container(0.4)}
            initial="hidden"
            animate="visible"
            className='text-4xl lg:text-6xl font-extralight tracking-tight mb-2'
          >
            Saif ur Rehman
          </motion.h1>

          {/* Enhanced Title */}
          <motion.div
            variants={container(0.6)}
            initial="hidden"
            animate="visible"
            className='mb-6 relative'
          >
            <span className='bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 text-xl lg:text-2xl bg-clip-text text-transparent font-medium relative'>
              Front End Developer
            </span>
            <div className='flex items-center justify-center mt-3 space-x-2'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-ping'></div>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <span className='text-sm text-neutral-400 ml-2'>Available for work</span>
            </div>
          </motion.div>

          {/* Clean Description */}
          <motion.p
            variants={container(0.8)}
            initial="hidden"
            animate="visible"
            className='text-neutral-300 leading-relaxed font-light max-w-3xl mb-10 text-base text-center lg:text-lg'
          >
            {HERO_CONTENT}
          </motion.p>

          {/* Enhanced Buttons */}
          <motion.div
            variants={container(1)}
            initial="hidden"
            animate="visible"
            className='flex flex-col sm:flex-row gap-4 mb-12'
          >
            <button className='group px-8 py-4 bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 relative overflow-hidden'>
              <span className='relative z-10'>View My Work</span>
              <div className='absolute inset-0 bg-gradient-to-r from-purple-500 via-slate-500 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </button>
            <button className='group px-8 py-4 border border-neutral-600 text-neutral-300 font-medium rounded-lg hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white transition-all duration-300 transform hover:scale-105 backdrop-blur-sm'>
              <span className='flex items-center gap-2'>
                Contact Me
                <span className='w-2 h-2 bg-current rounded-full group-hover:animate-ping'></span>
              </span>
            </button>
          </motion.div>

          {/* Enhanced Skills */}
          <motion.div
            variants={container(1.2)}
            initial="hidden"
            animate="visible"
            className='space-y-4'
          >
            <h3 className='text-neutral-400 text-sm uppercase tracking-wider'>Tech Stack</h3>
            <div className='flex flex-wrap justify-center gap-3'>
              {['React', 'JavaScript', 'HTML/CSS', 'Tailwind', 'Node.js', 'Git'].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className='px-4 py-2 bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-full text-sm text-neutral-300 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white transition-all duration-300 cursor-pointer'
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className='mt-16 flex flex-col items-center space-y-2'
          >
            <span className='text-neutral-500 text-xs uppercase tracking-wider'>Explore More</span>
            <div className='w-px h-8 bg-gradient-to-b from-neutral-500 to-transparent animate-pulse'></div>
            <div className='w-2 h-2 border border-neutral-500 rounded-full animate-bounce'></div>
          </motion.div>

        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}

export default Hero
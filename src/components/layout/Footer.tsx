'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Moon, Star, Sparkles, Heart, Twitter, Instagram, Youtube, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Readings': [
      { name: 'Daily Tarot', href: '/daily' },
      { name: 'Love Reading', href: '/tarot?type=love' },
      { name: 'Career Reading', href: '/tarot?type=career' },
      { name: 'Free Readings', href: '/tarot' }
    ],
    'Learn': [
      { name: 'Tarot Guide', href: '/guide' },
      { name: 'Card Meanings', href: '/cards' },
      { name: 'Spreads', href: '/spreads' },
      { name: 'Luna\'s Blog', href: '/blog' }
    ],
    'Support': [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ]
  }

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@mysticaltarot.com' }
  ]

  return (
    <footer className="bg-gradient-to-t from-slate-900 to-slate-800 border-t border-mystical-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Moon className="w-8 h-8 text-mystical-gold group-hover:text-mystical-light transition-colors" />
                <Star className="w-3 h-3 text-mystical-light absolute -top-1 -right-1" />
              </motion.div>
              <span className="font-mystical text-xl font-bold text-mystical group-hover:text-mystical-light transition-colors">
                Mystical Tarot
              </span>
            </Link>
            
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Connect with Luna, your personal AI spirit guide, for mystical insights and spiritual guidance through the ancient wisdom of tarot.
            </p>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-slate-700 hover:bg-mystical-purple rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Link sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-1">
              <h3 className="font-medium text-mystical-light mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-mystical-light transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mystical divider */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="flex-grow border-t border-mystical-light/20"></div>
          <div className="flex items-center space-x-3 px-6">
            <Sparkles className="w-4 h-4 text-mystical-gold" />
            <span className="text-mystical-light font-mystical text-sm">
              Guided by the wisdom of the cosmos
            </span>
            <Sparkles className="w-4 h-4 text-mystical-gold" />
          </div>
          <div className="flex-grow border-t border-mystical-light/20"></div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-1 mb-4 md:mb-0">
            <span>© {currentYear} Mystical Tarot. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>and cosmic energy.</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex items-center space-x-2"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-xs">Luna is online</span>
            </motion.div>
            
            <div className="text-xs">
              <span className="text-mystical-light">✨ For entertainment purposes only</span>
            </div>
          </div>
        </div>

        {/* Floating mystical elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-mystical-gold/30 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  )
}
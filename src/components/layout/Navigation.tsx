'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'
import { Moon, Menu, X, Sparkles, Star, User, LogIn, LogOut, Crown } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const { user, userProfile, signIn, signOut, isSubscribed } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Tarot Reading', href: '/tarot' },
    { name: 'Daily Insights', href: '/daily' },
    { name: 'Pricing', href: '/pricing' }
  ]

  const isActive = (href: string) => pathname === href

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-mystical-light/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Moon className="w-8 h-8 text-mystical-gold group-hover:text-mystical-light transition-colors" />
              <Star className="w-3 h-3 text-mystical-light absolute -top-1 -right-1" />
            </motion.div>
            <span className="font-mystical text-xl font-bold text-mystical group-hover:text-mystical-light transition-colors">
              Mystical Tarot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-mystical-gold'
                    : 'text-gray-300 hover:text-mystical-light'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-mystical-light to-mystical-gold"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* User Menu & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Subscription badge */}
                {isSubscribed && (
                  <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-mystical-gold to-mystical-light rounded-full">
                    <Crown className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white">Premium</span>
                  </div>
                )}

                {/* User profile */}
                <div className="flex items-center space-x-2 text-gray-300">
                  <User className="w-5 h-5" />
                  <span className="text-sm">{userProfile?.name || 'Seeker'}</span>
                </div>

                {/* Sign out */}
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 text-gray-400 hover:text-mystical-light transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => signIn()}
                  className="flex items-center space-x-2 text-gray-300 hover:text-mystical-light transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm">Sign In</span>
                </button>
                <Link href="/pricing" className="btn-mystical px-4 py-2 text-sm">
                  Get Premium
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-mystical-light transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-slate-800/95 backdrop-blur-md border-t border-mystical-light/20"
          >
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'text-mystical-gold bg-mystical-gold/10'
                      : 'text-gray-300 hover:text-mystical-light hover:bg-mystical-light/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-700 pt-3 mt-3">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 px-3 py-2 text-gray-300">
                      <User className="w-5 h-5" />
                      <span>{userProfile?.name || 'Seeker'}</span>
                      {isSubscribed && <Crown className="w-4 h-4 text-mystical-gold" />}
                    </div>
                    <button
                      onClick={() => {
                        signOut()
                        setIsOpen(false)
                      }}
                      className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-mystical-light w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        signIn()
                        setIsOpen(false)
                      }}
                      className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-mystical-light w-full text-left"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                    </button>
                    <Link 
                      href="/pricing" 
                      onClick={() => setIsOpen(false)}
                      className="block btn-mystical px-3 py-2 text-center text-sm"
                    >
                      Get Premium
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
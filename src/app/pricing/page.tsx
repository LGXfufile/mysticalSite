'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/components/providers/AuthProvider'
import { 
  Check, Crown, Sparkles, Moon, Star, Zap, Heart, 
  Infinity as InfinityIcon, Shield, Users, Headphones 
} from 'lucide-react'
import { toast } from 'react-hot-toast'

export const dynamic = 'force-dynamic'

interface PricingPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  description: string
  features: string[]
  icon: React.ElementType
  popular?: boolean
  color: string
  stripePriceId?: string
}

export default function PricingPage() {
  const { user, isSubscribed, signIn } = useAuth()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Cosmic Seeker',
      price: 0,
      interval: 'month',
      description: 'Perfect for exploring the mystical world of tarot',
      features: [
        '3 daily tarot readings',
        'Basic Luna AI guidance',
        'Single & 3-card spreads',
        'Standard card interpretations',
        'Community access'
      ],
      icon: Moon,
      color: 'from-slate-600 to-slate-700'
    },
    {
      id: 'premium-monthly',
      name: 'Mystical Guide',
      price: billingCycle === 'monthly' ? 9.99 : 8.33,
      interval: 'month',
      description: 'Unlimited readings with advanced AI insights',
      features: [
        'Unlimited tarot readings',
        'Advanced Luna AI personality',
        'All spread types & custom spreads',
        'Detailed interpretations',
        'Reading history & favorites',
        'Priority support',
        'Ad-free experience'
      ],
      icon: Sparkles,
      popular: true,
      color: 'from-mystical-purple to-mystical-light',
      stripePriceId: 'price_premium_monthly'
    },
    {
      id: 'premium-yearly',
      name: 'Cosmic Master',
      price: billingCycle === 'yearly' ? 99.99 : 149.99,
      interval: 'year',
      description: 'Full mystical experience with exclusive features',
      features: [
        'Everything in Mystical Guide',
        'Exclusive Luna conversations',
        'Personal spiritual journal',
        'Advanced card combinations',
        'Moon phase readings',
        'Astrology integration',
        'Early access to new features',
        'VIP community access'
      ],
      icon: Crown,
      color: 'from-mystical-gold to-yellow-500',
      stripePriceId: 'price_premium_yearly'
    }
  ]

  const handleSubscribe = async (plan: PricingPlan) => {
    if (!user) {
      toast.error('Please sign in to subscribe')
      await signIn()
      return
    }

    if (plan.id === 'free') {
      toast.success('You\'re already on the free plan!')
      return
    }

    // Mock subscription flow - replace with Stripe integration
    toast.success(`🎉 Welcome to ${plan.name}! Your spiritual journey begins now.`)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Crown className="w-16 h-16 text-mystical-gold" />
              <Star className="w-4 h-4 text-mystical-light absolute -top-1 -right-1" />
            </div>
          </div>

          <h1 className="font-mystical text-5xl md:text-6xl font-bold mb-6 text-mystical">
            Choose Your Path
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Unlock deeper spiritual insights with Luna's advanced guidance. 
            From daily seekers to cosmic masters, find the perfect plan for your mystical journey.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center mb-12"
        >
          <div className="bg-slate-800/50 p-1 rounded-xl border border-mystical-light/20">
            <div className="flex items-center">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-mystical-purple text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all relative ${
                  billingCycle === 'yearly'
                    ? 'bg-mystical-purple text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-mystical-gold text-xs px-1.5 py-0.5 rounded-full text-black font-bold">
                  -17%
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const isCurrentPlan = plan.id === 'free' && !isSubscribed

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                className={`relative rounded-2xl border-2 p-8 ${
                  plan.popular
                    ? 'border-mystical-gold bg-gradient-to-br from-mystical-gold/5 to-mystical-light/5'
                    : 'border-mystical-light/20 bg-slate-800/30'
                } backdrop-blur-sm ${
                  plan.popular ? 'transform scale-105' : ''
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-mystical-gold to-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold">
                      ⭐ MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="flex items-center justify-center mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Plan details */}
                <div className="text-center mb-6">
                  <h3 className="font-mystical text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-mystical-light">
                      ${plan.price}
                    </span>
                    <span className="text-gray-400 ml-1">
                      /{plan.interval}
                    </span>
                  </div>
                  
                  {billingCycle === 'yearly' && plan.price > 0 && (
                    <p className="text-xs text-mystical-gold mt-1">
                      Save $50 per year
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-mystical-gold flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={isCurrentPlan}
                  className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
                    isCurrentPlan
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-gradient-to-r from-mystical-gold to-yellow-500 hover:from-yellow-500 hover:to-mystical-gold text-black font-bold'
                      : 'bg-mystical-purple hover:bg-mystical-light text-white'
                  } transform hover:scale-105`}
                >
                  {isCurrentPlan ? 'Current Plan' : `Choose ${plan.name}`}
                </button>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Features comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-mystical-light/20"
        >
          <h2 className="font-mystical text-3xl font-bold text-center mb-8 text-mystical">
            Why Choose Premium?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: InfinityIcon,
                title: 'Unlimited Readings',
                description: 'Connect with Luna anytime, no daily limits'
              },
              {
                icon: Star,
                title: 'Advanced AI',
                description: 'Deeper insights with Luna\'s premium personality'
              },
              {
                icon: Shield,
                title: 'Priority Support',
                description: 'Get help faster with dedicated premium support'
              },
              {
                icon: Heart,
                title: 'Exclusive Content',
                description: 'Access special spreads and premium features'
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-mystical-purple to-mystical-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-medium text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-sm mb-4">
            ✨ All plans include Luna's mystical guidance and spiritual support ✨
          </p>
          <p className="text-xs text-gray-500">
            * For entertainment purposes only. Not a substitute for professional advice.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
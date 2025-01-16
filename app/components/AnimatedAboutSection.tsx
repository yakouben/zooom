'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

type AnimatedAboutSectionProps = {
  translations: {
    title: string
    description: string
    learnMore: string
    altText: string
  }
}

export default function AnimatedAboutSection({ translations }: AnimatedAboutSectionProps) {
  return (
    <section className="bg-amber-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{translations.title}</h2>
            <p className="text-lg text-gray-700 mb-6">
              {translations.description}
            </p>
            <Button asChild variant="outline">
              <Link href="/about">{translations.learnMore}</Link>
            </Button>
          </motion.div>
          <motion.div 
            className="mt-10 lg:mt-0 lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              alt={translations.altText}
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}


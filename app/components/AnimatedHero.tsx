'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

type AnimatedHeroProps = {
  translations: {
    title: string
    description: string
    shopNow: string
    altText: string
  }
}

export default function AnimatedHero({ translations }: AnimatedHeroProps) {
  return (
    <section className="relative h-[600px]">
      <Image
        src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
        alt={translations.altText}
        fill
        style={{objectFit: 'cover'}}
        className="brightness-50"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-l from-amber-200 to-amber-500">
            {translations.title}
          </span>
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8 text-center max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {translations.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button asChild size="lg">
            <Link href="/shop">{translations.shopNow}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}


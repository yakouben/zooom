'use client'

import { motion } from 'framer-motion'

type AnimatedContactSectionProps = {
  translations: {
    title: string
    visitUs: {
      title: string
      address1: string
      address2: string
    }
    callUs: {
      title: string
      phone: string
      fax: string
    }
    emailUs: {
      title: string
      email1: string
      email2: string
    }
  }
}

export default function AnimatedContactSection({ translations }: AnimatedContactSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{translations.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-2">{translations.visitUs.title}</h3>
          <p>{translations.visitUs.address1}</p>
          <p>{translations.visitUs.address2}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-2">{translations.callUs.title}</h3>
          <p>{translations.callUs.phone}</p>
          <p>{translations.callUs.fax}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-2">{translations.emailUs.title}</h3>
          <p>{translations.emailUs.email1}</p>
          <p>{translations.emailUs.email2}</p>
        </motion.div>
      </div>
    </section>
  )
}


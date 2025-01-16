'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Navigation({ translations = [] }: { translations?: any[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const t = (key: string) => translations?.find(t => t.key === key)?.arabic || key

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-amber-600">{t('Azzou Spices')}</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-amber-500 text-sm font-medium">
              {t('Home')}
            </Link>
            <Link href="/shop" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
              {t('Shop')}
            </Link>
            <Link href="/about" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
              {t('About Us')}
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
              {t('Contact Us')}
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative">
              <Input
                type="text"
                placeholder={t('Search products...')}
                className="w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon" className="mr-4">
              <ShoppingCart className="h-6 w-6" />
            </Button>
          </div>
          <div className="-ml-2 flex items-center sm:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="sr-only">{t('Open main menu')}</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="bg-amber-50 border-amber-500 text-amber-700 block pl-3 pr-4 py-2 border-r-4 text-base font-medium">
              {t('Home')}
            </Link>
            <Link href="/shop" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-r-4 text-base font-medium">
              {t('Shop')}
            </Link>
            <Link href="/about" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-r-4 text-base font-medium">
              {t('About Us')}
            </Link>
            <Link href="/contact" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-r-4 text-base font-medium">
              {t('Contact Us')}
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder={t('Search products...')}
                  className="w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="mt-3 flex justify-center">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}


import Link from 'next/link'
import { Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer({ translations = [] }: { translations?: any[] }) {
  const t = (key: string) => translations?.find(t => t.key === key)?.arabic || key
  return (
    <footer className="bg-amber-800 text-amber-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <span className="text-2xl font-bold">{t('Azzou Spices')}</span>
            <p className="text-sm">
              {t('Bringing the finest spices from around the world to your kitchen since 1985.')}
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-amber-200 hover:text-white">
                <span className="sr-only">{t('Facebook')}</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-amber-200 hover:text-white">
                <span className="sr-only">{t('Instagram')}</span>
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-amber-200 hover:text-white">
                <span className="sr-only">{t('Twitter')}</span>
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-amber-200 tracking-wider uppercase">{t('Shop')}</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-amber-100 hover:text-white">
                      {t('All Products')}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-amber-100 hover:text-white">
                      {t('Featured Spices')}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-amber-100 hover:text-white">
                      {t('Spice Blends')}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-amber-100 hover:text-white">
                      {t('Gift Sets')}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-amber-200 tracking-wider uppercase">{t('Support')}</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-amber-100 hover:text-white">
                      {t('Shipping')}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-amber-100 hover:text-white">
                      {t('Returns')}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-amber-100 hover:text-white">
                      {t('FAQ')}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-amber-100 hover:text-white">
                      {t('Contact Us')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-amber-200 tracking-wider uppercase">{t('Company')}</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-amber-100 hover:text-white">
                      {t('About Us')}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-amber-100 hover:text-white">
                      {t('Blog')}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-amber-100 hover:text-white">
                      {t('Careers')}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-amber-100 hover:text-white">
                      {t('Press')}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-amber-200 tracking-wider uppercase">{t('Legal')}</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-amber-100 hover:text-white">
                      {t('Privacy Policy')}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-amber-100 hover:text-white">
                      {t('Terms of Service')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-amber-700 pt-8">
          <p className="text-base text-amber-300 xl:text-center">
            {t('&copy; 2023 Azzou Spices. All rights reserved.')}
          </p>
        </div>
      </div>
    </footer>
  )
}


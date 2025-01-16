import './globals.css'
import { Cairo } from 'next/font/google'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import { createClient } from '@supabase/supabase-js'

const cairo = Cairo({ subsets: ['arabic'] })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Fallback translations
const fallbackTranslations = [
  { key: 'Azzou Spices', arabic: 'توابل عزو' },
  { key: 'Home', arabic: 'الرئيسية' },
  { key: 'Shop', arabic: 'المتجر' },
  { key: 'About Us', arabic: 'من نحن' },
  { key: 'Contact Us', arabic: 'اتصل بنا' },
  { key: 'Search products...', arabic: 'البحث عن المنتجات...' },
  // Add more fallback translations as needed
]

export const metadata = {
  title: 'توابل عزو',
  description: 'اكتشف أفضل التوابل من جميع أنحاء العالم',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let translations = fallbackTranslations

  try {
    const { data, error } = await supabase.from('translations').select('*')
    if (error) {
      console.error('Error fetching translations:', error)
      if (error.code === '42P01') {
        console.warn('Translations table does not exist. Using fallback translations.')
      } else {
        throw error
      }
    } else if (data && data.length > 0) {
      translations = data
    }
  } catch (error) {
    console.error('Unexpected error:', error)
  }

  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} min-h-screen flex flex-col`}>
        <Navigation translations={translations} />
        <PageTransition>
          <main className="flex-grow">{children}</main>
        </PageTransition>
        <Footer translations={translations} />
      </body>
    </html>
  )
}


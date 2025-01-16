import { createClient } from '@supabase/supabase-js'
import FeaturedProducts from './components/FeaturedProducts'
import AnimatedHero from './components/AnimatedHero'
import AnimatedAboutSection from './components/AnimatedAboutSection'
import AnimatedContactSection from './components/AnimatedContactSection'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Home() {
  const { data: translations } = await supabase.from('translations').select('*')

  const t = (key: string) => translations?.find(t => t.key === key)?.arabic || key

  const heroTranslations = {
    title: t('Discover the World of Spices'),
    description: t('Explore our premium collection of authentic spices from around the globe'),
    shopNow: t('Shop Now'),
    altText: t('Assorted spices')
  }

  const aboutTranslations = {
    title: t('Our Story'),
    description: t('For over three decades, Azzou Spices has been bringing the authentic flavors of the world to your kitchen. Our journey began in 1985 with a passion for quality spices and a commitment to culinary excellence.'),
    learnMore: t('Learn More'),
    altText: t('Spice market')
  }

  const contactTranslations = {
    title: t('Get in Touch'),
    visitUs: {
      title: t('Visit Us'),
      address1: t('123 Spice Street'),
      address2: t('Flavortown, SP 12345')
    },
    callUs: {
      title: t('Call Us'),
      phone: t('Phone: (555) 123-4567'),
      fax: t('Fax: (555) 987-6543')
    },
    emailUs: {
      title: t('Email Us'),
      email1: t('info@azzouspices.com'),
      email2: t('support@azzouspices.com')
    }
  }

  return (
    <div className="space-y-16">
      <AnimatedHero translations={heroTranslations} />
      
      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('Featured Products')}</h2>
        <FeaturedProducts translations={translations || []} />
      </section>

      <AnimatedAboutSection translations={aboutTranslations} />
      <AnimatedContactSection translations={contactTranslations} />
    </div>
  )
}


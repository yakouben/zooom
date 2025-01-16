'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

type Product = {
  id: number
  name: string
  price: number
  image_url: string
}

export default function FeaturedProducts({ translations = [] }: { translations?: any[] }) {
  const [products, setProducts] = useState<Product[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  const t = (key: string) => translations?.find(t => t.key === key)?.arabic || key

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(8)

      if (error) {
        console.error('Error fetching products:', error)
      } else {
        setProducts(data || [])
      }
    }

    fetchProducts()
  }, [])

  const scroll = (direction: 'right' | 'left') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === 'right' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative">
      <motion.div 
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide space-x-4 pb-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {products.map((product) => (
          <Card key={product.id} className="flex-shrink-0 w-64">
            <CardHeader>
              <Image
                src={product.image_url || "https://foodal.com/wp-content/uploads/2015/02/Make-Your-Own-Curry-Powder.jpg"}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{product.name}</CardTitle>
              <p className="text-2xl font-bold text-amber-600">{t('$')} {product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/products/${product.id}`}>{t('View Product')}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </motion.div>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}


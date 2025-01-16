'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import AddToCartButton from '../../components/AddToCartButton'
import { motion } from 'framer-motion'
import { Star, Truck, Package, RefreshCw } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Product = {
  id: number
  name: string
  description: string
  price: number
  category: string
  image_url: string
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) {
        console.error('Error fetching product:', error)
      } else {
        setProduct(data)
      }
      setLoading(false)
    }

    fetchProduct()
  }, [params.id])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading product...</div>
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Product not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <motion.div 
          className="flex flex-col-reverse"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-w-1 aspect-h-1 w-full">
            <Image
              src={product.image_url || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-center object-cover sm:rounded-lg"
            />
          </div>
        </motion.div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <motion.h1 
            className="text-3xl font-extrabold tracking-tight text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {product.name}
          </motion.h1>

          <div className="mt-3">
            <motion.h2 
              className="sr-only"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Product information
            </motion.h2>
            <motion.p 
              className="text-3xl text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              ${product.price.toFixed(2)}
            </motion.p>
          </div>

          {/* Reviews */}
          <motion.div 
            className="mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={`${
                      rating < 4 ? 'text-yellow-400' : 'text-gray-300'
                    } h-5 w-5 flex-shrink-0`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">4 out of 5 stars</p>
              <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                117 reviews
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="sr-only">Description</h3>
            <div
              className="text-base text-gray-700 space-y-6"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </motion.div>

          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="mt-10">
              <AddToCartButton product={product} />
            </div>
          </motion.div>

          {/* Product highlights */}
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
            <div className="mt-4">
              <ul className="pl-4 list-disc space-y-2">
                <li className="text-sm text-gray-600">Hand-picked and carefully selected</li>
                <li className="text-sm text-gray-600">Rich in flavor and aroma</li>
                <li className="text-sm text-gray-600">Perfect for various culinary applications</li>
                <li className="text-sm text-gray-600">Sourced from the finest spice regions</li>
              </ul>
            </div>
          </motion.div>

          {/* Shipping information */}
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <h3 className="text-sm font-medium text-gray-900">Shipping Information</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-400 mr-2" />
                <p className="text-sm text-gray-600">Free shipping on orders over $50</p>
              </div>
              <div className="flex items-center">
                <Package className="h-5 w-5 text-gray-400 mr-2" />
                <p className="text-sm text-gray-600">Packaged in airtight containers</p>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 text-gray-400 mr-2" />
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


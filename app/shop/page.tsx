'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import ProductGrid from '../components/ProductGrid'
import ProductFilters from '../components/ProductFilters'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { toast } from "@/components/ui/use-toast"

type Product = {
  id: number
  name: string
  price: number
  category: string
  image_url: string
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const productsPerPage = 12

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreProducts()
    }
  }, [inView, hasMore])

  async function fetchProducts() {
    setLoading(true)
    console.log('Fetching initial products...')
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })
      .limit(productsPerPage)

    if (error) {
      console.error('Error fetching products:', error)
      toast({
        title: "Error",
        description: "Failed to fetch products. Please try again.",
        variant: "destructive",
      })
    } else {
      console.log('Fetched initial products:', data)
      setProducts(data || [])
      setFilteredProducts(data || [])
      setPage(2)
    }
    setLoading(false)
  }

  async function loadMoreProducts() {
    if (loading) return

    setLoading(true)
    console.log('Loading more products...')
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .range((page - 1) * productsPerPage, page * productsPerPage - 1)
      .order('id', { ascending: false })

    if (error) {
      console.error('Error fetching more products:', error)
    } else if (data) {
      console.log('Fetched more products:', data)
      setProducts(prevProducts => [...prevProducts, ...data])
      setFilteredProducts(prevFiltered => [...prevFiltered, ...data])
      setPage(prevPage => prevPage + 1)
      setHasMore(data.length === productsPerPage)
    }
    setLoading(false)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Searching for:', searchTerm)
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    console.log('Filtered products:', filtered)
    setFilteredProducts(filtered)
  }

  const handleFilter = (category: string, minPrice: number, maxPrice: number) => {
    console.log('Applying filters:', { category, minPrice, maxPrice })
    const filtered = products.filter(product =>
      (category === 'all' || product.category === category) &&
      product.price >= minPrice &&
      product.price <= maxPrice
    )
    console.log('Filtered products:', filtered)
    setFilteredProducts(filtered)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">تسوق توابلنا</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Button type="submit" variant="ghost" size="sm" className="absolute right-0 top-0 h-full">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
          <ProductFilters onFilter={handleFilter} />
        </div>
        <div className="w-full md:w-3/4">
          <ProductGrid products={filteredProducts} />
          {hasMore && (
            <div ref={ref} className="flex justify-center mt-8">
              <Button onClick={loadMoreProducts} disabled={loading}>
                {loading ? 'جاري التحميل...' : 'تحميل المزيد'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


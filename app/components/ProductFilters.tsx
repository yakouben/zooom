'use client'

import { useState, useEffect } from 'react'
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { supabase } from '../utils/supabase'

type ProductFiltersProps = {
  onFilter: (category: string, minPrice: number, maxPrice: number) => void
}

export default function ProductFilters({ onFilter }: ProductFiltersProps) {
  const [category, setCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 100])
  const [categories, setCategories] = useState<string[]>(['all'])

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    console.log('Fetching categories...')
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .distinct()

    if (error) {
      console.error('Error fetching categories:', error)
    } else {
      console.log('Fetched categories:', data)
      setCategories(['all', ...data.map(item => item.category)])
    }
  }

  const handleFilter = () => {
    console.log('Applying filter:', { category, priceRange })
    onFilter(category, priceRange[0], priceRange[1])
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">الفئة</h3>
        <RadioGroup value={category} onValueChange={setCategory}>
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <RadioGroupItem value={cat} id={cat} />
              <Label htmlFor={cat}>{cat === 'all' ? 'الكل' : cat}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">نطاق السعر</h3>
        <Slider
          min={0}
          max={100}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <Button onClick={handleFilter} className="w-full">تطبيق الفلتر</Button>
    </div>
  )
}


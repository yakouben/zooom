'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from 'lucide-react'

type Product = {
  id: number
  name: string
  price: number
  category: string
  image_url: string
}

type ProductGridProps = {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id}>
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
            <p className="text-2xl font-bold text-amber-600">${product.price.toFixed(2)}</p>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 text-sm text-gray-600">(4.5)</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild variant="outline">
              <Link href={`/products/${product.id}`}>View Details</Link>
            </Button>
            <Button>Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}


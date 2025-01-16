import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-amber-800 text-amber-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Azzou Spices</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li>
              <Link href="/cart" className="flex items-center">
                <ShoppingCart className="mr-1" />
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}


'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image_url: string
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
    setLoading(false)
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const submitOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const orderData = {
      customer_name: formData.get('name'),
      customer_email: formData.get('email'),
      customer_phone: formData.get('phone'),
      customer_address: formData.get('address'),
      delivery_preferences: formData.get('delivery'),
      items: JSON.stringify(cartItems),
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'not-processed'
    }

    console.log('Submitting order:', orderData)

    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])

    if (error) {
      console.error('Error submitting order:', error)
      alert(`There was an error submitting your order: ${error.message}`)
    } else {
      console.log('Order submitted successfully:', data)
      alert('Order submitted successfully!')
      localStorage.removeItem('cart')
      setCartItems([])
    }
  }

  if (loading) {
    return <div>Loading cart...</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
                <Image
                  src={item.image_url || "https://foodal.com/wp-content/uploads/2015/02/Make-Your-Own-Curry-Powder.jpg"}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-amber-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border rounded"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <p className="text-xl mb-4">
              Total: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
            </p>
            <form onSubmit={submitOrder} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">Name</label>
                <input type="text" id="name" name="name" required className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input type="email" id="email" name="email" required className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1">Phone</label>
                <input type="tel" id="phone" name="phone" required className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label htmlFor="address" className="block mb-1">Address</label>
                <textarea id="address" name="address" required className="w-full px-3 py-2 border rounded"></textarea>
              </div>
              <div>
                <label htmlFor="delivery" className="block mb-1">Delivery Preferences</label>
                <select id="delivery" name="delivery" className="w-full px-3 py-2 border rounded">
                  <option value="standard">Standard Delivery</option>
                  <option value="express">Express Delivery</option>
                </select>
              </div>
              <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">
                Place Order
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}


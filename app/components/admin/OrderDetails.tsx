import { useState, useEffect } from 'react'

type OrderItem = {
  id: number
  name: string
  price: number
  quantity: number
}

type Order = {
  id: number
  created_at: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  total: number
  status: string
  items: string
  delivery_preferences: string
}

type OrderDetailsProps = {
  order: Order
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  useEffect(() => {
    try {
      const parsedItems = JSON.parse(order.items)
      setOrderItems(parsedItems)
    } catch (error) {
      console.error('Error parsing order items:', error)
    }
  }, [order.items])

  return (
    <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Order Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-2">Customer Information</h4>
          <p><strong>Name:</strong> {order.customer_name}</p>
          <p><strong>Email:</strong> {order.customer_email}</p>
          <p><strong>Phone:</strong> {order.customer_phone}</p>
          <p><strong>Address:</strong> {order.customer_address}</p>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-2">Order Summary</h4>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
          <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Delivery Preference:</strong> {order.delivery_preferences}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Ordered Items</h4>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Product</th>
              <th className="border p-2 text-left">Quantity</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-left">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">${item.price.toFixed(2)}</td>
                <td className="border p-2">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


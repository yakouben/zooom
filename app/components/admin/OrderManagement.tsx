'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import OrderDetails from './OrderDetails'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching orders:', error)
    } else {
      setOrders(data || [])
    }
    setLoading(false)
  }

  async function updateOrderStatus(id: number, status: string) {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)

    if (error) {
      console.error('Error updating order status:', error)
    } else {
      fetchOrders()
    }
  }

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  if (loading) {
    return <div>Loading orders...</div>
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Order #{order.id}</h3>
              <p className="text-gray-600">{new Date(order.created_at).toLocaleString()}</p>
            </div>
            <p><strong>Customer:</strong> {order.customer_name}</p>
            <p><strong>Email:</strong> {order.customer_email}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <div className="mt-2 flex items-center">
              <label htmlFor={`status-${order.id}`} className="mr-2">Status:</label>
              <select
                id={`status-${order.id}`}
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="not-processed">Not Processed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button
              onClick={() => toggleOrderDetails(order.id)}
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              {expandedOrderId === order.id ? 'Hide Details' : 'Show Details'}
            </button>
            {expandedOrderId === order.id && (
              <OrderDetails order={order} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}


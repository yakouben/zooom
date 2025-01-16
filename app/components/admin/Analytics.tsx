'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type AnalyticsData = {
  totalOrders: number
  totalRevenue: number
  popularProducts: { name: string; quantity: number }[]
  recentActivities: { action: string; details: string; timestamp: string }[]
}

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  async function fetchAnalyticsData() {
    // Fetch total orders and revenue
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('total')

    // Fetch popular products
    const { data: productsData, error: productsError } = await supabase
      .from('order_items')
      .select('product_id, quantity')
      .limit(5)

    // Fetch recent activities (simplified for this example)
    const { data: activitiesData, error: activitiesError } = await supabase
      .from('orders')
      .select('id, created_at, customer_name')
      .order('created_at', { ascending: false })
      .limit(5)

    if (ordersError || productsError || activitiesError) {
      console.error('Error fetching analytics data:', ordersError || productsError || activitiesError)
      setLoading(false)
      return
    }

    // Process the data
    const totalOrders = ordersData?.length || 0
    const totalRevenue = ordersData?.reduce((sum, order) => sum + order.total, 0) || 0

    const popularProducts = productsData?.reduce((acc, item) => {
      const existingProduct = acc.find(p => p.id === item.product_id)
      if (existingProduct) {
        existingProduct.quantity += item.quantity
      } else {
        acc.push({ id: item.product_id, quantity: item.quantity })
      }
      return acc
    }, []).sort((a, b) => b.quantity - a.quantity).slice(0, 5) || []

    const recentActivities = activitiesData?.map(order => ({
      action: 'New Order',
      details: `Order #${order.id} by ${order.customer_name}`,
      timestamp: order.created_at
    })) || []

    setAnalyticsData({
      totalOrders,
      totalRevenue,
      popularProducts,
      recentActivities
    })
    setLoading(false)
  }

  if (loading) {
    return <div>Loading analytics data...</div>
  }

  if (!analyticsData) {
    return <div>Error loading analytics data</div>
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">{analyticsData.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold">${analyticsData.totalRevenue.toFixed(2)}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Popular Products</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData.popularProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <ul className="space-y-2">
          {analyticsData.recentActivities.map((activity, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.details}</p>
              </div>
              <p className="text-sm text-gray-600">{new Date(activity.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


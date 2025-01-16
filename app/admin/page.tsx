'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import ProductManagement from '../components/admin/ProductManagement'
import OrderManagement from '../components/admin/OrderManagement'
import Analytics from '../components/admin/Analytics'
import DatabaseCheck from './database-check'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products')

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded ${activeTab === 'analytics' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}
        >
          Analytics
        </button>
        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2 rounded ${activeTab === 'database' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}
        >
          Database Check
        </button>
      </div>
      {activeTab === 'products' && <ProductManagement />}
      {activeTab === 'orders' && <OrderManagement />}
      {activeTab === 'analytics' && <Analytics />}
      {activeTab === 'database' && <DatabaseCheck />}
    </div>
  )
}


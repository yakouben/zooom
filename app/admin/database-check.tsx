'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DatabaseCheck() {
  const [tables, setTables] = useState<string[]>([])
  const [orderColumns, setOrderColumns] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkDatabase() {
      try {
        // Get all tables
        const { data: tablesData, error: tablesError } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_schema', 'public')

        if (tablesError) throw tablesError

        const tableNames = tablesData.map(t => t.table_name)
        setTables(tableNames)

        // Get columns of the orders table
        if (tableNames.includes('orders')) {
          const { data: columnsData, error: columnsError } = await supabase
            .from('information_schema.columns')
            .select('column_name')
            .eq('table_name', 'orders')
            .eq('table_schema', 'public')

          if (columnsError) throw columnsError

          setOrderColumns(columnsData.map(c => c.column_name))
        }

        setLoading(false)
      } catch (err) {
        console.error('Error checking database:', err)
        setError(err instanceof Error ? err.message : String(err))
        setLoading(false)
      }
    }

    checkDatabase()
  }, [])

  if (loading) return <div>Checking database structure...</div>

  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Database Structure</h2>
      <div>
        <h3 className="font-semibold">Tables:</h3>
        <ul>
          {tables.map(table => (
            <li key={table}>{table}</li>
          ))}
        </ul>
      </div>
      {orderColumns.length > 0 && (
        <div>
          <h3 className="font-semibold">Orders Table Columns:</h3>
          <ul>
            {orderColumns.map(column => (
              <li key={column}>{column}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}


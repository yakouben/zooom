'use client'

import { useState, useEffect } from 'react'
import { supabase, uploadImage } from '../../utils/supabase'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Product = {
  id: number
  name: string
  description: string
  price: number
  category: string
  image_url: string
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
      toast({
        title: "Error",
        description: "Failed to fetch products. Please try again.",
        variant: "destructive",
      })
    } else {
      console.log('Fetched products:', data)
      setProducts(data || [])
    }
    setLoading(false)
  }

  async function fetchCategories() {
    const { data, error } = await supabase
      .from('products')
      .select('category')

    if (error) {
      console.error('Error fetching categories:', error)
    } else {
      console.log('Fetched categories:', data)
      const uniqueCategories = [...new Set(data.map(item => item.category))]
      setCategories(uniqueCategories)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const form = event.currentTarget
    const formData = new FormData(form)
    let imageUrl = editingProduct?.image_url || ''

    try {
      if (imageFile) {
        console.log('Uploading image...')
        imageUrl = await uploadImage(imageFile)
        console.log('Image uploaded successfully:', imageUrl)
      }

      const productData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        category: formData.get('category') as string,
        image_url: imageUrl,
      }

      console.log('Submitting product data:', productData)

      if (editingProduct) {
        const { data, error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id)

        if (error) throw error

        console.log('Product updated successfully:', data)
        toast({
          title: "Success",
          description: "Product updated successfully!",
        })
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])

        if (error) throw error

        console.log('Product added successfully:', data)
        toast({
          title: "Success",
          description: "Product added successfully!",
        })
      }

      setEditingProduct(null)
      setImageFile(null)
      form.reset()
      await fetchProducts()
      await fetchCategories()
    } catch (error) {
      console.error('Error adding/updating product:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add/update product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error

      console.log('Product deleted successfully:', id)
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      })
      await fetchProducts()  // Refresh the product list
      await fetchCategories()  // Refresh the categories list
    } catch (error) {
      console.error('Error deleting product:', error)
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      console.log('Image file selected:', file.name)
      setImageFile(file)
    }
  }

  if (loading) {
    return <div>جاري تحميل المنتجات...</div>
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">إدارة المنتجات</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <Label htmlFor="name">اسم المنتج</Label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={editingProduct?.name || ''}
          />
        </div>
        <div>
          <Label htmlFor="description">وصف المنتج</Label>
          <Textarea
            id="description"
            name="description"
            required
            defaultValue={editingProduct?.description || ''}
          />
        </div>
        <div>
          <Label htmlFor="price">السعر</Label>
          <Input
            type="number"
            id="price"
            name="price"
            step="0.01"
            required
            defaultValue={editingProduct?.price || ''}
          />
        </div>
        <div>
          <Label htmlFor="category">الفئة</Label>
          <Select name="category" defaultValue={editingProduct?.category || categories[0]}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="image">صورة المنتج</Label>
          <Input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {editingProduct ? 'تحديث المنتج' : 'إضافة منتج'}
        </Button>
      </form>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 line-clamp-2">{product.description}</p>
              <p className="text-amber-600 mt-2">${product.price.toFixed(2)}</p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                onClick={() => setEditingProduct(product)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                تعديل
              </Button>
              <Button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                حذف
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


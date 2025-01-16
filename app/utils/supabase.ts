import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
})

export const uploadImage = async (file: File) => {
  console.log('Starting image upload...')
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${fileName}`

  console.log('Uploading file:', filePath)
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file)

  if (error) {
    console.error('Error uploading image:', error)
    throw error
  }

  console.log('File uploaded successfully:', data)

  const { data: publicUrlData, error: publicUrlError } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath)

  if (publicUrlError) {
    console.error('Error getting public URL:', publicUrlError)
    throw publicUrlError
  }

  console.log('Public URL:', publicUrlData.publicUrl)
  return publicUrlData.publicUrl
}


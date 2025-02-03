import axios from "axios"
import { ProductDTO } from "@/interfaces";
import { productArraySchema, productSchema } from "../../../../packages/schemas/schema";


export const getProducts = async () => {
  const res = await axios.get('http://localhost:3000/products')
  try {
    return productArraySchema.parse(res.data)
  } catch (e) {
    console.log(e)
  }
}

export const getProduct = async (id: string) => {
  const res = await axios.get(`http://localhost:3000/products/${id}`)
  try {
    return productSchema.parse(res.data)
  } catch (e) {
    console.log(e)
  }
}

export const createProduct = async (product: ProductDTO) => {
  const res = await axios.post(`http://localhost:3000/products`, {
    body: JSON.stringify(product),
  })

  try {
    return productSchema.parse(res.data)
  } catch (e) {
    console.log(e)
  }
}


export const updateProduct = async (id: string, product: ProductDTO) => {
  const res = await axios.put(`http://localhost:3000/products/${id}`, {
    body: JSON.stringify(product),
  })

  try {
    return productSchema.parse(res.data)
  } catch (e) {
    console.log(e)
  }
}

export const deleteProduct = async (id: string) => {
  const res = await axios.delete(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  })

  return res.data
}
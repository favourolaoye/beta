'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
}

const ITEMS_PER_PAGE = 5

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Laptop", category: "Electronics", price: 999.99, stock: 50 },
    { id: 2, name: "Smartphone", category: "Electronics", price: 699.99, stock: 100 },
    { id: 3, name: "Headphones", category: "Audio", price: 149.99, stock: 200 },
    { id: 4, name: "Mouse", category: "Accessories", price: 29.99, stock: 300 },
    { id: 5, name: "Keyboard", category: "Accessories", price: 59.99, stock: 150 },
    { id: 6, name: "Monitor", category: "Electronics", price: 299.99, stock: 75 },
    { id: 7, name: "Tablet", category: "Electronics", price: 399.99, stock: 80 },
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<keyof Product>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleSort = (column: keyof Product) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-8xl mx-auto bg-white overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Product Inventory</h1>
          
          <div className="flex gap-4 mb-6">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="flex-grow"
            />
            <Select onValueChange={(value) => setSortBy(value as keyof Product)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="stock">Stock</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              variant="outline"
            >
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100 text-gray-700 cursor-pointer" onClick={() => handleSort('name')}>Name</TableHead>
                  <TableHead className="bg-gray-100 text-gray-700 cursor-pointer" onClick={() => handleSort('category')}>Category</TableHead>
                  <TableHead className="bg-gray-100 text-gray-700 cursor-pointer" onClick={() => handleSort('price')}>Price</TableHead>
                  <TableHead className="bg-gray-100 text-gray-700 cursor-pointer" onClick={() => handleSort('stock')}>Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {paginatedProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No products found. Try adjusting your search.
            </p>
          )}

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-600">
              Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, sortedProducts.length)} to {Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length)} of {sortedProducts.length} products
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                variant="outline"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                variant="outline"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
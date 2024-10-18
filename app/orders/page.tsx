"use client"

import { useState } from "react"
import { CreditCard, DollarSign, Package, Users, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Updated mock data with status
const initialOrderData = [
  { id: 1, customerName: "Alice Johnson", order: "Product A", amountPaid: 99.99, date: "2023-06-01", status: "confirmed" },
  { id: 2, customerName: "Bob Smith", order: "Product B", amountPaid: 149.99, date: "2023-06-02", status: "shipping" },
  { id: 3, customerName: "Charlie Brown", order: "Product C", amountPaid: 199.99, date: "2023-06-03", status: "delivered" },
  { id: 4, customerName: "Diana Ross", order: "Product D", amountPaid: 79.99, date: "2023-06-04", status: "confirmed" },
  { id: 5, customerName: "Edward Norton", order: "Product E", amountPaid: 129.99, date: "2023-06-05", status: "shipping" },
]

export default function OrderPage() {
  const [orderData, setOrderData] = useState(initialOrderData)
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [messageSubject, setMessageSubject] = useState("")
  const [messageBody, setMessageBody] = useState("")

  const totalRevenue = orderData.reduce((sum, order) => sum + order.amountPaid, 0)
  const averageOrderValue = totalRevenue / orderData.length
  const totalOrders = orderData.length
  const totalCustomers = new Set(orderData.map(order => order.customerName)).size

  const handleSendMessage = () => {
    console.log(`Sending message to ${selectedCustomer}:`, { subject: messageSubject, body: messageBody })
    // Here you would typically send the message to your backend
    // Reset form after sending
    setMessageSubject("")
    setMessageBody("")
  }

  const handleStatusChange = (orderId: number, newStatus: string) => {
    setOrderData(prevData =>
      prevData.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
  }

  const handleDeleteOrder = (orderId: number) => {
    setOrderData(prevData => prevData.filter(order => order.id !== orderId))
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Amount Paid</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.order}</TableCell>
                <TableCell>${order.amountPaid.toFixed(2)}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onValueChange={(value) => handleStatusChange(order.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="shipping">Shipping</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCustomer(order.customerName)}
                        >
                          Message
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Send Message to {selectedCustomer}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="subject" className="text-right">
                              Subject
                            </label>
                            <Input
                              id="subject"
                              value={messageSubject}
                              onChange={(e) => setMessageSubject(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="message" className="text-right">
                              Message
                            </label>
                            <Textarea
                              id="message"
                              value={messageBody}
                              onChange={(e) => setMessageBody(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <Button onClick={handleSendMessage}>Send Message</Button>
                      </DialogContent>
                    </Dialog>
                    {order.status === "delivered" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete order</span>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
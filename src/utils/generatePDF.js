import jsPDF from 'jspdf'

export function generateOrderPDF(order, user) {
  const doc = new jsPDF()

  doc.setFillColor(11, 15, 26)
  doc.rect(0, 0, 210, 297, 'F')

  doc.setFillColor(0, 207, 255)
  doc.rect(0, 0, 210, 40, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(28)
  doc.setTextColor(0, 0, 0)
  doc.text('RAPI SHOP', 105, 18, { align: 'center' })

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(11, 15, 26)
  doc.text('COMPROBANTE DE COMPRA', 105, 30, { align: 'center' })

  let y = 55

  doc.setTextColor(255, 215, 0)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Datos del comprador', 20, y)
  y += 10

  doc.setTextColor(200, 200, 200)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(`Nombre: ${user.name}`, 20, y)
  y += 8
  doc.text(`Email: ${user.email}`, 20, y)
  y += 8
  doc.text(`Fecha: ${new Date(order.fecha).toLocaleDateString('es-PE')}`, 20, y)
  y += 8
  doc.text(`ID Orden: #${order.id}`, 20, y)
  y += 15

  doc.setDrawColor(26, 31, 46)
  doc.line(20, y, 190, y)
  y += 12

  doc.setTextColor(255, 215, 0)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Productos', 20, y)
  y += 10

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Producto', 20, y)
  doc.text('Cant.', 120, y)
  doc.text('Precio', 145, y)
  doc.text('Subtotal', 175, y)
  y += 7
  doc.setDrawColor(0, 207, 255)
  doc.line(20, y, 190, y)
  y += 8

  doc.setFont('helvetica', 'normal')
  order.productos.forEach(producto => {
    const title = producto.title.length > 30 ? producto.title.substring(0, 28) + '...' : producto.title
    doc.setTextColor(200, 200, 200)
    doc.text(title, 20, y)
    doc.text(String(producto.quantity), 125, y)
    doc.text(`$${producto.price.toFixed(2)}`, 145, y)
    doc.setTextColor(0, 207, 255)
    doc.text(`$${(producto.price * producto.quantity).toFixed(2)}`, 175, y)
    y += 8
  })

  y += 5
  doc.setDrawColor(26, 31, 46)
  doc.line(20, y, 190, y)
  y += 10

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('TOTAL:', 130, y)
  doc.setTextColor(0, 207, 255)
  doc.text(`$${order.total.toFixed(2)}`, 175, y)
  y += 15

  if (order.estadoClave === 'entregado' && order.claveDigital) {
    doc.setDrawColor(26, 31, 46)
    doc.line(20, y, 190, y)
    y += 12

    doc.setFillColor(0, 207, 255, 0.1)
    doc.rect(20, y - 5, 170, 25, 'F')

    doc.setTextColor(0, 207, 255)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('CLAVE DIGITAL ENTREGADA', 105, y + 2, { align: 'center' })
    doc.setFontSize(16)
    doc.setTextColor(255, 215, 0)
    doc.text(order.claveDigital, 105, y + 14, { align: 'center' })
  } else {
    doc.setDrawColor(26, 31, 46)
    doc.line(20, y, 190, y)
    y += 12

    doc.setTextColor(160, 160, 160)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text('Estado de clave: PENDIENTE', 105, y + 2, { align: 'center' })
    doc.text('La clave digital se entregará en breve.', 105, y + 10, { align: 'center' })
  }

  y += 30
  doc.setTextColor(80, 80, 80)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('RAPI SHOP - Tienda de Videojuegos', 105, y, { align: 'center' })
  doc.text('Gracias por tu compra!', 105, y + 6, { align: 'center' })

  doc.save(`boleta-${order.id}.pdf`)
}

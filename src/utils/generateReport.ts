import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface ReportAllocation {
  fullName: string
  percentage: number
  color: string
  icon: string
}

interface ReportParams {
  allocations: ReportAllocation[]
  totalAmount: number
  userName: string
  profileName: string
  band: number
  confidenceScore: number
  segment: string
}

export function generateInvestmentReport(params: ReportParams) {
  const { allocations, totalAmount, userName, profileName, band, confidenceScore, segment } = params

  const doc = new jsPDF('p', 'mm', 'a4')
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20

  // ─── Colors ───────────────────────────────────────────────────────
  const brandBlue = [14, 165, 233] as [number, number, number]       // #0ea5e9
  const darkSlate = [15, 23, 42] as [number, number, number]         // #0f172a
  const lightGray = [248, 250, 252] as [number, number, number]      // #f8fafc
  const medGray = [100, 116, 139] as [number, number, number]        // #64748b

  // ─── Header Band ──────────────────────────────────────────────────
  doc.setFillColor(...darkSlate)
  doc.rect(0, 0, pageWidth, 42, 'F')

  // Brand accent stripe
  doc.setFillColor(...brandBlue)
  doc.rect(0, 42, pageWidth, 2, 'F')

  // Logo Text
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(28)
  doc.setTextColor(255, 255, 255)
  doc.text('VITT', margin, 22)

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(148, 163, 184) // slate-400
  doc.text('finance with wit', margin, 29)

  // Right-aligned date
  doc.setFontSize(9)
  doc.setTextColor(148, 163, 184)
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
  doc.text(dateStr, pageWidth - margin, 22, { align: 'right' })
  doc.setFontSize(7)
  doc.text('Investment Report', pageWidth - margin, 29, { align: 'right' })

  // ─── Title Section ────────────────────────────────────────────────
  let y = 56

  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkSlate)
  doc.text('Investment Allocation Report', margin, y)

  y += 8
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...medGray)
  doc.text(`Prepared for ${userName} · ${segment.charAt(0).toUpperCase() + segment.slice(1)} Segment`, margin, y)

  // ─── Score Summary Cards ──────────────────────────────────────────
  y += 14

  const cardWidth = (pageWidth - margin * 2 - 10) / 3
  const cards = [
    { label: 'Confidence Score', value: confidenceScore.toFixed(1), sub: 'out of 100' },
    { label: 'Risk Profile', value: profileName, sub: `Band ${band} / 10` },
    { label: 'Total Investment', value: `Rs. ${totalAmount.toLocaleString('en-IN')}`, sub: 'allocated amount' }
  ]

  cards.forEach((card, i) => {
    const x = margin + i * (cardWidth + 5)

    // Card background
    doc.setFillColor(...lightGray)
    doc.roundedRect(x, y, cardWidth, 30, 3, 3, 'F')

    // Card border
    doc.setDrawColor(226, 232, 240) // slate-200
    doc.setLineWidth(0.3)
    doc.roundedRect(x, y, cardWidth, 30, 3, 3, 'S')

    // Label
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...medGray)
    doc.text(card.label.toUpperCase(), x + cardWidth / 2, y + 9, { align: 'center' })

    // Value
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...darkSlate)
    doc.text(card.value, x + cardWidth / 2, y + 20, { align: 'center' })

    // Sub
    doc.setFontSize(6.5)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(148, 163, 184)
    doc.text(card.sub, x + cardWidth / 2, y + 26, { align: 'center' })
  })

  // ─── Allocation Table ─────────────────────────────────────────────
  y += 42

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkSlate)
  doc.text('Allocation Breakdown', margin, y)

  y += 2

  // Table data
  const tableBody = allocations.map((item) => {
    const allocated = (totalAmount * (item.percentage / 100))
    return [
      item.fullName,
      `${item.percentage}%`,
      `Rs. ${allocated.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    ]
  })

  // Total row
  tableBody.push([
    'TOTAL',
    '100%',
    `Rs. ${totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  ])

  autoTable(doc, {
    startY: y,
    head: [['Asset Bucket', 'Weight', 'Amount Allocated']],
    body: tableBody,
    margin: { left: margin, right: margin },
    theme: 'plain',
    headStyles: {
      fillColor: darkSlate,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      cellPadding: 5,
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [30, 41, 59], // slate-800
      cellPadding: 5,
    },
    alternateRowStyles: {
      fillColor: lightGray,
    },
    columnStyles: {
      0: { cellWidth: 'auto', fontStyle: 'bold' },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 50, halign: 'right', fontStyle: 'bold' },
    },
    // Style the total row differently
    didParseCell: (data) => {
      if (data.row.index === tableBody.length - 1) {
        data.cell.styles.fillColor = darkSlate
        data.cell.styles.textColor = [255, 255, 255]
        data.cell.styles.fontStyle = 'bold'
        data.cell.styles.fontSize = 10
      }
    },
  })

  // ─── Visual Bars ──────────────────────────────────────────────────
  // Get the Y after table
  const tableEndY = (doc as any).lastAutoTable?.finalY || y + 80
  y = tableEndY + 14

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkSlate)
  doc.text('Visual Distribution', margin, y)

  y += 8

  allocations.forEach((item) => {
    // Label row
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 41, 59)
    doc.text(item.fullName, margin, y)

    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...medGray)
    doc.text(`${item.percentage}%`, pageWidth - margin, y, { align: 'right' })

    y += 4

    // Bar background
    const barWidth = pageWidth - margin * 2
    doc.setFillColor(226, 232, 240) // slate-200
    doc.roundedRect(margin, y - 1.5, barWidth, 5, 2, 2, 'F')

    // Bar fill — parse hex color from item
    const hex = item.color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    doc.setFillColor(r, g, b)
    const fillWidth = Math.max((item.percentage / 100) * barWidth, 2)
    doc.roundedRect(margin, y - 1.5, fillWidth, 5, 2, 2, 'F')

    y += 10
  })

  // ─── Disclaimer / Footer ──────────────────────────────────────────
  y += 6

  // Divider line
  doc.setDrawColor(226, 232, 240)
  doc.setLineWidth(0.5)
  doc.line(margin, y, pageWidth - margin, y)

  y += 8
  doc.setFontSize(7)
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(148, 163, 184)
  const disclaimers = [
    'This report is auto-generated by Vitt\'s intelligent allocation engine and is for informational purposes only.',
    'It does not constitute financial advice. Please consult a qualified financial advisor before making investment decisions.',
    `Report ID: VITT-${Date.now().toString(36).toUpperCase()} · Generated: ${new Date().toISOString()}`
  ]
  disclaimers.forEach((line) => {
    doc.text(line, pageWidth / 2, y, { align: 'center' })
    y += 4
  })

  // ─── Bottom brand bar ─────────────────────────────────────────────
  const pageHeight = doc.internal.pageSize.getHeight()
  doc.setFillColor(...brandBlue)
  doc.rect(0, pageHeight - 4, pageWidth, 4, 'F')

  // ─── Save ─────────────────────────────────────────────────────────
  const fileName = `Vitt_Investment_Report_${new Date().toISOString().split('T')[0]}.pdf`
  
  // Use base64 data URI to avoid blob URL interception by dev server
  const pdfBase64 = doc.output('datauristring')
  const link = document.createElement('a')
  link.href = pdfBase64
  link.download = fileName
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  
  // Cleanup after a short delay to ensure download starts
  setTimeout(() => {
    document.body.removeChild(link)
  }, 100)

  return fileName
}

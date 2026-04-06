/** Format number as USD currency */
export const fmt = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)

/** Format ISO date string to readable date */
export const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

/** Format YYYY-MM to "Jan '25" */
export const fmtMonth = (ym) =>
  new Date(ym + '-01').toLocaleDateString('en-IN', {
    month: 'short',
    year: '2-digit',
  })

/** Export array of transactions to CSV download */
export const exportToCSV = (transactions, filename = 'transactions.csv') => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']
  const rows = transactions.map((t) =>
    [t.date, `"${t.description}"`, t.category, t.type, t.amount].join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}

/** Export array of transactions to JSON download */
export const exportToJSON = (transactions, filename = 'transactions.json') => {
  const json = JSON.stringify(transactions, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}

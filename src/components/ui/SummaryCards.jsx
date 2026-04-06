import React from 'react'
import { useApp } from '../../context/AppContext'
import { fmt } from '../../utils/formatters'

export default function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses, transactions } = useApp()

  const incomeCount  = transactions.filter((t) => t.type === 'income').length
  const expenseCount = transactions.filter((t) => t.type === 'expense').length

  const cards = [
    {
      label: 'Net Balance',
      value: totalBalance,
      color: 'var(--gold)',
      bgColor: 'rgba(245,158,11,0.1)',
      icon: '💰',
      sub: `${transactions.length} total transactions`,
    },
    {
      label: 'Total Income',
      value: totalIncome,
      color: 'var(--green)',
      bgColor: 'var(--green-bg)',
      icon: '📈',
      sub: `${incomeCount} income entries`,
    },
    {
      label: 'Total Expenses',
      value: totalExpenses,
      color: 'var(--red)',
      bgColor: 'var(--red-bg)',
      icon: '📉',
      sub: `${expenseCount} expense entries`,
    },
  ]

  return (
    <div className="fd-cards">
      {cards.map((c) => (
        <div className="fd-card" key={c.label}>
          <div className="fd-card-top-line" />
          <div className="fd-card-icon" style={{ background: c.bgColor }}>
            {c.icon}
          </div>
          <div className="fd-card-label">{c.label}</div>
          <div className="fd-card-value" style={{ color: c.color }}>
            {fmt(c.value)}
          </div>
          <div className="fd-card-sub">{c.sub}</div>
        </div>
      ))}
    </div>
  )
}

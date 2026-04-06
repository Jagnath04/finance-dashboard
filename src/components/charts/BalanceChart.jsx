import React, { useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import { useApp } from '../../context/AppContext'
import { fmt, fmtMonth } from '../../utils/formatters'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="custom-tooltip">
      <div className="custom-tooltip-label">{label}</div>
      {payload.map((p) => (
        <div className="custom-tooltip-row" key={p.dataKey}>
          <span style={{ color: p.color }}>● {p.dataKey}</span>
          <span>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function BalanceChart() {
  const { transactions } = useApp()

  const data = useMemo(() => {
    const months = {}
    transactions.forEach((t) => {
      const m = t.date.slice(0, 7)
      if (!months[m]) months[m] = { income: 0, expenses: 0 }
      if (t.type === 'income') months[m].income += t.amount
      else months[m].expenses += t.amount
    })
    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([m, v]) => ({
        name: fmtMonth(m),
        Income: v.income,
        Expenses: v.expenses,
        Balance: v.income - v.expenses,
      }))
  }, [transactions])

  const tickStyle = { fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'IBM Plex Mono' }

  return (
    <div className="fd-chart-wrap">
      <div className="fd-chart-title">Balance Over Time</div>
      <div className="fd-chart-subtitle">Monthly Cashflow Overview</div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="name" tick={tickStyle} axisLine={false} tickLine={false} />
          <YAxis tick={tickStyle} axisLine={false} tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="Income"   stroke="var(--green)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Expenses" stroke="var(--red)"   strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Balance"  stroke="var(--gold)"  strokeWidth={2.5}
            dot={{ fill: 'var(--gold)', r: 4, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>

      <div className="fd-chart-legend">
        <span className="fd-chart-legend-item"><span style={{ color: 'var(--green)' }}>●</span> Income</span>
        <span className="fd-chart-legend-item"><span style={{ color: 'var(--red)' }}>●</span> Expenses</span>
        <span className="fd-chart-legend-item"><span style={{ color: 'var(--gold)' }}>●</span> Balance</span>
      </div>
    </div>
  )
}

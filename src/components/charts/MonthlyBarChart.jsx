import React, { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
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
          <span style={{ color: p.fill }}>● {p.dataKey}</span>
          <span>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function MonthlyBarChart() {
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
        Savings: Math.max(0, v.income - v.expenses),
      }))
  }, [transactions])

  const tickStyle = { fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'IBM Plex Mono' }

  return (
    <div className="fd-chart-wrap" style={{ marginBottom: 20 }}>
      <div className="fd-chart-title">Monthly Comparison</div>
      <div className="fd-chart-subtitle">Income vs Expenses vs Savings</div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="name" tick={tickStyle} axisLine={false} tickLine={false} />
          <YAxis tick={tickStyle} axisLine={false} tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="Income"   fill="var(--green)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expenses" fill="var(--red)"   radius={[4, 4, 0, 0]} />
          <Bar dataKey="Savings"  fill="var(--gold)"  radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="fd-chart-legend">
        <span className="fd-chart-legend-item"><span style={{ color: 'var(--green)' }}>●</span> Income</span>
        <span className="fd-chart-legend-item"><span style={{ color: 'var(--red)' }}>●</span> Expenses</span>
        <span className="fd-chart-legend-item"><span style={{ color: 'var(--gold)' }}>●</span> Savings</span>
      </div>
    </div>
  )
}

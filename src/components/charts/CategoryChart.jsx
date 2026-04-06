import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../../context/AppContext'
import { CATEGORY_COLORS } from '../../data/mockData'
import { fmt } from '../../utils/formatters'

function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  if (percent < 0.07) return null
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle"
      dominantBaseline="central" fontSize={10} fontFamily="IBM Plex Mono">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className="custom-tooltip">
      <div className="custom-tooltip-label">{name}</div>
      <div className="custom-tooltip-row"><span>Total</span><span>{fmt(value)}</span></div>
    </div>
  )
}

export default function CategoryChart() {
  const { transactions } = useApp()

  const data = useMemo(() => {
    const cats = {}
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => { cats[t.category] = (cats[t.category] || 0) + t.amount })
    return Object.entries(cats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, value]) => ({ name, value }))
  }, [transactions])

  return (
    <div className="fd-chart-wrap">
      <div className="fd-chart-title">Expenses by Category</div>
      <div className="fd-chart-subtitle">Where Your Money Goes</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <ResponsiveContainer width={150} height={150}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%"
              innerRadius={42} outerRadius={70}
              dataKey="value" labelLine={false} label={<CustomLabel />}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#888'} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="cat-list">
          {data.map((d) => (
            <div className="cat-list-item" key={d.name}>
              <span className="cat-list-name">
                <span className="dot" style={{ background: CATEGORY_COLORS[d.name] || '#888' }} />
                {d.name}
              </span>
              <span className="cat-list-amt">{fmt(d.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

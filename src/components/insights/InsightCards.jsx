import React, { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { CATEGORY_COLORS } from '../../data/mockData'
import { fmt } from '../../utils/formatters'

export default function InsightCards() {
  const { transactions } = useApp()

  const insights = useMemo(() => {
    // Category totals (expenses only)
    const catTotals = {}
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => { catTotals[t.category] = (catTotals[t.category] || 0) + t.amount })

    const topCategory = Object.entries(catTotals).sort(([, a], [, b]) => b - a)[0] || ['—', 0]

    // Monthly comparison (hardcoded to mock months Mar vs Feb)
    const thisMonthTx = transactions.filter((t) => t.date.startsWith('2025-03'))
    const lastMonthTx = transactions.filter((t) => t.date.startsWith('2025-02'))

    const thisIncome  = thisMonthTx.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const thisExpenses = thisMonthTx.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    const lastExpenses = lastMonthTx.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

    const expChange = lastExpenses > 0
      ? ((thisExpenses - lastExpenses) / lastExpenses) * 100
      : 0

    // Savings rate (this month)
    const savingsRate = thisIncome > 0
      ? ((thisIncome - thisExpenses) / thisIncome) * 100
      : 0

    // Avg transaction size
    const avgTx = transactions.length > 0
      ? transactions.reduce((s, t) => s + t.amount, 0) / transactions.length
      : 0

    // Biggest single expense
    const biggestExpense = transactions
      .filter((t) => t.type === 'expense')
      .sort((a, b) => b.amount - a.amount)[0]

    return { topCategory, thisExpenses, lastExpenses, expChange, savingsRate, avgTx, biggestExpense }
  }, [transactions])

  const { topCategory, thisExpenses, lastExpenses, expChange, savingsRate, avgTx, biggestExpense } = insights

  const cards = [
    {
      label: 'Top Spending Category',
      value: topCategory[0],
      note: `${fmt(topCategory[1])} total spent`,
      color: CATEGORY_COLORS[topCategory[0]] || 'var(--gold)',
    },
    {
      label: 'Mar vs Feb Expenses',
      value: fmt(thisExpenses),
      note: (
        <>
          vs {fmt(lastExpenses)} last month{' '}
          <span className={expChange >= 0 ? 'trend-down' : 'trend-up'}>
            {expChange >= 0 ? '▲' : '▼'} {Math.abs(expChange).toFixed(1)}%
          </span>
        </>
      ),
      color: expChange >= 0 ? 'var(--red)' : 'var(--green)',
    },
    {
      label: 'Savings Rate (March)',
      value: `${savingsRate.toFixed(1)}%`,
      note: savingsRate >= 20
        ? '✅ Great — you\'re saving well!'
        : savingsRate >= 10
        ? '⚠ Moderate — room to improve'
        : '❌ Low — consider cutting expenses',
      color: savingsRate >= 20 ? 'var(--green)' : savingsRate >= 10 ? 'var(--gold)' : 'var(--red)',
    },
    {
      label: 'Avg Transaction Size',
      value: fmt(avgTx),
      note: `Across ${transactions.length} transactions`,
      color: 'var(--blue)',
    },
    {
      label: 'Largest Single Expense',
      value: biggestExpense ? fmt(biggestExpense.amount) : '—',
      note: biggestExpense ? `${biggestExpense.description} · ${biggestExpense.category}` : 'No expenses yet',
      color: 'var(--red)',
    },
    {
      label: 'Income Sources',
      value: [...new Set(transactions.filter(t => t.type === 'income').map(t => t.category))].length,
      note: 'Distinct income categories',
      color: 'var(--green)',
    },
  ]

  return (
    <div className="fd-insights-grid">
      {cards.map((c) => (
        <div className="fd-insight-card" key={c.label}>
          <div className="fd-insight-label">{c.label}</div>
          <div className="fd-insight-value" style={{ color: c.color }}>{c.value}</div>
          <div className="fd-insight-note">{c.note}</div>
        </div>
      ))}
    </div>
  )
}

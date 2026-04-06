import React from 'react'
import { useApp } from '../../context/AppContext'
import { CATEGORY_COLORS } from '../../data/mockData'
import { fmt, fmtDate } from '../../utils/formatters'

export default function RecentTransactions() {
  const { transactions, setActiveTab } = useApp()
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <div className="fd-section">
      <div className="fd-section-header">
        <div>
          <div className="fd-section-title">Recent Transactions</div>
          <div className="fd-section-sub">Latest 5 entries</div>
        </div>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setActiveTab('transactions')}
        >
          View All →
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="fd-empty">
          <div className="fd-empty-icon">📭</div>
          <div className="fd-empty-title">No transactions yet</div>
        </div>
      ) : (
        <div>
          {recent.map((t) => (
            <div
              key={t.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: `${CATEGORY_COLORS[t.category] || '#888'}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, flexShrink: 0,
                }}>
                  {t.type === 'income' ? '📥' : '📤'}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{t.description}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'IBM Plex Mono', marginTop: 2 }}>
                    {fmtDate(t.date)} · {t.category}
                  </div>
                </div>
              </div>
              <span className={t.type === 'income' ? 'amt-income' : 'amt-expense'} style={{ fontSize: 14 }}>
                {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import TransactionFilters from './TransactionFilters'
import TransactionsTable from './TransactionsTable'
import TransactionModal from '../modals/TransactionModal'
import { Icons } from '../ui/Icons'
import { exportToCSV, exportToJSON } from '../../utils/formatters'

export default function TransactionsPage() {
  const { role, filteredTransactions, transactions, resetTransactions } = useApp()
  const [showAdd, setShowAdd] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)

  return (
    <div className="fd-section">
      <div className="fd-section-header">
        <div>
          <div className="fd-section-title">All Transactions</div>
          <div className="fd-section-sub">
            {filteredTransactions.length} of {transactions.length} records
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Export */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setShowExportMenu((v) => !v)}
            >
              <Icons.Download /> Export
            </button>
            {showExportMenu && (
              <div style={{
                position: 'absolute', top: '110%', right: 0, zIndex: 10,
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 8, overflow: 'hidden', minWidth: 140,
                boxShadow: 'var(--shadow-card)',
              }}>
                <button
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', borderRadius: 0, padding: '10px 16px' }}
                  onClick={() => { exportToCSV(filteredTransactions); setShowExportMenu(false) }}
                >
                  Export as CSV
                </button>
                <button
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', borderRadius: 0, padding: '10px 16px' }}
                  onClick={() => { exportToJSON(filteredTransactions); setShowExportMenu(false) }}
                >
                  Export as JSON
                </button>
              </div>
            )}
          </div>

          {/* Admin-only: Reset + Add */}
          {role === 'admin' && (
            <>
              <button
                className="btn btn-outline btn-sm"
                onClick={resetTransactions}
                title="Reset to mock data"
              >
                <Icons.Reset /> Reset
              </button>
              <button className="btn btn-gold btn-sm" onClick={() => setShowAdd(true)}>
                <Icons.Plus /> Add Transaction
              </button>
            </>
          )}
        </div>
      </div>

      <TransactionFilters />
      <TransactionsTable />

      {showAdd && (
        <TransactionModal existing={null} onClose={() => setShowAdd(false)} />
      )}
    </div>
  )
}

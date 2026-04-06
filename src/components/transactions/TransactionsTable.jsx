import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import TransactionRow from './TransactionRow'
import TransactionModal from '../modals/TransactionModal'
import { Icons } from '../ui/Icons'

export default function TransactionsTable() {
  const { filteredTransactions, role, sortBy, setSortBy, sortDir, setSortDir } = useApp()
  const [editTarget, setEditTarget] = useState(null)

  const handleSort = (col) => {
    if (sortBy === col) setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    else { setSortBy(col); setSortDir('desc') }
  }

  const SortIcon = ({ col }) => {
    if (sortBy !== col) return null
    return sortDir === 'desc' ? <Icons.ArrowDown /> : <Icons.ArrowUp />
  }

  if (filteredTransactions.length === 0) {
    return (
      <div className="fd-empty">
        <div className="fd-empty-icon">🔍</div>
        <div className="fd-empty-title">No transactions found</div>
        <div className="fd-empty-sub">Try adjusting your search or filters.</div>
      </div>
    )
  }

  return (
    <>
      <div className="fd-table-wrap">
        <table>
          <thead>
            <tr>
              <th
                className="th-sort"
                onClick={() => handleSort('date')}
                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              >
                Date <SortIcon col="date" />
              </th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th className="th-sort th-right" onClick={() => handleSort('amount')}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                  Amount <SortIcon col="amount" />
                </span>
              </th>
              {role === 'admin' && <th className="th-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <TransactionRow
                key={tx.id}
                transaction={tx}
                onEdit={setEditTarget}
              />
            ))}
          </tbody>
        </table>
      </div>

      {editTarget && (
        <TransactionModal
          existing={editTarget}
          onClose={() => setEditTarget(null)}
        />
      )}
    </>
  )
}

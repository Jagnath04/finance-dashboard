import React from 'react'
import { useApp } from '../../context/AppContext'
import { CATEGORY_COLORS } from '../../data/mockData'
import { fmt, fmtDate } from '../../utils/formatters'
import { Icons } from '../ui/Icons'

export default function TransactionRow({ transaction, onEdit }) {
  const { role, deleteTransaction } = useApp()
  const { id, date, description, category, type, amount } = transaction

  return (
    <tr>
      <td className="td-muted td-mono">{fmtDate(date)}</td>
      <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {description}
      </td>
      <td>
        <span className="badge badge-cat">
          <span className="dot" style={{ background: CATEGORY_COLORS[category] || '#888' }} />
          {category}
        </span>
      </td>
      <td>
        <span className={`badge badge-${type}`}>
          {type === 'income' ? '▲' : '▼'} {type}
        </span>
      </td>
      <td className="td-right">
        <span className={type === 'income' ? 'amt-income' : 'amt-expense'}>
          {type === 'income' ? '+' : '-'}{fmt(amount)}
        </span>
      </td>

      {role === 'admin' && (
        <td className="td-right">
          <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
            <button
              className="btn btn-ghost btn-xs"
              title="Edit"
              onClick={() => onEdit(transaction)}
            >
              <Icons.Edit />
            </button>
            <button
              className="btn btn-danger btn-xs"
              title="Delete"
              onClick={() => deleteTransaction(id)}
            >
              <Icons.Trash />
            </button>
          </div>
        </td>
      )}
    </tr>
  )
}

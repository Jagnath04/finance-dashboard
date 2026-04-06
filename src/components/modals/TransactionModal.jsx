import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/mockData'
import { Icons } from '../ui/Icons'

const EMPTY_FORM = {
  description: '',
  amount: '',
  category: 'Food',
  type: 'expense',
  date: new Date().toISOString().slice(0, 10),
}

export default function TransactionModal({ existing, onClose }) {
  const { addTransaction, editTransaction } = useApp()
  const [form, setForm] = useState(
    existing
      ? { ...existing, amount: String(existing.amount) }
      : EMPTY_FORM
  )
  const [errors, setErrors] = useState({})

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.description.trim()) errs.description = 'Required'
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      errs.amount = 'Enter a valid amount'
    if (!form.date) errs.date = 'Required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const payload = { ...form, amount: Number(form.amount) }
    if (existing) editTransaction(existing.id, payload)
    else addTransaction(payload)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div className="modal-title">
            {existing ? 'Edit Transaction' : 'New Transaction'}
          </div>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: '4px 8px' }}>
            <Icons.Close />
          </button>
        </div>

        {/* Description */}
        <div className="form-row">
          <label className="form-label">Description</label>
          <input
            className="fd-input"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="e.g. Grocery Store"
          />
          {errors.description && (
            <div style={{ color: 'var(--red)', fontSize: 11, marginTop: 4 }}>{errors.description}</div>
          )}
        </div>

        {/* Amount + Date */}
        <div className="form-grid">
          <div className="form-row">
            <label className="form-label">Amount (USD)</label>
            <input
              className="fd-input"
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={(e) => set('amount', e.target.value)}
              placeholder="0.00"
            />
            {errors.amount && (
              <div style={{ color: 'var(--red)', fontSize: 11, marginTop: 4 }}>{errors.amount}</div>
            )}
          </div>
          <div className="form-row">
            <label className="form-label">Date</label>
            <input
              className="fd-input"
              type="date"
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
            />
            {errors.date && (
              <div style={{ color: 'var(--red)', fontSize: 11, marginTop: 4 }}>{errors.date}</div>
            )}
          </div>
        </div>

        {/* Category + Type */}
        <div className="form-grid">
          <div className="form-row">
            <label className="form-label">Category</label>
            <select
              className="fd-input fd-select"
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              style={{ width: '100%' }}
            >
              {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Type</label>
            <select
              className="fd-input fd-select"
              value={form.type}
              onChange={(e) => set('type', e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-gold" onClick={handleSubmit}>
            {existing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}

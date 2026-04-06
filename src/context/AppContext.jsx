import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { MOCK_TRANSACTIONS } from '../data/mockData'

const AppContext = createContext(null)

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export function AppProvider({ children }) {
  // ── Transactions ──────────────────────────────────────────────
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem('fd_transactions')
      return stored ? JSON.parse(stored) : MOCK_TRANSACTIONS
    } catch {
      return MOCK_TRANSACTIONS
    }
  })

  useEffect(() => {
    localStorage.setItem('fd_transactions', JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = useCallback((tx) => {
    setTransactions((prev) => [{ ...tx, id: Date.now() }, ...prev])
  }, [])

  const editTransaction = useCallback((id, updated) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    )
  }, [])

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const resetTransactions = useCallback(() => {
    setTransactions(MOCK_TRANSACTIONS)
  }, [])

  // ── UI State ──────────────────────────────────────────────────
  const [role, setRole] = useState('viewer')
  const [darkMode, setDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  // ── Filters ───────────────────────────────────────────────────
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [sortDir, setSortDir] = useState('desc')

  const clearFilters = useCallback(() => {
    setSearch('')
    setFilterType('all')
    setFilterCategory('All')
    setSortBy('date')
    setSortDir('desc')
  }, [])

  // ── Derived: filtered + sorted transactions ───────────────────
  const filteredTransactions = useMemo(() => {
    let list = [...transactions]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
    }

    if (filterType !== 'all') {
      list = list.filter((t) => t.type === filterType)
    }

    if (filterCategory !== 'All') {
      list = list.filter((t) => t.category === filterCategory)
    }

    list.sort((a, b) => {
      if (sortBy === 'date') {
        return sortDir === 'desc'
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date)
      }
      return sortDir === 'desc' ? b.amount - a.amount : a.amount - b.amount
    })

    return list
  }, [transactions, search, filterType, filterCategory, sortBy, sortDir])

  // ── Derived: summary totals ───────────────────────────────────
  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'income')
        .reduce((s, t) => s + t.amount, 0),
    [transactions]
  )

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'expense')
        .reduce((s, t) => s + t.amount, 0),
    [transactions]
  )

  const totalBalance = totalIncome - totalExpenses

  return (
    <AppContext.Provider
      value={{
        // Data
        transactions,
        filteredTransactions,
        totalIncome,
        totalExpenses,
        totalBalance,
        // CRUD
        addTransaction,
        editTransaction,
        deleteTransaction,
        resetTransactions,
        // UI
        role, setRole,
        darkMode, setDarkMode,
        activeTab, setActiveTab,
        // Filters
        search, setSearch,
        filterType, setFilterType,
        filterCategory, setFilterCategory,
        sortBy, setSortBy,
        sortDir, setSortDir,
        clearFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

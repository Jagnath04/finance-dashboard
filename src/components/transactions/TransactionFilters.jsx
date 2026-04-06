import React from 'react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/mockData'
import { Icons } from '../ui/Icons'

export default function TransactionFilters() {
  const {
    search, setSearch,
    filterType, setFilterType,
    filterCategory, setFilterCategory,
    clearFilters,
  } = useApp()

  const hasFilters =
    search || filterType !== 'all' || filterCategory !== 'All'

  return (
    <div className="fd-filters">
      {/* Search */}
      <div className="fd-search-wrap">
        <span className="fd-search-icon"><Icons.Search /></span>
        <input
          className="fd-input fd-input-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions…"
        />
      </div>

      {/* Type filter */}
      <select
        className="fd-select"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Category filter */}
      <select
        className="fd-select"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Clear filters */}
      {hasFilters && (
        <button className="btn btn-outline btn-sm" onClick={clearFilters}>
          Clear Filters
        </button>
      )}
    </div>
  )
}

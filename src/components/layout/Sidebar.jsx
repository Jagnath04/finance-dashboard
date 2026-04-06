import React from 'react'
import { useApp } from '../../context/AppContext'
import { Icons } from '../ui/Icons'

const NAV_ITEMS = [
  { id: 'overview',     label: 'Overview',      Icon: Icons.Overview      },
  { id: 'transactions', label: 'Transactions',  Icon: Icons.Transactions  },
  { id: 'insights',     label: 'Insights',      Icon: Icons.Insights      },
]

export default function Sidebar() {
  const { activeTab, setActiveTab } = useApp()

  return (
    <nav className="fd-sidebar">
      <div className="fd-sidebar-logo">
        <div className="fd-sidebar-logo-name">FinDash</div>
        <div className="fd-sidebar-logo-tag">Finance Dashboard</div>
      </div>

      <div className="fd-nav">
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`fd-nav-item ${activeTab === id ? 'active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>

      <div className="fd-sidebar-footer">
        v1.0.0 · Frontend Only @copyright 2026
      </div>
    </nav>
  )
}

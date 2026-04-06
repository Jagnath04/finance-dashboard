import React from 'react'
import { useApp } from '../../context/AppContext'
import { Icons } from '../ui/Icons'

const PAGE_META = {
  overview:     { title: 'Overview',      sub: 'YOUR FINANCIAL SNAPSHOT'  },
  transactions: { title: 'Transactions',  sub: 'ALL ACTIVITY'              },
  insights:     { title: 'Insights',      sub: 'SPENDING ANALYSIS'         },
}

export default function Header() {
  const { activeTab, role, setRole, darkMode, setDarkMode } = useApp()
  const { title, sub } = PAGE_META[activeTab] || PAGE_META.overview

  return (
    <div className="fd-header">
      <div>
        <div className="fd-header-title">{title}</div>
        <div className="fd-header-sub">{sub}</div>
      </div>

      <div className="fd-header-right">
        {/* Role switcher */}
        <div className="role-switcher">
          <button
            className={`role-btn ${role === 'viewer' ? 'active' : ''}`}
            onClick={() => setRole('viewer')}
          >
            Viewer
          </button>
          <button
            className={`role-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            Admin
          </button>
        </div>

        <span className={`role-badge ${role}`}>
          {role === 'admin' ? '⚙ Admin' : '👁 Viewer'}
        </span>

        {/* Dark/Light toggle */}
        <button
          className="mode-toggle"
          onClick={() => setDarkMode((d) => !d)}
          title="Toggle theme"
        >
          {darkMode ? <Icons.Sun /> : <Icons.Moon />}
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </div>
    </div>
  )
}

import React from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import OverviewPage from './components/layout/OverviewPage'
import TransactionsPage from './components/transactions/TransactionsPage'
import InsightsPage from './components/insights/InsightsPage'

function DashboardInner() {
  const { darkMode, activeTab } = useApp()

  return (
    <div className={`fd-root ${darkMode ? 'dark' : 'light'}`}>
      <div className="fd-layout">
        <Sidebar />
        <main className="fd-main">
          <Header />
          {activeTab === 'overview'      && <OverviewPage />}
          {activeTab === 'transactions'  && <TransactionsPage />}
          {activeTab === 'insights'      && <InsightsPage />}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <DashboardInner />
    </AppProvider>
  )
}

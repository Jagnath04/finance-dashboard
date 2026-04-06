import React from 'react'
import SummaryCards from '../ui/SummaryCards'
import BalanceChart from '../charts/BalanceChart'
import CategoryChart from '../charts/CategoryChart'
import RecentTransactions from '../transactions/RecentTransactions'

export default function OverviewPage() {
  return (
    <>
      <SummaryCards />
      <div className="fd-charts">
        <BalanceChart />
        <CategoryChart />
      </div>
      <RecentTransactions />
    </>
  )
}

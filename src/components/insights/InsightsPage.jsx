import React from 'react'
import InsightCards from './InsightCards'
import MonthlyBarChart from '../charts/MonthlyBarChart'
import CategoryChart from '../charts/CategoryChart'
import SummaryCards from '../ui/SummaryCards'

export default function InsightsPage() {
  return (
    <>
      <SummaryCards />
      <InsightCards />
      <MonthlyBarChart />
      <div className="fd-charts" style={{ marginBottom: 0 }}>
        <CategoryChart />
      </div>
    </>
  )
}

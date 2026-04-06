# FinDash — Finance Dashboard

A clean, interactive personal finance dashboard built with **React + Recharts**.  
Track income, expenses, visualize spending patterns, and manage transactions — all in the browser with localStorage persistence.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Dashboard Overview** | Balance, Income & Expense summary cards |
| **Charts** | Line chart (balance over time) · Donut chart (by category) · Bar chart (monthly comparison) |
| **Transactions** | Searchable, filterable, sortable table with CSV & JSON export |
| **Role-based UI** | Viewer (read-only) · Admin (add / edit / delete transactions) |
| **Insights** | Top spending category · Monthly comparison · Savings rate · Avg transaction size |
| **Dark / Light Mode** | Persistent theme toggle |
| **localStorage** | Data persists across browser sessions |
| **Responsive** | Works on desktop, tablet, and mobile |

---

## 🗂 Folder Structure

```
finance-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── BalanceChart.jsx       # Line chart – balance over time
│   │   │   ├── CategoryChart.jsx      # Donut chart – expenses by category
│   │   │   └── MonthlyBarChart.jsx    # Bar chart – monthly comparison
│   │   ├── insights/
│   │   │   ├── InsightCards.jsx       # 6-card insights grid
│   │   │   └── InsightsPage.jsx       # Insights page layout
│   │   ├── layout/
│   │   │   ├── Header.jsx             # Top bar: title, role switch, theme toggle
│   │   │   ├── OverviewPage.jsx       # Overview page layout
│   │   │   └── Sidebar.jsx            # Left navigation sidebar
│   │   ├── modals/
│   │   │   └── TransactionModal.jsx   # Add / Edit transaction form modal
│   │   ├── transactions/
│   │   │   ├── RecentTransactions.jsx # Last 5 transactions (overview page)
│   │   │   ├── TransactionFilters.jsx # Search + filter controls
│   │   │   ├── TransactionRow.jsx     # Single table row
│   │   │   ├── TransactionsPage.jsx   # Full transactions page
│   │   │   └── TransactionsTable.jsx  # Sortable full table
│   │   └── ui/
│   │       ├── Icons.jsx              # Inline SVG icon library
│   │       └── SummaryCards.jsx       # Balance / Income / Expense cards
│   ├── context/
│   │   └── AppContext.jsx             # Global state (Context API)
│   ├── data/
│   │   └── mockData.js                # 40 sample transactions + constants
│   ├── styles/
│   │   └── global.css                 # All styles (CSS variables, responsive)
│   ├── utils/
│   │   └── formatters.js              # fmt(), fmtDate(), exportToCSV(), exportToJSON()
│   ├── App.jsx                        # Root component
│   └── main.jsx                       # ReactDOM entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** v18 or higher — [download here](https://nodejs.org)
- **npm** v8+ (comes with Node.js)

### Step 1 — Unzip the project

```bash
unzip finance-dashboard.zip
cd finance-dashboard
```

### Step 2 — Install dependencies

```bash
npm install
```

This installs React, ReactDOM, Recharts, and Vite.

### Step 3 — Start the development server

```bash
npm run dev
```

Open your browser and go to: **http://localhost:5173**

### Step 4 — Build for production (optional)

```bash
npm run build
```

Output goes to the `dist/` folder. You can deploy it to Netlify, Vercel, or any static host.

```bash
# Preview the production build locally
npm run preview
```

---

## 🎮 How to Use

### Role Switching
Click **Viewer** or **Admin** in the top-right header.
- **Viewer** — read-only, no edit controls shown
- **Admin** — shows Add, Edit, Delete buttons and Reset option

### Adding Transactions (Admin only)
1. Switch to **Admin** role
2. Go to **Transactions** tab
3. Click **+ Add Transaction**
4. Fill in description, amount, date, category, type → **Add Transaction**

### Filtering & Searching
- Use the search box to filter by description or category
- Use the **Type** and **Category** dropdowns to narrow results
- Click column headers (**Date**, **Amount**) to sort ascending/descending

### Exporting Data
Click the **Export** button → choose **CSV** or **JSON**

### Resetting Data
Switch to **Admin** → click **Reset** to restore the original 40 mock transactions

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Recharts | Charts (Line, Bar, Pie/Donut) |
| Context API | Global state management |
| CSS Variables | Theming (dark/light) |
| localStorage | Client-side persistence |
| Google Fonts | DM Serif Display · IBM Plex Mono · Syne |

---

## 🎨 Design System

- **Primary accent:** `#F59E0B` (Amber/Gold)
- **Success:** `#10B981` (Emerald)
- **Danger:** `#EF4444` (Red)
- **Heading font:** DM Serif Display
- **Mono/data font:** IBM Plex Mono
- **Body font:** Syne

---

## 📝 Notes

- No backend required — all data is mock/static
- Data persists in `localStorage` under the key `fd_transactions`
- The app is entirely frontend — safe to open as a static file
- Fonts load from Google Fonts CDN (requires internet on first load)

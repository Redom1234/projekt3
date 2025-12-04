import './App.css'
import { DataForm } from './components/DataForm'
import { DataTable } from './components/DataTable'
import { MetricsCard } from './components/MetricsCard'
import { TrendChart } from './components/TrendChart'
import { useDashboardData } from './hooks/useDashboardData'

const formatNumber = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return Number(value).toFixed(1)
}

function App() {
  const { items, loading, error, statistics, createItem, deleteItem, submitting } = useDashboardData()

  return (
    <div className="min-h-screen px-4 py-10 text-white sm:px-6 lg:px-10">
      <header className="mx-auto max-w-6xl">
        <h1 className="mt-2 text-4xl font-semibold">Realtime Data Dashboard</h1>
      </header>

      <main className="mx-auto mt-10 grid max-w-6xl gap-6">
        {error ? (
          <div className="rounded-md border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <section className="dashboard-grid">
          <MetricsCard label="Datapunkter" value={statistics.totalEntries} />
          <MetricsCard label="Summa" value={formatNumber(statistics.totalValue)} />
          <MetricsCard
            label="Snittvärde"
            value={formatNumber(statistics.averageValue)}
            helper="Beräknas automatiskt"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <article className="glass-panel">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Dina data</h2>
              {loading ? <span className="text-xs text-slate-400">Laddar...</span> : null}
      </div>
            <DataTable
              items={items}
              onDelete={async (id) => {
                await deleteItem(id)
              }}
            />
          </article>
          <article className="glass-panel">
            <h2 className="mb-4 text-xl font-semibold">Lägg till datapunkt</h2>
            <DataForm
              submitting={submitting}
              onSubmit={async (payload) => {
                await createItem(payload)
              }}
            />
          </article>
        </section>

        <TrendChart items={items} />
      </main>
      </div>
  )
}

export default App

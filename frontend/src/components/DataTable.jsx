const formatDate = (value) => new Date(value).toLocaleString()

export const DataTable = ({ items = [], onDelete }) => {
  if (!items.length) {
    return <p className="text-sm text-slate-400">Inga datapunkter än. Lägg till din första!</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-left text-sm text-slate-200">
        <thead className="text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-4 py-2">Titel</th>
            <th className="px-4 py-2">Kategori</th>
            <th className="px-4 py-2">Värde</th>
            <th className="px-4 py-2">Skapad</th>
            <th className="px-4 py-2 text-right">Radera</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-t border-slate-700/60">
              <td className="px-4 py-3 font-semibold text-white">{item.title}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-slate-800 px-2 py-1 text-xs capitalize text-slate-200">
                  {item.category}
                </span>
              </td>
              <td className="px-4 py-3 text-lg font-bold text-emerald-300">{item.value}</td>
              <td className="px-4 py-3 text-slate-400 text-xs">{formatDate(item.created_at)}</td>
              <td className="px-4 py-3 text-right">
                {onDelete ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Vill du radera den här raden?')) {
                        onDelete(item._id)
                      }
                    }}
                    className="rounded-md border border-red-500/70 px-3 py-1 text-xs font-semibold text-red-200 hover:bg-red-500/10"
                  >
                    Radera
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


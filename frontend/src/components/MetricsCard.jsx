export const MetricsCard = ({ label, value, helper }) => (
  <div className="glass-panel">
    <p className="text-sm uppercase tracking-wide text-slate-400">{label}</p>
    <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    {helper ? <p className="mt-2 text-xs text-slate-400">{helper}</p> : null}
  </div>
)


import { useState } from 'react'

const defaultState = {
  title: '',
  value: '',
}

export const DataForm = ({ onSubmit, submitting }) => {
  const [formState, setFormState] = useState(defaultState)
  const [error, setError] = useState(null)

  const updateState = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const payload = {
      title: formState.title.trim(),
      value: Number(formState.value),
    }
    try {
      await onSubmit(payload)
      setFormState(defaultState)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-300">Titel</label>
        <input
          type="text"
          value={formState.title}
          onChange={(e) => updateState('title', e.target.value)}
          required
          className="w-full rounded-md border border-slate-600 bg-slate-900/50 px-3 py-2 text-slate-100 focus:border-brand focus:outline-none"
          placeholder="Titel"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Värde</label>
          <input
            type="number"
            step="0.01"
            value={formState.value}
            onChange={(e) => updateState('value', e.target.value)}
            required
            className="w-full rounded-md border border-slate-600 bg-slate-900/50 px-3 py-2 text-slate-100 focus:border-brand focus:outline-none"
            placeholder="125"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-600"
      >
        {submitting ? 'Sparar...' : 'Spara datapunkt'}
      </button>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </form>
  )
}


export default function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-4">
      <div className="input-group">
        <span className="input-group-text">🔍</span>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button
            className="btn btn-outline-secondary"
            onClick={() => setSearch('')}
          >
            ✕ Clear
          </button>
        )}
      </div>
    </div>
  )
}
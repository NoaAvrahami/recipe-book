interface SearchBarProps {
  query: string
  onQueryChange: (query: string) => void
}

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <section className="search-field home-search">
      <label htmlFor="recipe-search">Search recipes</label>
      <input
        id="recipe-search"
        type="search"
        placeholder="Try pasta, chicken, or soup..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
    </section>
  )
}

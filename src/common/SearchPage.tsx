import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooks } from '@/hooks/useBooks'
import { ROUTES } from '@/constants'
import BookCard from './BookCard'
import Logo from '@/assets/logo/logo.svg'
import SearchIcon from '@/assets/icon/Search.svg'

export default function SearchPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const { data, isFetching } = useBooks({
    q: query,
    limit: 12,
  })

  const books = data?.data?.books ?? []

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
        <img src={Logo} alt="Booky" width={36} height={36} />
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
          <img src={SearchIcon} alt="search" width={18} height={18} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search book"
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 text-lg leading-none">
              ×
            </button>
          )}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold"
          style={{ color: 'var(--primary-300)' }}
        >
          Cancel
        </button>
      </div>

      {/* Results */}
      <div className="px-4 py-4">
        {query === '' ? (
          <p className="text-center text-gray-400 text-sm mt-10">Type to search books...</p>
        ) : isFetching ? (
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-56 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-10">No books found for "{query}"</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {books.map((book: any) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => navigate(ROUTES.BookDetail(book.id))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
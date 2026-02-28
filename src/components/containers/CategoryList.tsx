import { useCategories } from "@/lib/books/hooks"

export default function CategoryList() {
  const { data, isLoading } = useCategories()

  if (isLoading) return <div className="h-20 animate-pulse bg-gray-100 rounded-lg" />

  return (
    <div className="grid grid-cols-3 gap-4 px-4 py-2">
      {data?.map((category) => (
        <div
          key={category.id}
          className="flex flex-col items-center gap-1 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <img src={category.icon} width={28} height={28} alt={category.name} />
          </div>
          <span className="text-xs text-gray-600">{category.name}</span>
        </div>
      ))}
    </div>
  )
}
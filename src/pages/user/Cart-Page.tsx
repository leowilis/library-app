import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/index";
import { removeFromCart } from "@/store/cartSlice";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const allSelected = items.length > 0 && selectedIds.length === items.length;

  function toggleSelect(id: number) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function toggleSelectAll() {
    setSelectedIds(allSelected ? [] : items.map((i) => i.book.id));
  }

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const selectedItems = items.filter((i) => selectedIds.includes(i.book.id));

  const handleCheckout = () => {
    // Pass full book objects including coverImage to checkout
    navigate("/checkout", {
      state: {
        books: selectedItems.map((i) => ({
          id: i.book.id,
          title: i.book.title,
          coverImage: i.book.coverImage,
          category: i.book.category,
          author: i.book.author,
          rating: i.book.rating,
          stock: i.book.stock,
        })),
      },
    });
  };

  return (
    <div className="min-h-screen">
      <div className="px-4 md:px-8 py-2">
        <h1 className="text-2xl font-bold mb-6">My Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">Cart is empty.</p>
          </div>
        ) : (
          <>
            {/* Select All */}
            <label className="flex items-center gap-3 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded border-neutral-400 accent-blue-600"
              />
              <span className="text-sm font-medium text-gray-900">Select All</span>
            </label>

            {/* Cart Items */}
            <div className="space-y-0">
              {items.map((item, index) => {
                const book = item.book;
                const checked = selectedIds.includes(book.id);
                return (
                  <div key={book.id}>
                    <div className="flex items-start gap-4 py-6">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSelect(book.id)}
                        className="mt-2 w-5 h-5 border-gray-300 accent-blue-600"
                      />
                      {/* Cover from API */}
                      <div className="w-16 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        {book.coverImage ? (
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-50 text-xl">📚</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-xs font-bold text-gray-950 mb-3 px-2 py-1 border border-neutral-300 rounded-sm">
                          {book.category?.name ?? "Category"}
                        </span>
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
                        <p className="text-sm text-neutral-700">{book.author?.name ?? "Author name"}</p>
                      </div>
                      <button
                        onClick={() => handleRemove(book.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    {index < items.length - 1 && <div className="border-b border-gray-200" />}
                  </div>
                );
              })}
            </div>

            {/* Mobile Bottom Bar */}
            {selectedItems.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Total Book</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedItems.length} items</p>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="px-6 py-2.5 rounded-full text-white text-sm font-semibold"
                    style={{ backgroundColor: "#1c65da" }}
                  >
                    Borrow Book
                  </button>
                </div>
              </div>
            )}

            {/* Desktop Bottom Bar */}
            {selectedItems.length > 0 && (
              <div className="hidden md:flex items-center justify-between mt-6 bg-gray-50 p-6 rounded-xl sticky bottom-4 shadow-sm">
                <div>
                  <p className="text-sm text-gray-500">Total Book</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedItems.length} items</p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="px-8 py-3 rounded-full text-white text-sm font-semibold"
                  style={{ backgroundColor: "#1c65da" }}
                >
                  Borrow Book
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
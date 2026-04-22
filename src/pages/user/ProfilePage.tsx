import { useSearchParams } from "react-router-dom"
import type { JSX } from "react"
import ProfileTab from "./ProfileTab"
import BorrowedTab from "@/pages/user/BorrowTab"
import ReviewsTab from "./ReviewsTab"

type Tab = "profile" | "borrowed" | "reviews"

const TABS: { key: Tab; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "borrowed", label: "Borrowed List" },
  { key: "reviews", label: "Reviews" },
]

const TAB_COMPONENTS: Record<Tab, JSX.Element> = {
  profile: <ProfileTab />,
  borrowed: <BorrowedTab />,
  reviews: <ReviewsTab />,
}

export default function ProfilePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = (searchParams.get("tab") as Tab) ?? "profile"

  const handleTabChange = (tab: Tab) => {
    setSearchParams({ tab })
  }

  return (
    <div className="px-2 pt-4 pb-10 space-y-7 md:py-3 md:px-10">
      <div className="flex bg-neutral-100 rounded-2xl p-2 md:w-fit">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleTabChange(key)}
            className="flex-1 py-3 rounded-xl text-sm font-bold transition-all md:flex-none md:px-20 md:py-3 md:text-sm"
            style={{
              backgroundColor: activeTab === key ? "white" : "transparent",
              color: activeTab === key ? "var(--primary-600)" : "#535862",
              fontWeight: activeTab === key ? 600 : 400,
              boxShadow: activeTab === key ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {TAB_COMPONENTS[activeTab]}
    </div>
  )
}
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/index'
import { ROUTES } from '@/constants'
import Logo from '@/assets/logo/logo.svg'
import Search from '@/assets/icon/Search.svg'
import Bag from '@/assets/icon/Bag.svg'
import Menubar from '@/assets/icon/Menu.svg'
import AvatarIcon from '@/assets/avatar/avatar.svg'

export default function Navbar() {
  const navigate = useNavigate()
  const { token, user } = useSelector((state: RootState) => state.auth)

  return (
    <nav className="w-full px-4 py-4">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={Logo} width={40} height={40} alt="logo" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(ROUTES.Search)}>
            <img src={Search} alt="search" />
          </button>

          <button onClick={() => navigate(ROUTES.Cart)} className="relative">
            <img src={Bag} alt="checkout" />
          </button>

          {token ? (
            <button onClick={() => navigate(ROUTES.Profile)}>
              {user?.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <img src={AvatarIcon} alt="profile" className="w-8 h-8 rounded-full" />
              )}
            </button>
          ) : (
            <button onClick={() => navigate(ROUTES.Login)}>
              <img src={Menubar} alt="menu" />
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
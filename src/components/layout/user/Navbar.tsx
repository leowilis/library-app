import Logo from "@/assets/logo/logo.svg";
import Search from "@/assets/icon/Search.svg";
import Bag from "@/assets/icon/Bag.svg";
import Menubar from "@/assets/icon/Menu.svg";

export default function Navbar() {
  return (
    <nav className="w-full px-4 py-4">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={Logo} width={40} height={40} alt="logo" />
          <h1 className="hidden text-black font-bold">Booky</h1>
        </div>

        {/* Search | Bag | Menubar icon */}
        <div className="flex items-center gap-4">
          <button><img src={Search} alt="search" /></button>
          <button><img src={Bag} alt="checkout"/></button>
          <button><img src={Menubar} alt="Mobile Menu"/></button>
        </div>
      </div>
    </nav>
  );
}
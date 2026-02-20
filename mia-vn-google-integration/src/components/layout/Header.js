import { BRAND_CONFIG } from "../../config/brand";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="h-14 border-b bg-white px-4 flex items-center justify-between">
      <button
        type="button"
        onClick={toggleSidebar}
        className="px-3 py-1.5 rounded border text-sm font-medium"
      >
        Menu
      </button>
      <h1 className="text-base font-semibold">{BRAND_CONFIG.productName}</h1>
      <div className="w-14" />
    </header>
  );
};

export default Header;

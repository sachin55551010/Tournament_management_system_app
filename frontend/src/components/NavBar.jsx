import { X, Menu } from "lucide-react";
import { useState } from "react";
import { MenuPage } from "./MenuPage";
export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`relative`}>
      <header
        className={`fix z-[100] bg-base-200 h-[var(--nav-h)] flex items-center justify-between px-2 ${
          isMenuOpen ? "" : ""
        }`}
      >
        <div className="flex gap-1 items-center">
          {!isMenuOpen && (
            <Menu strokeWidth={4} onClick={() => setIsMenuOpen(true)} />
          )}

          <div>Logo</div>
        </div>
      </header>
      {isMenuOpen && <MenuPage setIsMenuOpen={setIsMenuOpen} />}
    </div>
  );
};

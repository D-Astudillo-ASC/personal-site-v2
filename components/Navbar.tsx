import NavbarLinksDesktop from "./NavbarLinksDesktop";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <nav className="relative flex items-center">
      <NavbarLinksDesktop />
      <MobileMenu />
    </nav>
  );
}

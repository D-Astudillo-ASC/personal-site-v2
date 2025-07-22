import NavbarLinksDesktop from "./NavbarLinksDesktop";
import MobileMenu from "./MobileMenu";
// import ClientOnly from "./ClientOnly";
import { navLinks } from "@/constants/navigation";

export default function Navbar() {
  return (
    <nav className="relative">
      <NavbarLinksDesktop />
      <div className="md:hidden">
        <MobileMenu navLinks={navLinks} />
      </div>
    </nav>
  );
}

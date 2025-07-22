// "use client";

import { externalLinks } from "@/constants/navigation";
import IconClick from "./IconClick";

export default function Footer() {
  return (
    <footer className="bg-opacity-80 backdrop-blur backdrop-blur fixed bottom-0 left-0 h-16 w-full z-50 shadow-top transition-standard border-t">
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-0">
          {/*TODO: Refactor this...*/}
          <div className="hidden md:flex justify-start"></div>
          <p className="text-xs font-thin text-center order-1 md:order-none">
            © {new Date().getFullYear()} Daniel Astudillo. All rights reserved.
          </p>
          <div className="flex justify-center md:justify-end space-x-6 order-2 md:order-none">
            {externalLinks.map((link) => (
              <IconClick
                key={link.href}
                icon={link.icon!}
                href={link.href}
                label={link.label}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-transparent backdrop-blur-sm z-50 shadow-top transition-shadow duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center">
          <p className="text-xs font-thin">
            © {new Date().getFullYear()} Daniel Astudillo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

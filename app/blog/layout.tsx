import { ReactNode } from "react";

export default function BlogIndexLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center bg-background min-h-screen py-2">
      <div className="w-full px-12 py-12 rounded-2xl shadow-xl border border-border/30">
        {children}
      </div>
    </div>
  );
} 
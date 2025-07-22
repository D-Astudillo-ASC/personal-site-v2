// "use client";

// import { useFont } from "@/app/providers/FontProvider";
// import { ReactNode } from "react";

// export default function FontWrapper({ children }: { children: ReactNode }) {
//   const { font } = useFont();

//   return (
//     <div 
//       className={`
//         ${font === "helvetica" ? "font-helvetica" : "font-mono"}
//         transition-standard
//       `}
//     >
//       {children}
//     </div>
//   );
// } 
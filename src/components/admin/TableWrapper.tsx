// components/TableWrapper.tsx
import { ReactNode } from "react";

export default function TableWrapper({ children }: { children: ReactNode }) {
  return (
    <table className="border-collapse border border-brand-darkgreen w-full">
      {children}
    </table>
  );
}

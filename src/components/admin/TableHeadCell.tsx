import { LuListFilter } from "react-icons/lu";

export function TableHeadCell({
  label,
  withFilter,
}: {
  label: string;
  withFilter?: boolean;
}) {
  return (
    <th className="border-x text-brand-white border-brand-white bg-brand-darkgreen">
      <div className="flex justify-center items-center h-14">
        {label}
        {withFilter && <LuListFilter className="ml-5" />}
      </div>
    </th>
  );
}

import { IoWarningOutline } from "react-icons/io5";

interface WarningBoxProps {
  message: string;
}

export default function WarningBox({ message }: WarningBoxProps) {
  return (
    <div className="flex flex-col justify-center items-center border border-brand-warning bg-brand-warning-light border-2 rounded-lg overflow-hidden w-full p-8 my-8">
      <IoWarningOutline className="w-20 h-20 text-brand-warning" />
      <h2 className="text-xl md:text-2xl text-brand-warning uppercase font-bold my-3">
        Attention !
      </h2>
      <p className="text-lg text-brand-warning uppercase text-center">
        {message}
      </p>
    </div>
  );
}
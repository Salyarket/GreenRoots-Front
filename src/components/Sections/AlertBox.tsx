import { AiFillAlert } from "react-icons/ai";

interface AlertBoxProps {
  message: string;
}

export default function AlertBox({ message }: AlertBoxProps) {
  return (
    <div className="flex flex-col justify-center items-center border border-brand-warning bg-brand-warning-light border-2 rounded-lg overflow-hidden w-full p-8 my-8">
      <AiFillAlert className="w-20 h-20 text-brand-warning" />
      <h2 className="text-xl md:text-2xl text-brand-warning uppercase font-bold my-3">
        point d&apos;attention
      </h2>
      <p className="text-base text-brand-warning uppercase text-center">
        {message}
      </p>
    </div>
  );
}
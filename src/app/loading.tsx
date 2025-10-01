import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        height={20}
        width={20}
        src="/loader-clair.svg"
        alt="Loader GreenRoots"
        className="w-52 h-52 animate-spin"
      />
    </div>
  );
};

export default Loading;

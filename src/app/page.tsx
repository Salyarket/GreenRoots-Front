import Header from "../components/Header";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-brand-white ">
      <Header backgroundTransparent={true} />
      <Header backgroundTransparent={false} />
    </div>
  );
};

export default page;

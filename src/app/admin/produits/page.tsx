import { FaRegEye } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { LuListFilter } from "react-icons/lu";
import { MdOutlineCreate } from "react-icons/md";
import { PiTreeFill } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import { FaBoxOpen } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaDropbox } from "react-icons/fa";

const Page = async () => {
  return (
    <main className="min-h-screen mt-16 px-4 custom-size-minmax">
      <section>
        <h1 className="font-extrabold text-brand-green text-4xl text-center mb-6">
          Vue d'ensemble des produits
        </h1>

        <div className="flex justify-center items-between gap-8">
          <div className="mt-10 h-53 w-80 bg-brand-white rounded-xl p-6 border border-brand-lightgreen/30 shadow-sm text-center">
            <p className="font-extrabold text-brand-green text-4xl mb-3">
              3000
            </p>
            <h3 className="text-base font-semibold text-brand-darkgreen mb-2">
              Total des reférences produits
            </h3>
            <div className="bg-brand-lightgreen/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
              <PiTreeFill className="text-xl md:text-2xl text-brand-darkgreen" />
            </div>
          </div>

          <div>
            <h2 className="font-extrabold text-brand-green text-2xl text-center mb-2">
              Etat des stocks
            </h2>
            <div className="flex gap-4">
              <div className="w-60  bg-brand-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-brand-lightgreen/30 shadow-sm text-center">
                <p className="font-extrabold text-brand-green text-4xl mb-3">
                  300
                </p>
                <h3 className="text-base font-semibold text-brand-darkgreen mb-2">
                  Stock Correcte
                </h3>
                <div className="bg-brand-lightgreen/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <FaBox className="text-xl md:text-2xl text-brand-lightgreen" />
                </div>
              </div>
              <div className="w-60 bg-orange-300/10 rounded-xl md:rounded-2xl p-4 md:p-6 border border-orange-300 shadow-sm text-center">
                <p className="font-extrabold text-orange-400 text-4xl mb-3">
                  12
                </p>
                <h3 className="text-base font-semibold text-orange-600 mb-2">
                  Stocks Faible
                </h3>
                <div className="bg-orange-600/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <FaBoxOpen className="text-xl md:text-2xl text-orange-600" />
                </div>
              </div>
              <div className="w-60 bg-red-300/10 rounded-xl md:rounded-2xl p-4 md:p-6 border border-red-300 shadow-sm text-center">
                <p className="font-extrabold text-red-400 text-4xl mb-3">4</p>
                <h3 className="text-base font-semibold text-red-600 mb-2">
                  Rupture de Stocks
                </h3>
                <div className="bg-red-600/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <FaDropbox className="text-xl md:text-2xl text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="flex justify-between my-10">
          <div className="flex  border border-gray-300 rounded-full overflow-hidden w-full md:w-1/2 cursor-pointer">
            <input
              type="text"
              placeholder="Rechercher un arbre"
              className="flex-1 px-4 py-2 outline-none"
            />
            <button className="bg-brand-green text-white px-4 hover:bg-brand-darkgreen cursor-pointer">
              <Image src={"/search.svg"} width={15} height={15} alt="search" />
            </button>
          </div>
          <Link
            href={"/admin/produits/creation"}
            className="flex items-center px-8 border border border-brand-darkgreen shadow-lg p-2 rounded-lg text-brand-darkgreen hover:bg-brand-lightgreen hover:border-brand-white hover:text-brand-white"
          >
            <MdOutlineCreate className="mr-4" />
            <p>Ajouter un produit</p>
          </Link>
        </div>

        <table className="border-collapse border border-brand-darkgreen w-full">
          <thead>
            <tr className="h-14">
              <th
                scope="col"
                className="border-x text-brand-white border-brand-white bg-brand-darkgreen"
              >
                Id
              </th>
              <th
                scope="col"
                className="border-x text-brand-white border-brand-white bg-brand-darkgreen"
              >
                <div className="flex justify-center items-center h-14">
                  Nom
                  <LuListFilter className="ml-5" />
                </div>
              </th>
              <th
                scope="col"
                className="border-x text-brand-white border-brand-white bg-brand-darkgreen"
              >
                <div className="flex justify-center items-center h-14">
                  Prix
                  <LuListFilter className="ml-5" />
                </div>
              </th>
              <th
                scope="col"
                className="border-x text-brand-white border-brand-white bg-brand-darkgreen"
              >
                <div className="flex justify-center items-center h-14">
                  Stock
                  <LuListFilter className="ml-5" />
                </div>
              </th>
              <th
                scope="col"
                className="border-x text-brand-white border-brand-white bg-brand-darkgreen"
              >
                <div className="flex justify-center items-center h-14">
                  CO2
                  <LuListFilter className="ml-5" />
                </div>
              </th>
              <th
                scope="col"
                className="border-x text-brand-white border-brand-white bg-brand-darkgreen w-45"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-14">
              <th scope="row" className="">
                1
              </th>
              <td className="border border-brand-darkgreen pl-4">Chêne</td>
              <td className="border border-brand-darkgreen text-center">22</td>
              <td className="border border-brand-darkgreen text-center">34</td>
              <td className="border border-brand-darkgreen text-center">200</td>
              <td className="border border-brand-darkgreen">
                <div className="flex justify-center items-center gap-4">
                  <Link
                    href={"/catalogue/1"}
                    className="border border-brand-darkgreen shadow-lg p-2 rounded-lg text-brand-darkgreen hover:bg-brand-lightgreen hover:border-brand-white hover:text-brand-white"
                  >
                    <FaRegEye />
                  </Link>
                  <Link
                    href={"/admin/produits/edition/id"}
                    className="border border-brand-darkgreen shadow-lg p-2 rounded-lg text-brand-darkgreen hover:bg-brand-lightgreen hover:border-brand-white hover:text-brand-white"
                  >
                    <FiEdit3 />
                  </Link>
                  <Link
                    href={"/admin/produits/suppresion/id"}
                    className="border border-red-800 shadow-lg p-2 rounded-lg text-red-800 hover:bg-red-800 hover:border-brand-white hover:text-brand-white"
                  >
                    <MdDeleteOutline />
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Page;

"use client";

import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { LuListFilter } from "react-icons/lu";
import { MdOutlineCreate } from "react-icons/md";
import { PiTreeFill } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import { TbMapOff, TbChristmasTreeOff, TbMapPin2 } from "react-icons/tb";
// import { getlocationsPagination } from "@/services/location.api"
import { Location, PaginatedResponse } from "@/types/index.types";
import useAuthStore from "@/store/AuthStore";


const Page = () => {

    const { user } = useAuthStore();

    console.log(user)

    const [locations, setLocations] = useState<Location[]>([]);
    const [pagination, setPagination] = useState<
        PaginatedResponse<Location>["pagination_State"]
    >({
        total: 0,
        page: 1,
        limit: 3,
        totalPages: 0,
    });
    const [loading, setLoading] = useState(false);

    // Définir fetchData hors des useEffect
    const fetchData = async (page: number, limit = pagination.limit) => {
        console.log(user)
        if (!user?.token) return; // sécurité
        console.log("je ne passe pas dans le return")
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/locations/pagination?page=${page}&limit=${limit}`,
                {
                    cache: "no-store",
                    headers: {
                        Authorization: `Bearer ${user.token}`, // 🔑 on passe le token ici
                    },
                }
            );

            if (!res.ok) throw new Error("Erreur API");

            const data: PaginatedResponse<Location> = await res.json();
            setLocations(data.data);
            setPagination(data.pagination_State);
        } catch (err) {
            console.error(err);
            setLocations([]);
        } finally {
            setLoading(false);
        }
    };

    // Premier rendu (si user + token dispo)
    useEffect(() => {
        if (user?.token) {
            fetchData(1, pagination.limit);
        }
    }, [user, pagination.limit]);

    return (
        <main className="min-h-screen mt-16 px-4 custom-size-minmax">

            <section>

                <h1 className="font-extrabold text-brand-green text-4xl text-center mb-6">Vue d'ensemble des Localisations</h1>

                <div className="flex justify-center items-between gap-8">
                    <div className="mt-10 h-53 w-80 bg-brand-white rounded-xl p-6 border border-brand-lightgreen/30 shadow-sm text-center">
                        <p className="font-extrabold text-brand-green text-4xl mb-3">
                            42
                        </p>
                        <h3 className="text-base font-semibold text-brand-darkgreen mb-2">
                            Total des lieux de plantation
                        </h3>
                        <div className="bg-brand-lightgreen/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                            <PiTreeFill className="text-xl md:text-2xl text-brand-darkgreen" />
                        </div>
                    </div>

                    <div>
                        <h2 className="font-extrabold text-brand-green text-2xl text-center mb-2">Etat des lieux de plantations</h2>
                        <div className="flex gap-4">
                            <div className="w-60  bg-brand-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-brand-lightgreen/30 shadow-sm text-center">
                                <p className="font-extrabold text-brand-green text-4xl mb-3">
                                    38
                                </p>
                                <h3 className="text-base font-semibold text-brand-darkgreen mb-2">
                                    Arbres ayant une zone de plantation
                                </h3>
                                <div className="bg-brand-lightgreen/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                                    <TbMapPin2 className="text-xl md:text-2xl text-brand-lightgreen" />
                                </div>
                            </div>
                            <div className="w-60 bg-orange-300/10 rounded-xl md:rounded-2xl p-4 md:p-6 border border-orange-300 shadow-sm text-center">
                                <p className="font-extrabold text-orange-400 text-4xl mb-3">
                                    1
                                </p>
                                <h3 className="text-base font-semibold text-orange-600 mb-2">
                                    Localisation sans arbre associé
                                </h3>
                                <div className="bg-orange-600/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                                    <TbChristmasTreeOff className="text-xl md:text-2xl text-orange-600" />
                                </div>
                            </div>
                            <div className="w-60 bg-red-300/10 rounded-xl md:rounded-2xl p-4 md:p-6 border border-red-300 shadow-sm text-center">
                                <p className="font-extrabold text-red-400 text-4xl mb-3">
                                    3
                                </p>
                                <h3 className="text-base font-semibold text-red-600 mb-2">
                                    Arbres sans une zone de plantation
                                </h3>
                                <div className="bg-red-600/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                                    <TbMapOff className="text-xl md:text-2xl text-red-600" />
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
                            placeholder="Rechercher un une localisation par son nom"
                            className="flex-1 px-4 py-2 outline-none"
                        />
                        <button className="bg-brand-green text-white px-4 hover:bg-brand-darkgreen cursor-pointer">
                            <Image src={"/search.svg"} width={15} height={15} alt="search" />
                        </button>
                    </div>
                    <Link href={"/admin/localisations/creation"} className="flex items-center px-8 border border border-brand-darkgreen shadow-lg p-2 rounded-lg text-brand-darkgreen hover:bg-brand-lightgreen hover:border-brand-white hover:text-brand-white">
                        <MdOutlineCreate className="mr-4" />
                        <p>Ajouter une localisation</p>
                    </Link>
                </div>

                <table className="border-collapse border border-brand-darkgreen w-full">
                    <thead>
                        <tr className="h-14">
                            <th scope="col" className="border-x text-brand-white border-brand-white bg-brand-darkgreen">Id</th>
                            <th scope="col" className="border-x text-brand-white border-brand-white bg-brand-darkgreen">
                                <div className="flex justify-center items-center h-14">
                                    Nom
                                    <LuListFilter className="ml-5" />
                                </div>
                            </th>
                            <th scope="col" className="border-x text-brand-white border-brand-white bg-brand-darkgreen">
                                <div className="flex justify-center items-center h-14">
                                    Latitude
                                    <LuListFilter className="ml-5" />
                                </div>
                            </th>
                            <th scope="col" className="border-x text-brand-white border-brand-white bg-brand-darkgreen">
                                <div className="flex justify-center items-center h-14">
                                    Longitude
                                    <LuListFilter className="ml-5" />
                                </div>
                            </th>
                            <th scope="col" className="border-x text-brand-white border-brand-white bg-brand-darkgreen">
                                <div className="flex justify-center items-center h-14">
                                    Nb Arbres associés
                                    <LuListFilter className="ml-5" />
                                </div>
                            </th>
                            <th scope="col" className="border-x text-brand-white border-brand-white bg-brand-darkgreen w-45">Action</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        <tr className="h-14">
                            <th scope="row" className="">1</th>
                            <td className="border border-brand-darkgreen pl-4">Terrain Lille</td>
                            <td className="border border-brand-darkgreen text-center">50.6292</td>
                            <td className="border border-brand-darkgreen text-center">3.0573</td>
                            <td className="border border-brand-darkgreen text-center">3</td>
                            <td className="border border-brand-darkgreen">
                                <div className="flex justify-center items-center gap-4">
                                    <Link href={"/admin/localisation/1"} className="border border-brand-darkgreen shadow-lg p-2 rounded-lg text-brand-darkgreen hover:bg-brand-lightgreen hover:border-brand-white hover:text-brand-white">
                                        <FaRegEye />
                                    </Link>
                                    <Link href={"/admin/localisation/edition/id"} className="border border-brand-darkgreen shadow-lg p-2 rounded-lg text-brand-darkgreen hover:bg-brand-lightgreen hover:border-brand-white hover:text-brand-white">
                                        <FiEdit3 />
                                    </Link>
                                    <Link href={"/admin/localisation/suppresion/id"} className="border border-red-800 shadow-lg p-2 rounded-lg text-red-800 hover:bg-red-800 hover:border-brand-white hover:text-brand-white">
                                        <MdDeleteOutline />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    </tbody> */}
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-4">Chargement...</td>
                            </tr>
                        ) : locations.length > 0 ? (
                            locations.map((loc) => (
                                <tr key={loc.id} className="h-14">
                                    <th scope="row">{loc.id}</th>
                                    <td className="border border-brand-darkgreen pl-4">{loc.name}</td>
                                    <td className="border border-brand-darkgreen text-center">{loc.latitude}</td>
                                    <td className="border border-brand-darkgreen text-center">{loc.longitude}</td>
                                    <td className="border border-brand-darkgreen text-center">3</td>
                                    {/* <td className="border border-brand-darkgreen text-center">{loc.nbArbres ?? 0}</td> */}
                                    <td className="border border-brand-darkgreen">
                                        <div className="flex justify-center items-center gap-4">
                                            <Link href={`/admin/localisation/${loc.id}`} className="border border-brand-darkgreen shadow-lg p-2 rounded-lg text-brand-darkgreen hover:bg-brand-lightgreen hover:border-brand-white hover:text-brand-white">
                                                <FaRegEye />
                                            </Link>
                                            <Link href={`/admin/localisation/edition/${loc.id}`} className="border border-brand-darkgreen shadow-lg p-2 rounded-lg text-brand-darkgreen hover:bg-brand-lightgreen hover:border-brand-white hover:text-brand-white">
                                                <FiEdit3 />
                                            </Link>
                                            <Link href={`/admin/localisation/suppresion/${loc.id}`} className="border border-red-800 shadow-lg p-2 rounded-lg text-red-800 hover:bg-red-800 hover:border-brand-white hover:text-brand-white">
                                                <MdDeleteOutline />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4">Aucune donnée</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination
                <div className="flex justify-center items-center gap-4 mt-4">
                    <button
                        disabled={pagination.page <= 1}
                        onClick={() => fetchData(pagination.page - 1)}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50"
                    >
                        ◀ Précédent
                    </button>
                    <span>
                        Page {pagination.page} / {pagination.totalPages}
                    </span>
                    <button
                        disabled={pagination.page >= pagination.totalPages}
                        onClick={() => fetchData(pagination.page + 1)}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50"
                    >
                        Suivant ▶
                    </button>
                </div> */}

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    {/* Select limit */}
                    <div className="flex items-center gap-2">
                        <label htmlFor="limit" className="text-sm">Lignes par page:</label>
                        <select
                            id="limit"
                            value={pagination.limit}
                            onChange={(e) => {
                                const newLimit = parseInt(e.target.value, 10);
                                fetchData(1, newLimit); // reset à la page 1
                            }}
                            className="border rounded px-2 py-1"
                        >
                            <option value={3}>3</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center items-center gap-4">
                        <button
                            disabled={pagination.page <= 1}
                            onClick={() => fetchData(pagination.page - 1)}
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            ◀ Précédent
                        </button>
                        <span>
                            Page {pagination.page} / {pagination.totalPages}
                        </span>
                        <button
                            disabled={pagination.page >= pagination.totalPages}
                            onClick={() => fetchData(pagination.page + 1)}
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Suivant ▶
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Page;
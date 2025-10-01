"use client";

import { useState } from "react";
import Link from "next/link";

const arbresDisponibles = [
    "Chêne",
    "Érable",
    "Sapin",
    "Olivier",
    "Cerisier",
    "Bouleau",
];

const Page = async () => {

    // Modale de selection des arbres à associer à une localisation
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTrees, setSelectedTrees] = useState<string[]>([]);
    const [tempSelection, setTempSelection] = useState<string[]>([]);

    const handleOpen = () => {
        setTempSelection(selectedTrees); // garder les choix existants
        setIsOpen(true);
    };

    const handleClose = () => setIsOpen(false);

    const handleConfirm = () => {
        setSelectedTrees(tempSelection);
        setIsOpen(false);
    };

    const toggleCheckbox = (arbre: string) => {
        if (tempSelection.includes(arbre)) {
            setTempSelection(tempSelection.filter((t) => t !== arbre));
        } else {
            setTempSelection([...tempSelection, arbre]);
        }
    };

    // A faire lorsque le refresh token sera oppérationnel
    // State localisation
    const [location, setLocation] = useState({
        name: "",
        x: 0,
        y: 0,
    });

    // Handlers localisation
    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setLocation((prev) => ({ ...prev, [id]: value }));
    };

    // Submit localisation
    const handleSubmitLocation = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Localisation envoyée :", location);
        //  fetch POST vers /api/locations à mettre dans api.ts
    };

    return (
        <main className="min-h-screen mt-16 px-4 custom-size-minmax">
            <section>
                <div className="space-y-4 md:space-y-6 bg-brand-white rounded-xl p-6 border border-brand-lightgreen/20 mt-10">
                    <h2 className="text-lg font-semibold text-brand-darkgreen">Ajouter et Associer une ou plusieurs localisations</h2>
                    <div className="grid grid-cols-8 gap-4">
                        <h3 className="col-span-3 block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm">Nouvelle localisation</h3>
                        <p className="text-center text-brand-darkgreen font-medium text-sm">Coordonnée X</p>
                        <p className="text-center text-brand-darkgreen font-medium text-sm">Coordonnée Y</p>
                        <p className="col-span-2 text-center text-brand-darkgreen font-medium text-sm">Arbre(s) associé(s)<sup>(optionnel)</sup></p>
                    </div>
                    <form onSubmit={handleSubmitLocation} className="grid grid-cols-8 gap-4 mb-14">
                        <input
                            id="name"
                            type="text"
                            placeholder="Nom de la localisation"
                            value={location.name}
                            onChange={handleLocationChange}
                            className="col-span-3 w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green" />
                        <input
                            id="x"
                            type="number"
                            placeholder="Coordonnée X, exemple : 41.40338"
                            value={location.x}
                            onChange={handleLocationChange}
                            className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green" />
                        <input
                            id="y"
                            type="number"
                            placeholder="Coordonnée Y, exemple : 2.17403"
                            value={location.y}
                            onChange={handleLocationChange}
                            className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green" />
                        <div className="flex w-full col-span-2 pr-4">
                            {/* Bouton d'ouverture de la modale de selection */}
                            <button
                                onClick={handleOpen}
                                className="px-4 mr-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Choisir
                            </button>

                            {/* Arbres sélectionnés */}
                            {selectedTrees.length > 0 && (
                                <div className="flex flex-wrap flex w-full items-center gap-2">
                                    {selectedTrees.map((tree, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                                        >
                                            {tree}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Modale */}
                            {isOpen && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                                    <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
                                        <h2 className="text-lg font-semibold mb-4">Sélectionne des arbres</h2>

                                        <div className="space-y-2 max-h-60 overflow-y-auto">
                                            {arbresDisponibles.map((arbre, index) => (
                                                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelection.includes(arbre)}
                                                        onChange={() => toggleCheckbox(arbre)}
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                                    />
                                                    <span>{arbre}</span>
                                                </label>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-4 flex justify-end gap-3">
                                            <button
                                                onClick={handleClose}
                                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                onClick={handleConfirm}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                            >
                                                Valider
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button type="submit" className="cursor-pointer col-start-8 bg-brand-green hover:bg-brand-lightgreen text-white px-4 py-2 rounded-lg">Ajouter & associer</button>
                    </form>

                    {/* Apparait seulement quand l'on ajoute des localisations */}
                    <div className="grid grid-cols-8 gap-4">
                        <h3 className="col-span-3 block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm">Localisations ajoutées</h3>
                        <p className="text-center text-brand-darkgreen font-medium text-sm">Coordonnée X</p>
                        <p className="text-center text-brand-darkgreen font-medium text-sm">Coordonnée Y</p>
                    </div>
                    <form onSubmit={handleSubmitLocation} className="grid grid-cols-8 gap-4">
                        <p className="col-span-3 w-full flex items-center pl-3"> La vallé des anges</p>
                        <p className="w-full flex items-center justify-center">41.40338</p>
                        <p className="w-full flex items-center justify-center">2.17403</p>
                        <div className="col-span-2 gap-2 w-full flex items-center justify-center">
                            <p className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Chêne</p>
                            <p className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Sapin</p>
                            <p className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Cerisier</p>
                        </div>
                        <button type="submit"
                            className="cursor-pointer col-start-8 bg-brand-warning hover:bg-red-800 text-white px-4 py-2 rounded-lg">
                            Supprimer
                        </button>
                    </form>
                </div>
            </section>
        </main >
    );
};

export default Page;
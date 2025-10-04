"use client";

import { useState, useEffect } from "react";
import { createLocation, createProductLocationLink, deleteLocation, deleteProductLocationLink } from "@/services/location.api";
import { getAllProducts } from "@/services/product.api"


const Page = () => {

    interface Tree {
        id: number;
        name: string;
    }

    const [arbresDisponibles, setArbresDisponibles] = useState<Tree[]>([]);

    useEffect(() => {
        const fetchTrees = async () => {
            try {
                const allTrees = await getAllProducts();
                console.log("Produits reçus depuis API :", allTrees);

                // Tri par ordre alphabétique sur le nom
                allTrees.sort((a: any, b: any) => a.name.localeCompare(b.name));

                setArbresDisponibles(allTrees);
            } catch (err) {
                console.error("Erreur en récupérant les arbres :", err);
            }
        };

        fetchTrees();
    }, []);

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


    const [locations, setLocations] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Création de la localisation
            console.log("Données envoyées à createLocation :", {
                name,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            });
            const newLoc = await createLocation({
                name,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            });

            // 2️⃣ Création des liens produits <-> localisation
            // Parcours tous les arbres sélectionnés
            await Promise.all(
                selectedTrees.map(async (treeName) => {
                    const tree = arbresDisponibles.find((t) => t.name === treeName);
                    console.log("Tentative de création de lien :", {
                        locId: newLoc.id,
                        productId: tree?.id,
                        tree,
                    });
                    if (tree) {
                        await createProductLocationLink(newLoc.id.toString(), {
                            product_id: tree.id,
                        });
                        console.log(`Lien créé entre ${tree.name} et ${newLoc.name}`);
                    }
                })
            );

            // Ajoute la localisation à la liste des localisation tout juste ajouté
            setLocations((prev) => [
                ...prev,
                {
                    id: newLoc.id,
                    name: newLoc.name,
                    latitude: newLoc.latitude,
                    longitude: newLoc.longitude,
                    trees: selectedTrees, // Stocke les arbres liés ici
                },
            ]);

            // Vider les champs input
            setName("");
            setLatitude("");
            setLongitude("");
            setSelectedTrees([]);
            setTempSelection([]);
        } catch (err) {
            console.error("Erreur lors de la création ❌", err);
        }
    };



    // Supression des localisations qui viennent d'être ajoutés
    const handleDelete = async (id: string) => {
        try {
            // Trouver la localisation à supprimer dans ton state local
            const locToDelete = locations.find((loc) => loc.id === id);

            if (!locToDelete) {
                console.warn("Localisation introuvable pour suppression");
                return;
            }

            // Supprimer toutes les liaisons produits ↔ localisation
            if (locToDelete.trees && locToDelete.trees.length > 0) {
                await Promise.all(
                    locToDelete.trees.map(async (treeName: string) => {
                        const tree = arbresDisponibles.find((t) => t.name === treeName);
                        if (tree) {
                            await deleteProductLocationLink(id, tree.id);
                            console.log(`Liaison supprimée entre ${tree.name} et ${locToDelete.name}`);
                        }
                    })
                );
            }

            // Puis supprimer la localisation elle-même
            await deleteLocation(id);

            // Mettre à jour le state front
            setLocations((prev) => prev.filter((loc) => loc.id !== id));

            console.log("Localisation supprimée ✅", id);
        } catch (err) {
            console.error("Erreur lors de la suppression ❌", err);
        }
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
                    <form onSubmit={handleSubmit} className="grid grid-cols-8 gap-4 mb-14">
                        <input
                            id="name"
                            type="text"
                            placeholder="Nom de la localisation"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3 w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green" />
                        <input
                            id="x"
                            type="number"
                            placeholder="Coordonnée X, exemple : 41.40338"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green" />
                        <input
                            id="y"
                            type="number"
                            placeholder="Coordonnée Y, exemple : 2.17403"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green" />
                        <div className="flex w-full col-span-2 pr-4">
                            {/* Bouton d'ouverture de la modale de selection */}
                            <button
                                type="button"
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
                                                <label key={arbre.id ?? index} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelection.includes(arbre.name)}
                                                        onChange={() => toggleCheckbox(arbre.name)}
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                                    />
                                                    <span>{arbre.name}</span>
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
                    {locations.length > 0 && (
                        <>
                            <div className="grid grid-cols-8 gap-4">
                                <h3 className="col-span-3 block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm">
                                    Localisations ajoutées
                                </h3>
                                <p className="text-center text-brand-darkgreen font-medium text-sm">Coordonnée X</p>
                                <p className="text-center text-brand-darkgreen font-medium text-sm">Coordonnée Y</p>
                            </div>

                            {locations.map((loc, index) => (
                                <form key={index} className="grid grid-cols-8 gap-4">
                                    <p className="col-span-3 w-full flex items-center pl-3">{loc.name}</p>
                                    <p className="w-full flex items-center justify-center">{loc.latitude}</p>
                                    <p className="w-full flex items-center justify-center">{loc.longitude}</p>

                                    <div className="col-span-2 w-full flex flex-wrap items-center justify-start gap-2">
                                        {(loc.trees || []).map((tree: string, i: number) => (
                                            <p
                                                key={i}
                                                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                                            >
                                                {tree}
                                            </p>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        data-info={loc.id}
                                        onClick={() => handleDelete(loc.id)}
                                        className="cursor-pointer col-start-8 bg-brand-warning hover:bg-red-800 text-white px-4 py-2 rounded-lg"
                                    >
                                        Supprimer
                                    </button>
                                </form>
                            ))}
                        </>
                    )}
                </div>
            </section>
        </main >
    );
};

export default Page;
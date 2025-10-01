"use client";

import { useState } from "react";
import Link from "next/link";

const Page = async () => {

// Gestion des images
    const [images, setImages] = useState<File[]>([]);

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const newFiles = Array.from(e.target.files);

        // Fusionner avec les images déjà sélectionnées
        const updated = [...images, ...newFiles];

        // Limiter à 3 max
        setImages(updated.slice(0, 3));
    };

    // Supprimer une image par index
    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
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
            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
                <Link
                    href="./"
                    className="inline-flex items-center text-brand-lightgreen hover:text-brand-darkgreen transition-colors mb-3 md:mb-4 text-xs md:text-sm font-medium"
                >
                    ← Retour aux produits
                </Link>
                <h1 className="text-lg md:text-2xl text-brand-darkgreen font-bold">
                    Ajouter un nouvel arbre
                </h1>
            </div>
            <section className="mx-auto mb-20">
                <form className="space-y-4 md:space-y-6">
                    <div className="flex justify-between gap-4">
                        <div className="bg-brand-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-brand-lightgreen/20 w-full">
                            <h2 className="text-base md:text-lg font-semibold text-brand-darkgreen mb-3 md:mb-4 pb-2 md:pb-3 border-b border-brand-lightgreen/10">
                                Informations produit
                            </h2>


                            <div className="space-y-3 md:space-y-4">
                                <label htmlFor="name" className="block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm">
                                    Nom
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                                    placeholder="Nom du produit"
                                />


                                <label htmlFor="scientificName" className="block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm">
                                    Nom scientifique
                                </label>
                                <input
                                    id="scientificName"
                                    type="text"
                                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                                    placeholder="Nom scientifique du produit"
                                />


                                <label htmlFor="description" className="block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                                    placeholder="Décrivez le produit"
                                />
                            </div>
                        </div>

                        <div className="bg-brand-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-brand-lightgreen/20 w-full">
                            <h2 className="text-base md:text-lg font-semibold text-brand-darkgreen mb-3 md:mb-4 pb-2 md:pb-3 border-b border-brand-lightgreen/10">
                                Caractéristiques
                            </h2>


                            <div className="space-y-3 md:space-y-4">
                                <label htmlFor="carbon" className="block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm">
                                    Carbone (g)
                                </label>
                                <input
                                    id="carbon"
                                    type="number"
                                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                                    placeholder="Valeur carbone"
                                />


                                <label htmlFor="price" className="block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm">
                                    Prix (€)
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                                    placeholder="Prix du produit"
                                />


                                <label htmlFor="stock" className="block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm">
                                    Stock
                                </label>
                                <input
                                    id="stock"
                                    type="number"
                                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                                    placeholder="Quantité en stock"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <div className="grid grid-cols-4 gap-8 mt-3">
                            <div className="flex flex-col items-center justify-center">
                                <label
                                    htmlFor="images"
                                    className="cursor-pointer block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm"
                                >
                                    Ajouter des images
                                </label>
                                <input
                                    id="images"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    disabled={images.length >= 3}
                                    onChange={handleImagesChange}
                                    className="cursor-pointer w-full text-sm text-brand-darkgreen file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-lightgreen/10 file:text-brand-darkgreen hover:file:bg-brand-lightgreen/20"
                                />
                            </div>
                            {/* Aperçu des images */}
                            {images.map((file, index) => (
                                <div
                                    key={index}
                                    className="relative max-w-[400px] aspect-square rounded-lg border border-brand-lightgreen/30 overflow-hidden flex items-center justify-center bg-gray-50"
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`preview-${index}`}
                                        className="object-cover w-full h-full"
                                    />
                                    {/* Bouton de suppression */}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            {/* Si moins de 3 images, on garde des box vides */}
                            {Array.from({ length: 3 - images.length }).map((_, i) => (
                                <div
                                    key={`empty-${i}`}
                                    className="max-w-[400px] aspect-square rounded-lg border border-dashed border-brand-lightgreen/30 flex items-center justify-center text-xs text-brand-lightgreen"
                                >
                                    Vide
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center sm:flex-row gap-5 pt-3 md:pt-4">
                        <Link
                            href="./"
                            className="order-2 sm:order-1 text-center border border-brand-lightgreen/30 text-brand-darkgreen hover:bg-brand-lightgreen/5 font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg text-xs md:text-sm"
                        >
                            Annuler
                        </Link>
                        <button
                            type="submit"
                            className="cursor-pointer order-1 sm:order-2 bg-brand-green hover:bg-brand-darkgreen text-white font-semibold py-2 md:py-3 px-4 md:px-10 rounded-lg text-xs md:text-sm"
                        >
                            Ajouter un arbre
                        </button>
                    </div>
                </form>


                {/* Attention cette partie doit être disponible que lorsque l'arbre aura été créé */}
                <div className="space-y-4 md:space-y-6 bg-brand-white rounded-xl p-6 border border-brand-lightgreen/20 mt-10">
                    <h2 className="text-lg font-semibold text-brand-darkgreen">Ajouter et Associer une ou plusieurs localisations <sup>(optionnel)</sup></h2>
                    <div className="grid grid-cols-8 gap-4">
                        <h3 className="col-span-4 block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm">Nouvelle localisation</h3>
                        <p className="text-center text-brand-darkgreen font-medium text-sm">Coordonnée X</p>
                        <p className="text-center text-brand-darkgreen font-medium text-sm">Coordonnée Y</p>
                    </div>
                    <form onSubmit={handleSubmitLocation} className="grid grid-cols-8 gap-4 mb-14">
                        <input
                            id="name"
                            type="text"
                            placeholder="Nom de la localisation"
                            value={location.name}
                            onChange={handleLocationChange}
                            className="col-span-4 w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green" />
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
                        <button type="submit" className="cursor-pointer col-start-8 bg-brand-green hover:bg-brand-lightgreen text-white px-4 py-2 rounded-lg">Ajouter & associer</button>
                    </form>

                    <div className="grid grid-cols-8 gap-4">
                        <h3 className="col-span-4 block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm">Localisation existante</h3>
                        <p className="text-center text-brand-darkgreen font-medium text-sm">Coordonnée X</p>
                        <p className="text-center text-brand-darkgreen font-medium text-sm">Coordonnée Y</p>
                    </div>
                    <form onSubmit={handleSubmitLocation} className="grid grid-cols-8 gap-4 mb-14">
                        <div className="relative col-span-4 w-full">
                            {/* impossible de styliser plus le select (affichage des options) sans utiliser une lib extern comme shadcn/ui */}
                            <select
                                name="location-exist"
                                id="location-select"
                                className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-green appearance-none cursor-pointer">
                                <option value="">Choisissez une localisation</option>
                                <option value="dog">Bois de Chambord</option>
                                <option value="cat">Rambouillet</option>
                                <option value="hamster">Massif des alpes</option>
                            </select>
                            <span
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                ▼
                            </span>
                        </div>
                        <p className="w-full flex items-center justify-center">41.40338 </p>
                        <p className="w-full flex items-center justify-center">2.17403 </p>
                        <button type="submit" className="cursor-pointer col-start-8 bg-brand-green hover:bg-brand-lightgreen text-white px-4 py-2 rounded-lg">Associer</button>
                    </form>
                    <div className="grid grid-cols-8 gap-4">
                        <h3 className="col-span-4 block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm">Localisations associées à votre arbre</h3>
                        <p className="text-center text-brand-darkgreen font-medium text-sm">Coordonnée X</p>
                        <p className="text-center text-brand-darkgreen font-medium text-sm">Coordonnée Y</p>
                    </div>
                    <form onSubmit={handleSubmitLocation} className="grid grid-cols-8 gap-4">
                        <p className="col-span-4 w-full flex items-center pl-3"> La vallé des anges</p>
                        <p className="w-full flex items-center justify-center">41.40338</p>
                        <p className="w-full flex items-center justify-center">2.17403</p>
                        <button type="submit"
                            className="cursor-pointer col-start-8 bg-brand-warning hover:bg-red-800 text-white px-4 py-2 rounded-lg">
                            Dissocier
                        </button>
                    </form>
                </div>
            </section>
        </main >
    );
};

export default Page;
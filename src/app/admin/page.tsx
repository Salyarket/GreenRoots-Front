"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; //composants ui prêts à l'emploi (mise en page, style)
import { Button } from "@/components/ui/button"; //composants ui aussi
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"; //biblio de graphiques
import { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { FaBox, FaBoxOpen, FaUserPlus, FaRegEye } from "react-icons/fa";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import useAuthStore from "@/store/AuthStore";
import { getAllOrdersAdmin } from "@/services/order.api";
import { IOrder } from "@/types/index.types";

// données du BarChart des ventes
const salesData = [
  { year: "2019", ventes: 4210, retour: 827 }, //sur l'axe X, on aura les années
  { year: "2020", ventes: 5145, retour: 100 },
  { year: "2021", ventes: 5982, retour: 150 },
  { year: "2022", ventes: 6253, retour: 80 },
  { year: "2023", ventes: 6329, retour: 200 },
];

// données du PieChart = top produits
const topProducts = [
  { name: "ÉRABLE SYCOMORE", value: 727 },
  { name: "TILLEUL", value: 526 },
  { name: "CHÊNE PÉDONCULÉ", value: 352 },
  { name: "CHÂTAIGNIER", value: 128 },
];
const COLORS = [
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export default function Page() {
  const { user } = useAuthStore();
  const [latestOrders, setLatestOrders] = useState<IOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const token = user?.token;
    if (!token) {
      setOrdersLoading(false);
      return;
    }

    const fetchLatest = async () => {
      try {
        setOrdersLoading(true);
        setOrdersError(null);
        const allOrders = await getAllOrdersAdmin(token);
        const sorted = [...allOrders].sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
        if (!cancelled) {
          setLatestOrders(sorted.slice(0, 5));
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Erreur récupération commandes admin:", err);
          setOrdersError("Impossible de charger les commandes.");
          setLatestOrders([]);
        }
      } finally {
        if (!cancelled) {
          setOrdersLoading(false);
        }
      }
    };

    fetchLatest();
    return () => {
      cancelled = true;
    };
  }, [user?.token]);

  const formatStatus = (status: string) => {
    const value = status?.toLowerCase();
    if (value === "paid") return "Paid";
    if (value === "pending") return "Pending";
    if (value === "cancelled") return "Cancelled";
    return status;
  };

  const statusClass = (status: string) => {
    const value = status?.toLowerCase();
    if (value === "paid") return "text-green-600";
    if (value === "pending") return "text-yellow-600";
    if (value === "cancelled") return "text-red-600";
    return "text-gray-600";
  };

  return (
    <main className="min-h-screen mt-40 px-6 custom-size-minmax">
      {/* Section bienvenue */}
      <section className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-green">
          Bienvenue dans le tableau de bord Administrateur
        </h2>
        <nav className="mt-4 flex justify-center gap-6 text-brand-lightgreen font-medium">
          <Link
            href="/admin/utilisateurs"
            className="flex items-center mb-3 mt-7 text-brand-lightgreen"
          >
            Gestion des utilisateurs
          </Link>
          <Link
            href="/admin/commandes"
            className="flex items-center mb-3 mt-7 text-brand-lightgreen"
          >
            Gestion des commandes
          </Link>
          <Link
            href="/admin/produits"
            className="flex items-center mb-3 mt-7 text-brand-lightgreen"
          >
            Gestion des produits
          </Link>
          <Link
            href="/admin/localisations"
            className="flex items-center mb-3 mt-7 text-brand-lightgreen"
          >
            Gestion des localisations
          </Link>
        </nav>
      </section>

      {/* Carte des stat, Card vient de shadcn pr la structure & le style. */}
      <section className="flex flex-row gap-6 mb-10">
        <div className="flex-1 basis-full md:basis-1/2 lg:basis-1/4">
          <Card className="h-full custom-card-hover border border-brand-darkgreen/15 shadow-sm rounded-2xl">
            {/* CardContent c'est l'intérieur de la carte */}
            <CardContent className="flex flex-col items-center justify-center p-6">
              {/* text-muted-foreground, bg-muted sont les couleurs du thème liées aux variables css  */}
              <p className="text-muted-foreground mb-2">TOTAL COMMANDES</p>
              <h3 className="text-2xl font-bold">5 143</h3>
              <div className="bg-muted rounded-full w-14 h-14 flex items-center justify-center mt-4">
                <FaBox className="text-xl text-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4">
          <Card className="h-full custom-card-hover border border-brand-darkgreen/15 shadow-sm rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="text-muted-foreground mb-2">VISITES DU SITE</p>
              <h3 className="text-2xl font-bold">28 298</h3>
              <div className="bg-muted rounded-full w-14 h-14 flex items-center justify-center mt-4">
                <FaMagnifyingGlassChart className="text-xl text-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4">
          <Card className="h-full custom-card-hover border border-brand-darkgreen/15 shadow-sm rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="text-muted-foreground mb-2">NOUVEAUX MEMBRES</p>
              <h3 className="text-2xl font-bold">149</h3>
              <div className="bg-muted rounded-full w-14 h-14 flex items-center justify-center mt-4">
                <FaUserPlus className="text-xl text-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4">
          <Card className="h-full custom-card-hover border border-brand-darkgreen/15 shadow-sm rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="text-muted-foreground mb-2">
                PRODUITS INDISPONIBLES
              </p>
              <h3 className="text-2xl font-bold">23</h3>
              <div className="bg-muted rounded-full w-14 h-14 flex items-center justify-center mt-4">
                <FaBoxOpen className="text-xl text-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Graphiques */}
      <section className="flex flex-row gap-6 mb-10">
        <div className="basis-full md:basis-1/2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Suivi des ventes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  {/* salesData récup les données des ventes */}
                  <BarChart width={400} height={250} data={salesData}>
                    {/* axe horizontal */}
                    <XAxis dataKey="year" />
                    {/* axe vertical */}
                    <YAxis />
                    {/* bulle d'info au survol */}
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="ventes"
                      fill="var(--chart-2)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="retour"
                      fill="var(--chart-4)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="basis-full md:basis-1/2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Top Produits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  {/* PieChart c'est le camembert */}
                  <PieChart width={400} height={250}>
                    {/* Pie c'est la série, data les parts, innerRadius c'est le trou au centre, dataKey la propriété qui indique la taille des parts */}
                    <Pie
                      data={topProducts}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {/* on fait un Map sur les éléments pour créer une cellule par produit et donner une couleur */}
                      {topProducts.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Dernières commandes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Dernières commandes</CardTitle>
          <Link href="/admin/commandes">
            <Button>Voir toutes les commandes</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {/* on crée le tableau table avec tr = table row (ligne),th = table header (cellule d'en-tête, titre de colonne ou ligne), td = table data (cellule) */}
          <table className="w-full border-collapse">
            {/* on regroupe les lignes en parties, thead pour l'en-tête, tbody pour le corps */}
            <thead>
              <tr className="bg-primary text-primary-foreground text-left">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Utilisateur</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {ordersLoading ? (
                <tr className="border-t">
                  <td className="px-4 py-3 text-gray-500" colSpan={6}>
                    Chargement des commandes...
                  </td>
                </tr>
              ) : ordersError ? (
                <tr className="border-t">
                  <td className="px-4 py-3 text-red-600" colSpan={6}>
                    {ordersError}
                  </td>
                </tr>
              ) : latestOrders.length === 0 ? (
                <tr className="border-t">
                  <td className="px-4 py-3 text-gray-500" colSpan={6}>
                    Aucune commande trouvée.
                  </td>
                </tr>
              ) : (
                latestOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="px-4 py-3">#{order.id}</td>
                    <td className="px-4 py-3">
                      {new Date(order.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 py-3">
                      {order.user?.firstname} {order.user?.lastname}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${statusClass(
                        order.status
                      )}`}
                    >
                      {formatStatus(order.status)}
                    </td>
                    <td className="px-4 py-3">{order.total}€</td>
                    <td className="px-4 py-3 w-[150px]">
                      <div className="flex justify-start gap-4">
                        <Link
                          href={`/admin/commandes/${order.id}`}
                          className="border border-brand-darkgreen shadow-lg p-2 rounded-lg text-brand-darkgreen hover:bg-brand-lightgreen hover:border-brand-white hover:text-brand-white"
                        >
                          <FaRegEye />
                        </Link>
                        <Link
                          href={`/admin/commandes/modification/${order.id}`}
                          className="border border-red-800 shadow-lg p-2 rounded-lg text-red-800 hover:bg-red-800 hover:border-brand-white hover:text-brand-white"
                        >
                          <FiEdit3 />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  );
}

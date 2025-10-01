
//const Page = async () => {

    //return (
        //<main className="min-h-screen mt-16 px-4 custom-size-minmax">
            //<div>Bonjour Admin</div>
            //<Link href={"/admin/utilisateurs"} className="flex items-center mb-10 text-brand-lightgreen">
              //  Gestion des utilisateurs
            //</Link>
            //<Link href={"/admin/commandes"} className="flex items-center mb-10 text-brand-lightgreen">
                //Gestion des commandes
            //</Link>
            //<Link href={"/admin/produits"} className="flex items-center mb-10 text-brand-lightgreen">
               // Gestion des produits
            //</Link>
       // </main>
    //);
//};

//export default Page;

"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; //composants ui prêts à l'emploi (mise en page, style)
import { Button } from "@/components/ui/button"; //composants ui aussi
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"; //biblio de graphiques
import { FiEdit3 } from "react-icons/fi";
import { FaBox, FaBoxOpen, FaUserPlus } from "react-icons/fa";
import { FaMagnifyingGlassChart } from 'react-icons/fa6';

// données du BarChart des ventes
const salesData = [
  { year: "2019", ventes: 400, retour: 120 }, //sur l'axe X, on aura les années
  { year: "2020", ventes: 300, retour: 100 },
  { year: "2021", ventes: 500, retour: 150 },
  { year: "2022", ventes: 250, retour: 80 },
  { year: "2023", ventes: 600, retour: 200 },
];

// données du PieChart = top produits
const topProducts = [
  { name: "ÉRABLE SYCOMORE", value: 40 },
  { name: "TILLEUL", value: 30 },
  { name: "CHÊNE PÉDONCULÉ", value: 20 },
  { name: "CHÂTAIGNIER", value: 10 },
];
const COLORS = ["var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

// données des dernières commandes
const orders = [
  { id: "#12345", date: "10/09/2025", user: "Billie A.", total: "79,99€" },
  { id: "#12344", date: "08/09/2025", user: "Lina H.", total: "69,99€" },
  { id: "#12343", date: "08/09/2025", user: "San K.", total: "120,99€" },
  { id: "#12342", date: "07/09/2025", user: "Mathieu B.", total: "32,99€" },
  { id: "#12341", date: "07/09/2025", user: "Sarah T.", total: "69,99€" },
];

export default function Page() {
  return (
        <main className="min-h-screen mt-16 px-6 custom-size-minmax">
      {/* Section bienvenue */}
      <section className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-green">Bienvenue dans le tableau de bord Administrateur</h2>
        <nav className="mt-4 flex justify-center gap-6 text-brand-lightgreen font-medium">
          <Link href="/admin/utilisateurs" className="flex items-center mb-3 mt-7 text-brand-lightgreen">
            Gestion des utilisateurs
          </Link>
          <Link href="/admin/commandes" className="flex items-center mb-3 mt-7 text-brand-lightgreen">
            Gestion des commandes
          </Link>
          <Link href="/admin/produits" className="flex items-center mb-3 mt-7 text-brand-lightgreen">
            Gestion des produits
          </Link>
        </nav>
      </section>

      {/* Carte des stat, Card vient de shadcn pr la structure & le style. */}
      <section className="flex flex-wrap gap-6 mb-10">
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
            <h3 className="text-2xl font-bold">8 200</h3>
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
            <h3 className="text-2xl font-bold">140</h3>
            <div className="bg-muted rounded-full w-14 h-14 flex items-center justify-center mt-4">
              <FaUserPlus className="text-xl text-foreground" />
            </div>
          </CardContent>
        </Card>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4">
        <Card className="h-full custom-card-hover border border-brand-darkgreen/15 shadow-sm rounded-2xl">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-muted-foreground mb-2">PRODUITS INDISPONIBLES</p>
            <h3 className="text-2xl font-bold">23</h3>
            <div className="bg-muted rounded-full w-14 h-14 flex items-center justify-center mt-4">
              <FaBoxOpen className="text-xl text-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      </section>

      {/* Graphiques */}
      <section className="flex flex-wrap gap-6 mb-10">
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
              <Bar dataKey="ventes" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="retour" fill="var(--chart-4)" radius={[4, 4, 0, 0]} />
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
              {/* on fait un Map pour générer une ligne par commande */}
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">{order.user}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">Payée</td>
                  <td className="px-4 py-3">{order.total}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={"/admin/commandes/" + order.id}
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <FiEdit3 />
                      Modifier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  );
}
// cette page sera automatiquement rendu au client si il demande une URL qui ne match aucune route

export default function Custom404() {
  return (
    <main className="flex md:text-2xl items-center justify-center m-4 min-h-[50vh]">
      <h2>🌲404 vous etes perdus dans la forêt 🌲</h2>
    </main>
  );
}

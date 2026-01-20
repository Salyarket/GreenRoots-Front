export const CounterSection = () => {
  // Simule une valeur récupérée de l'api
  const arbresVendus = 114496;

  //   padStart permet d'ajouter le 0 au début si ce n'est pas un chiffre au dessus de 0
  const digits = arbresVendus.toString().padStart(7, "0").split("");

  return (
    <section className=" py-16 text-black text-center font-extrabold select-none">
      <h3 className="uppercase text-xl md:text-2xl mb-6">
        Ensemble, nous avons déjà planté :
      </h3>

      <div className="flex justify-center gap-2 md:gap-4">
        {digits.map((digit, index) => (
          <NumberItem key={index} digit={digit} />
        ))}
      </div>

      <h3 className="uppercase text-xl md:text-2xl  mt-6">arbres</h3>
    </section>
  );
};
interface NumberItemProps {
  digit: string;
}

export const NumberItem = ({ digit }: NumberItemProps) => {
  return (
    <div className="bg-brand-lightgreen text-white text-xl md:text-7xl p-2 md:p-4 rounded-md shadow-md">
      {digit}
    </div>
  );
};

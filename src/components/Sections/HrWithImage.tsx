interface IconWithStrokeProps {
  icon: React.ElementType; // pour accepter n'importe quel composant SVG / React icon
  className?: string;      // optionnel pour ajouter des styles supplémentaires
}

const IconWithStroke: React.FC<IconWithStrokeProps> = ({ icon: Icon, className = "" }) => {
  return (
    <div className={`flex justify-center mb-8 mt-12 hr-img-stroke relative ${className}`}>
      <Icon className="w-14 h-14 text-brand-darkgreen" />
    </div>
  );
};

export default IconWithStroke;
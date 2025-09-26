const isLogin = "...";

const AuthForm = ({ isLogin = true }) => {
  return (
    <form className="flex flex-col gap-4">
      {!isLogin && (
        <>
          {/* Nom/Prénom - uniquement pour register */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label
                htmlFor="firstname"
                className="block text-brand-darkgreen font-medium mb-1 text-sm"
              >
                Prénom
              </label>
              <input
                id="firstname"
                type="text"
                placeholder="Votre prénom"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-brand-lightgreen/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green text-sm sm:text-base"
                required
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="lastname"
                className="block text-brand-darkgreen font-medium mb-1 text-sm"
              >
                Nom
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Votre nom"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-brand-lightgreen/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green text-sm sm:text-base"
                required
              />
            </div>
          </div>
        </>
      )}

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-brand-darkgreen font-medium mb-1 text-sm"
        >
          Adresse e-mail
        </label>
        <input
          id="email"
          type="email"
          placeholder="exemple@email.com"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-brand-lightgreen/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green text-sm sm:text-base"
          required
        />
      </div>

      {/* Mot de passe */}
      <div>
        <label
          htmlFor="password"
          className="block text-brand-darkgreen font-medium mb-1 text-sm"
        >
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          placeholder="Votre mot de passe"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-brand-lightgreen/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green text-sm sm:text-base"
          required
        />
        <p className="text-xs text-brand-lightgreen mt-1">
          {isLogin ? "" : "Au moins 8 caractères requis"}
        </p>
      </div>

      {!isLogin && (
        <>
          {/* Confirmation mot de passe - uniquement pour register*/}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-brand-darkgreen font-medium mb-1 text-sm"
            >
              Confirmation du mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirmez votre mot de passe"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-brand-lightgreen/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green text-sm sm:text-base"
              required
            />
          </div>

          {/* Type de compte - uniquement pour register */}
          <div>
            <label
              htmlFor="accountType"
              className="block text-brand-darkgreen font-medium mb-1 text-sm"
            >
              Type de compte
            </label>
            <select
              id="accountType"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-brand-lightgreen/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green text-sm sm:text-base bg-brand-white"
            >
              <option value="">Sélectionnez votre profil</option>
              <option value="professional">Professionnel</option>
              <option value="individual">Particulier</option>
              <option value="association">Association</option>
              <option value="company">Entreprise</option>
              <option value="entrepreneur">Auto-entrepreneur</option>
            </select>
          </div>
        </>
      )}

      {/* Bouton - adapter le texte pour register ou login */}
      <button
        type="submit"
        className="w-full bg-brand-green hover:bg-brand-darkgreen text-white font-semibold py-2 sm:py-3 px-6 rounded-lg transition-colors durantion-200 text-sm sm:text-base"
      >
        {isLogin ? "Se connecter" : "Créer mon compte GreenRoots"}
      </button>
    </form>
  );
};

export default AuthForm;

// Constantes
const MAX_LIVES = 3;
const LIVES_STORAGE_KEY = "fishgame_lives";
const LIVES_RESET_KEY = "fishgame_last_reset";

// Vérifier si les vies doivent être réinitialisées (chaque jour à minuit)
const shouldResetLives = (): boolean => {
  const now = new Date();
  const lastReset = new Date(localStorage.getItem(LIVES_RESET_KEY) || 0);

  // Vérifier si c'est un nouveau jour (différentes dates)
  return (
    now.getDate() !== lastReset.getDate() ||
    now.getMonth() !== lastReset.getMonth() ||
    now.getFullYear() !== lastReset.getFullYear()
  );
};

// Charger les données des vies
export const loadLives = (): number => {
  try {
    // Vérifier si on doit réinitialiser
    if (shouldResetLives()) {
      resetLives();
      return MAX_LIVES;
    }

    // Sinon, charger les vies restantes
    const livesData = localStorage.getItem(LIVES_STORAGE_KEY);
    if (livesData) {
      return parseInt(livesData, 10);
    }

    // Par défaut, retourner le maximum de vies
    return MAX_LIVES;
  } catch (error) {
    console.error("Error loading lives:", error);
    return MAX_LIVES;
  }
};

// Réinitialiser les vies à leur maximum
export const resetLives = (): void => {
  try {
    localStorage.setItem(LIVES_STORAGE_KEY, MAX_LIVES.toString());
    localStorage.setItem(LIVES_RESET_KEY, new Date().toISOString());
  } catch (error) {
    console.error("Error resetting lives:", error);
  }
};

// Utiliser une vie
export const useLife = (): number => {
  try {
    // Charger d'abord les vies actuelles
    let currentLives = loadLives();

    // Décrémenter si possible
    if (currentLives > 0) {
      currentLives -= 1;
      localStorage.setItem(LIVES_STORAGE_KEY, currentLives.toString());
    }

    return currentLives;
  } catch (error) {
    console.error("Error using life:", error);
    return 0;
  }
};

// Ajouter des vies (pour l'achat)
export const addLives = (amount: number = MAX_LIVES): number => {
  try {
    // Charger les vies actuelles
    let currentLives = loadLives();

    // Ajouter les vies sans dépasser le maximum
    currentLives = Math.min(currentLives + amount, MAX_LIVES);
    localStorage.setItem(LIVES_STORAGE_KEY, currentLives.toString());

    return currentLives;
  } catch (error) {
    console.error("Error adding lives:", error);
    return 0;
  }
};

// Exporter la constante MAX_LIVES
export { MAX_LIVES };

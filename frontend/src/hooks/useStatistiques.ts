import { useCallback, useEffect, useState } from 'react';
import { getStatistiques, normaliserErreur, type ApiError } from '../services';
import type { Statistiques } from '../types';

export function useStatistiques() {
  const [statistiques, setStatistiques] = useState<Statistiques | null>(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<ApiError | null>(null);

  const rafraichir = useCallback(async () => {
    setChargement(true);
    setErreur(null);
    try {
      setStatistiques(await getStatistiques());
    } catch (e) {
      setErreur(normaliserErreur(e));
    } finally {
      setChargement(false);
    }
  }, []);

  useEffect(() => {
    rafraichir();
  }, [rafraichir]);

  return { statistiques, chargement, erreur, rafraichir };
}

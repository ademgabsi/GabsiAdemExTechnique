import { useEffect, useRef } from 'react';
import { initialiserNotifications, notifierRuptures } from '../services';
import { useProduitsStore } from '../store';

export function useAlerteRuptures(): void {
  const produits = useProduitsStore((s) => s.produits);
  const dejaNotifie = useRef(false);

  useEffect(() => {
    initialiserNotifications().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (produits.length > 0 && !dejaNotifie.current) {
      dejaNotifie.current = true;
      notifierRuptures(produits).catch(() => undefined);
    }
  }, [produits]);
}

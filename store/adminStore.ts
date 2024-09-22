import { create } from 'zustand';

interface AdminState {
  accessCode: string | null;
  setAccessCode: (code: string | null) => void;
  cardAccess: Record<string, boolean>;
  setAccessedCard: (cardId: string) => void;
}

export const CARD_ACCESS_KEY = 'card-access';

export const useAdminStore = create<AdminState>()((set, get) => {
  // Load card access from sessionStorage
  const accessJson = sessionStorage.getItem(CARD_ACCESS_KEY);

  let cardAccess = {};

  if (accessJson) {
    try {
      cardAccess = JSON.parse(accessJson);
    } catch (error: any) {
      throw new Error(
        `Error parsing session storage entry: ${CARD_ACCESS_KEY}:\n${accessJson}`,
        error
      );
    }
  }

  return {
    accessCode: null,
    setAccessCode: (code) => {
      set({ accessCode: code });
    },
    cardAccess,
    setAccessedCard: (cardId) => {
      const { cardAccess } = get();
      set({ cardAccess: { ...cardAccess, [cardId]: true } });

      // Update sessionStorage
      const accessJson = sessionStorage.getItem(CARD_ACCESS_KEY);

      if (!accessJson) {
        sessionStorage.setItem(
          CARD_ACCESS_KEY,
          JSON.stringify({ [cardId]: true })
        );
        return;
      }

      try {
        const accessObj = { ...JSON.parse(accessJson), [cardId]: true };
        sessionStorage.setItem(CARD_ACCESS_KEY, JSON.stringify(accessObj));
      } catch (error: any) {
        throw new Error(
          `Error parsing session storage entry: ${CARD_ACCESS_KEY}:\n${accessJson}`,
          error
        );
      }
    },
  };
});

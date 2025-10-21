// Flower store - каркас для управління станом квітів
import { create } from 'zustand';

interface FlowerState {
  flowers: string[];
  isLoading: boolean;
}

interface FlowerActions {
  setFlowers: (flowers: string[]) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useFlowerStore = create<FlowerState & FlowerActions>()((set) => ({
  flowers: [],
  isLoading: false,

  setFlowers: (flowers) => set({ flowers }),
  setLoading: (isLoading) => set({ isLoading }),
}));

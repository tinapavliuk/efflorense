// AddToBouquet store - каркас для управління станом додавання до букету
import { create } from 'zustand';

interface AddToBouquetState {
  selectedFlowers: string[];
  isModalOpen: boolean;
}

interface AddToBouquetActions {
  addFlower: (flowerId: string) => void;
  removeFlower: (flowerId: string) => void;
  setModalOpen: (isOpen: boolean) => void;
}

export const useAddToBouquetStore = create<
  AddToBouquetState & AddToBouquetActions
>()((set) => ({
  selectedFlowers: [],
  isModalOpen: false,

  addFlower: (flowerId) =>
    set((state) => ({
      selectedFlowers: [...state.selectedFlowers, flowerId],
    })),

  removeFlower: (flowerId) =>
    set((state) => ({
      selectedFlowers: state.selectedFlowers.filter((id) => id !== flowerId),
    })),

  setModalOpen: (isModalOpen) => set({ isModalOpen }),
}));

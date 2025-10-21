// Flower selectors - каркас для селекторів квітів
import { useFlowerStore } from './store';

export const useFlowers = () => {
  return useFlowerStore((state) => state.flowers);
};

export const useFlowerLoading = () => {
  return useFlowerStore((state) => state.isLoading);
};

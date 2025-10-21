// Mood store - каркас для управління станом настрою
import { create } from 'zustand';

interface MoodState {
  selectedMood: string | null;
}

interface MoodActions {
  selectMood: (moodId: string | null) => void;
}

export const useMoodStore = create<MoodState & MoodActions>()((set) => ({
  selectedMood: null,

  selectMood: (moodId) => set({ selectedMood: moodId }),
}));

import { create } from "zustand";

// Defines a custom hook for managing theme state using Zustand.
export const useThemeStore = create((set) => ({
  // Initializes the theme state by retrieving the value from localStorage or defaulting to "corporate".
  theme: localStorage.getItem("chat-theme") || "corporate",
  // Updates the theme state and stores the new theme in localStorage.
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
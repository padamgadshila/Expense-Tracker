export const purpleTheme = {
  primary: "#6A0DAD",
  secondary: "#9B30FF",
  background: "#F3E5F5",
  surface: "#FFFFFF",
  text: "#4A148C",
  border: "#CE93D8",
  shadow: "#B39DDB",
  button: "#9B30FF", // ✅ button background
  buttonText: "#FFFFFF", // ✅ button text color
  error: {
    background: "#FFEBEE",
    text: "#C62828",
  },
  success: {
    background: "#E8F5E9",
    text: "#2E7D32",
  },

  gradient: {
    button: ["#9B30FF", "#6A0DAD"] as const,
    background: ["#E1BEE7", "#F3E5F5"] as const,
  },
};

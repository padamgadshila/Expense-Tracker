export const colors = {
  light: {
    primary: "#6A0DAD",
    text: "#222222", // Main body text
    heading: "#6A0DAD", // Headings
    grayText: "#333333", // Darker gray text
    button: {
      background: ["#7B1FA2", "#6A0DAD"] as const, // Gradient
      buttonText: "#FFFFFF",
    },
    input: {
      background: "#F8F5FF",
      border: "#A78BFA",
      text: "#6A0DAD",
      placeHolder: "#A78BFA",
    },
    gradient: {
      background: ["#f5f0ff", "#f8e8ff"] as const,
    },
    feedback: {
      success: "#28A745",
      error: "#DC3545",
      errorBg: "#FDE2E4",
      warning: "#FFC107",
      info: "#17A2B8",
    },
  },

  dark: {
    primary: "#B066FF",
    text: "#F5F5F5", // Main body text
    heading: "#B066FF", // Headings
    grayText: "#CCCCCC", // Dark gray text
    button: {
      background: ["#8C4DFF", "#B066FF"] as const, // Gradient
      buttonText: "#FFFFFF",
    },
    input: {
      background: "#2A2035",
      border: "#B066FF",
      text: "#FFFFFF",
      placeHolder: "#C6A7F7",
    },
    gradient: {
      background: ["#1E1128", "#2E1842"] as const,
    },
    feedback: {
      success: "#71D88C",
      error: "#FF6B6B",
      errorBg: "#5A1E23",
      warning: "#FFD966",
      info: "#4DD0E1",
    },
  },
};

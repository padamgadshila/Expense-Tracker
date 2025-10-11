export const colors = {
  light: {
    primary: "#6A0DAD",
    text: "#222222", // Main body text
    heading: "#6A0DAD", // Headings
    grayText: "#333333", // Darker gray text
    shadowColor: "#6A0DAD",
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
    success: {
      background: "#E6F4EA",
      text: "#28A745",
    },
    error: {
      background: "#FDE2E4",
      text: "#DC3545",
    },
    warning: {
      background: "#FFF8E1",
      text: "#FFC107",
    },
    info: {
      background: "#E1F4FA",
      text: "#17A2B8",
    },
    tabs: {
      tabBarBackground: "#FFFFFF", // light background
      activeTintColor: "#6A0DAD", // primary purple for selected tab
      inactiveTintColor: "#7A7A7A", // gray for unselected tabs
      indicatorColor: "#6A0DAD", // optional underline indicator
      shadowColor: "#6A0DAD", // subtle shadow for tab bar
    },
  },

  dark: {
    primary: "#B066FF",
    text: "#F5F5F5", // Main body text
    heading: "#B066FF", // Headings
    grayText: "#CCCCCC", // Dark gray text
    shadowColor: "#B066FF",
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
    success: {
      background: "#1F2F23",
      text: "#71D88C",
    },
    error: {
      background: "#5A1E23",
      text: "#FF6B6B",
    },
    warning: {
      background: "#4D3A1E",
      text: "#FFD966",
    },
    info: {
      background: "#1E2F35",
      text: "#4DD0E1",
    },
    tabs: {
      tabBarBackground: "#1E1128", // dark purple background
      activeTintColor: "#B066FF", // lighter purple for selected tab
      inactiveTintColor: "#CCCCCC", // light gray for unselected tabs
      indicatorColor: "#B066FF", // underline indicator
      shadowColor: "#B066FF", // subtle shadow for tab bar
    },
  },
};

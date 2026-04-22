export const formatFollowers = (value) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;

  return String(value);
};

export const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;

  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
};

export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Buenos dias";
  if (hour < 18) return "Buenas tardes";

  return "Buenas noches";
};

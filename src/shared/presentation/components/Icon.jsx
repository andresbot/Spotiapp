import { Entypo, Ionicons } from "@expo/vector-icons";

const ICON_MAP = {
  home: { family: Ionicons, name: "home" },
  search: { family: Ionicons, name: "search" },
  play: { family: Ionicons, name: "play" },
  pause: { family: Ionicons, name: "pause" },
  back: { family: Ionicons, name: "arrow-back" },
  heart: { family: Ionicons, name: "heart-outline" },
  more: { family: Entypo, name: "dots-three-horizontal" },
  music: { family: Ionicons, name: "musical-notes" },
  user: { family: Ionicons, name: "person" },
  close: { family: Ionicons, name: "close" },
  forward: { family: Ionicons, name: "arrow-forward" },
  sparkles: { family: Ionicons, name: "sparkles" },
  trend: { family: Ionicons, name: "trending-up" },
  pulse: { family: Ionicons, name: "radio" },
};

export default function Icon({ name, size = 20, color = "#FFFFFF" }) {
  const iconConfig = ICON_MAP[name];
  if (!iconConfig) return null;

  const IconFamily = iconConfig.family;
  return <IconFamily name={iconConfig.name} size={size} color={color} />;
}

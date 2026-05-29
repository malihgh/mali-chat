import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type IonIconsName = ComponentProps<typeof Ionicons>["name"];

type IconProps = {
  name: IonIconsName;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
};

const Icon = ({ name, size = 24, color = "black", style }: IconProps) => {
  return <Ionicons name={name} size={size} color={color} style={style} />;
};

export default Icon;

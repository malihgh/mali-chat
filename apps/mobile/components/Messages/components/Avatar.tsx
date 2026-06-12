import { memo } from "react";
import Text from "@/components/ui/Text";
import {
  View,
  Image,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useRouter } from "expo-router";

const colors = [
  "#E57373", // red
  "#F4A261", // orange
  "#EAB308", // amber
  "#2DD4BF", // green
  "#3B82F6", // blue
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#16A34A", // emerald
];

const getAvatarColor = (name = "") => {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

type AvatarProps = {
  name?: string;
  avatar?: string | null;
  size?: number;
  textSize?: string;
  style?: StyleProp<ViewStyle>;
};

const Avatar = ({ name = "", avatar, size = 48, style }: AvatarProps) => {
  const backgroundColor = getAvatarColor(name);

  return (
    <View
      className="rounded-full items-center justify-center overflow-hidden"
      style={[
        {
          width: size,
          height: size,
          backgroundColor,
        },
        style,
      ]}
    >
      {avatar ? (
        <Image
          source={{ uri: avatar }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      ) : (
        <Text
          type="sub1"
          className="text-white"
          style={{
            fontSize: size * 0.38,
          }}
        >
          {name?.charAt(0)?.toUpperCase()}
        </Text>
      )}
    </View>
  );
};

export default Avatar;

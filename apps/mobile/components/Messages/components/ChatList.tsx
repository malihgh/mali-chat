import { memo } from "react";
import Text from "@/components/ui/Text";
import { View, Image, FlatList, ListRenderItem, Pressable } from "react-native";
import { useRouter } from "expo-router";

export type ChatDataType = {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar?: string;
  numberOfUnreadMessages: number;
};

type ChatItemProps = {
  item: ChatDataType;
};

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

const ChatItem = memo(({ item }: ChatItemProps) => {
  const { id, name, lastMessage, timestamp, avatar, numberOfUnreadMessages } = item;
  const unread = numberOfUnreadMessages;

  const router = useRouter();
  return (
    <Pressable
      className="flex-row items-center gap-4"
      onPress={() => {
        router.push({
          pathname: "/(tabs)/(chats)/chat",
          params: {
            id,
            name: name,
          },
        });
      }}
    >
      {/* Avatar */}
      <View
        className="w-16 h-16 rounded-full items-center justify-center overflow-hidden"
        style={{ backgroundColor: getAvatarColor(name) }}
      >
        {avatar ? (
          <Image source={{ uri: avatar }} className="w-16 h-16 rounded-full" />
        ) : (
          <Text type="sub1" className="text-white">
            {name?.charAt(0)?.toUpperCase()}
          </Text>
        )}
      </View>

      {/* Content */}
      <View className="flex-1 pt-2">
        <View className="flex-row items-center">
          <Text type="sub2" numberOfLines={1} className="flex-1 min-w-0">
            {name}
          </Text>

          <Text className="text-gray-500 font-normal ml-2 flex-shrink-0">
            {timestamp}
          </Text>
        </View>

        <View className="flex-row items-center mt-1 mb-2">
          <Text
            type="body"
            className="text-gray-500 leading-5 h-10 flex-1 min-w-0"
            numberOfLines={2}
          >
            {lastMessage}
          </Text>

          {unread > 0 && (
            <View className="bg-main min-w-[20px] h-[20px] px-1 rounded-full items-center justify-center">
              <Text className="text-white text-[11px] font-semibold">
                {unread > 1000 ? "999+" : unread}
              </Text>
            </View>
          )}
        </View>

        {/* Divider */}
        <View className="h-0.5 bg-gray-200" />
      </View>
    </Pressable>
  );
});

ChatItem.displayName = "ChatItem";

export default function ChatList() {
  const { chats } = require("./chatsData");
  const renderItem: ListRenderItem<ChatDataType> = ({ item }) => <ChatItem item={item} />;

  return (
    <FlatList<ChatDataType>
      data={chats}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}

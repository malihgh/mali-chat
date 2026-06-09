import { memo } from "react";
import Text from "@/components/ui/Text";
import { View, FlatList, ListRenderItem, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Avatar from "./Avatar";

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
            name,
            avatar,
          },
        });
      }}
    >
      <Avatar name={name} avatar={avatar} size={50} />

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

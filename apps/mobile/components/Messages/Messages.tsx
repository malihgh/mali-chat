import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@/components/ui/Icon";
import Text from "../ui/Text";
import Button from "../ui/Button";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ChatList from "./components/ChatList";

const Messages = () => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");

  return (
    <View className="mx-3">
      {/* header */}
      <View
        className="flex-row justify-between items-center"
        style={{ paddingTop: insets.top }}
      >
        <View className="flex-1">
          <Button title="Edit" buttonTypes="flat" />
        </View>

        <View className="flex-1 items-center">
          <View className="flex-row items-center gap-1">
            <Icon name="chatbubble-ellipses-outline" color="black" />
            <Text type="sub2">Gap</Text>
          </View>
        </View>

        <View className="flex-1 items-end">
          <Icon name="add-circle" size={28} color="black" />
        </View>
      </View>

      <SearchBar text={searchText} setText={setSearchText} />

      <ChatList />
    </View>
  );
};

export default Messages;

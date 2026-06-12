import { Pressable, View } from "react-native";
import Icon from "@/components/ui/Icon";
import Text from "../ui/Text";
import Button from "../ui/Button";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ChatList from "./components/ChatList";
import { SafeAreaView } from "react-native-safe-area-context";

const Messages = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView className="mx-3">
      {/* header */}
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Pressable className="bg-gray-200 px-3 py-3 rounded-xl self-start">
            <Text type="label">Edit</Text>
          </Pressable>
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
    </SafeAreaView>
  );
};

export default Messages;

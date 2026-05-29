import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Pressable } from "react-native";

const Chat = () => {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  return (
    <View className="mt-20">
      <Button title="Go back" onPress={() => router.back()} />
      <Text>chat sldflfljlldfir let me check {name}</Text>

      <Pressable
        onPress={() => {
          router.push({
            pathname: "/(tabs)/(chats)/userInfo",
            params: {
              id,
              name: name,
            },
          });
        }}
      >
        <Text>go to profile</Text>
      </Pressable>
    </View>
  );
};
export default Chat;

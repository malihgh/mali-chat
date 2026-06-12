import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  FlatList,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Text from "@/components/ui/Text";
import Icon from "@/components/ui/Icon";
import Avatar from "../Messages/components/Avatar";

/**
 * MOCK DATA
 */
const initialMessages: {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
  status?: "sent" | "delivered" | "read";
  replyTo?: { id: string; text: string; sender: "me" | "other" };
}[] = [
  {
    id: "6",
    text: "This is a message with a very long text to test the bubble's max width and wrapping behavior. Let's see how it looks on different screen sizes!",
    sender: "other",
    time: "10:25",
  },
  {
    id: "5",
    text: "This is a reply",
    sender: "other",
    time: "10:24",
    replyTo: {
      id: "4",
      text: "Yes 🔥",
      sender: "me",
    },
  },
  {
    id: "4",
    text: "Yes 🔥",
    sender: "me",
    time: "10:23",
    status: "sent",
  },
  {
    id: "3",
    text: "Yes 🔥",
    sender: "other",
    time: "10:23",
  },
  {
    id: "2",
    text: "This UI is getting better",
    sender: "me",
    time: "10:22",
    status: "delivered",
  },
  {
    id: "1",
    text: "Hey 👋",
    sender: "other",
    time: "10:21",
  },
];

/**
 * CHAT SCREEN
 */
const Chat = () => {
  const { id, name, avatar } = useLocalSearchParams();
  const router = useRouter();

  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const sendMessage = () => {
    if (!text.trim()) return;

    setMessages((prev) => [
      {
        id: Date.now().toString(),
        text,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        ...(replyTo ? { replyTo } : {}),
      },
      ...prev,
    ]);

    setText("");
    setReplyTo(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ChatHeader
          user={{
            name: name as string,
            lastSeen: "50 minutes ago",
            avatar: avatar as string,
          }}
          router={router}
          id={id as string}
        />

        <MessageList
          messages={messages}
          setReplyTo={setReplyTo}
          router={router}
          otherUser={{ id: id as string, name: name as string }}
        />

        {replyTo && <ReplyPreview replyTo={replyTo} setReplyTo={setReplyTo} />}

        <MessageInput text={text} setText={setText} onSend={sendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

/**
 * HEADER
 */
const ChatHeader = ({
  user,
  router,
  id,
}: {
  user: { name: string; lastSeen: string; avatar: string };
  router: ReturnType<typeof useRouter>;
  id: string;
}) => {
  const goToProfile = () => {
    router.push({
      pathname: "/userInfo/[id]",
      params: { id, name: user.name },
    });
  };
  return (
    <View className="flex-row items-center px-3 py-2 mb-5">
      {/* LEFT: BACK (bubble style) */}
      <Pressable
        onPress={() => router.back()}
        className="bg-gray-100 px-3 py-3 rounded-full"
      >
        <Icon name="chevron-back" size={24} color="black" />
      </Pressable>

      {/* CENTER: NAME + LAST SEEN */}
      <View className="flex-1 items-center">
        <Pressable onPress={goToProfile}>
          <View className="bg-gray-100 px-5 py-1 rounded-full items-center shadow-lg shadow-gray-500/30">
            <Text type="sub2">{user.name}</Text>
            <Text type="body" className="text-gray-500 mt-[-3px]">
              {/* TODO */}
              {user.lastSeen ? `Last seen at ${user.lastSeen}` : "Online"}
            </Text>
          </View>
        </Pressable>
      </View>

      {/* RIGHT: PROFILE PICTURE */}
      <Pressable onPress={goToProfile}>
        <Avatar
          name={user.name}
          avatar={user.avatar}
          style={{ borderWidth: 2, borderColor: "lightgray" }}
        />
      </Pressable>
    </View>
  );
};

/**
 * MESSAGE LIST
 */
const MessageList = ({
  messages,
  setReplyTo,
  router,
  otherUser,
}: {
  messages: {
    id: string;
    text: string;
    sender: "me" | "other";
    time: string;
    status?: "sent" | "delivered" | "read";
    replyTo?: {
      id: string;
      text: string;
      sender: "me" | "other";
    };
  }[];
  setReplyTo: (message: any) => void;
  router: ReturnType<typeof useRouter>;
  otherUser: { id: string; name: string };
}) => {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 12, gap: 5 }}
      inverted // Invert the list to show latest messages at the bottom
      key={messages.length} // Force re-render when messages change
      renderItem={({ item }) => (
        <MessageBubble
          message={item}
          setReplyTo={setReplyTo}
          router={router}
          otherUser={otherUser}
        />
      )}
    />
  );
};

/**
 * MESSAGE BUBBLE (with swipe-to-reply)
 */
const MessageBubble = ({
  message,
  setReplyTo,
  router,
  otherUser,
}: {
  message: {
    id: string;
    text: string;
    sender: "me" | "other";
    time: string;
    status?: "sent" | "delivered" | "read";
    replyTo?: {
      id: string;
      text: string;
      sender: "me" | "other";
    };
  };
  setReplyTo: (message: any) => void;
  router: ReturnType<typeof useRouter>;
  otherUser: { id: string; name: string };
}) => {
  const isMe = message.sender === "me";

  // const swipe = Gesture.Pan()
  //   .activeOffsetX([-20, 20])
  //   .onEnd((e) => {
  //     if (!isMe && e.translationX > 50) {
  //       setReplyTo(message);
  //     }
  //   });
  return (
    <>
      {/* <GestureDetector gesture={swipe}> */}
      <View className={`flex-row ${isMe ? "justify-end" : "justify-start"}`}>
        {/* CHAT SHAPE BUBBLE */}
        <View
          className={`px-3 py-1 rounded-2xl max-w-[75%] ${
            isMe ? "bg-main" : "bg-gray-200"
          }`}
          style={{
            borderBottomLeftRadius: isMe ? 16 : 0,
            borderBottomRightRadius: isMe ? 0 : 16,
          }}
        >
          <View
            className="flex-col items-start my-1 bg-main/30 px-2 py-1 border-l-4 border-main rounded-md"
            style={{ display: message.replyTo ? "flex" : "none" }}
          >
            <Text type="label" className={`italic text-main`}>
              {message.replyTo?.sender === "me" ? "You" : otherUser.name}
            </Text>
            <Text
              type="label"
              className={`${
                isMe ? "text-white/80" : "text-gray-600"
              } italic max-w-[200px]`}
              numberOfLines={1}
            >
              {message.replyTo?.text}
            </Text>
          </View>
          <Text className={isMe ? "text-white" : "text-black"}>{message.text}</Text>

          <View className="flex-row justify-end items-center gap-1 mt-0.5">
            {/* TIME */}
            <Text
              type="data"
              className={`text-[10px] ${isMe ? "text-white/70" : "text-gray-500"}`}
            >
              {message.time}
            </Text>
            {/* STATUS */}
            {isMe && (
              <Icon
                name={
                  message.status === "sent"
                    ? "checkmark"
                    : message.status === "delivered"
                      ? "checkmark-done"
                      : "time-outline"
                }
                size={14}
                color={message.status === "sent" ? "white" : "lightblue"}
              />
            )}
          </View>
        </View>
      </View>
      {/* </GestureDetector> */}
    </>
  );
};

/**
 * REPLY PREVIEW
 */
const ReplyPreview = ({
  replyTo,
  setReplyTo,
}: {
  replyTo: {
    id: string;
    text: string;
    sender: "me" | "other";
  };
  setReplyTo: (message: any) => void;
}) => {
  return (
    <View className="mx-3 mb-2 bg-gray-100 px-3 py-2 rounded-xl">
      <View className="flex-row justify-between">
        <Text type="sub2">Replying to:</Text>
        <Pressable onPress={() => setReplyTo(null)}>
          <Text className="text-red-500">X</Text>
        </Pressable>
      </View>
      <Text>{replyTo.text}</Text>
    </View>
  );
};

/**
 * INPUT
 */
const MessageInput = ({
  text,
  setText,
  onSend,
}: {
  text: string;
  setText: (text: string) => void;
  onSend: () => void;
}) => {
  return (
    <View className="flex-row items-center px-3 py-2">
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Message..."
        className="flex-1 bg-gray-100 rounded-full px-4 py-3 mr-2"
      />

      <Pressable onPress={onSend} className="bg-main p-3 rounded-full">
        <Icon name="send" size={18} color="white" style={{ alignSelf: "center" }} />
      </Pressable>
    </View>
  );
};

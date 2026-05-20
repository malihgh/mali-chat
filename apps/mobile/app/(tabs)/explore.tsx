import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { io } from "socket.io-client";

const socket = io("http://192.168.1.147:3000", {
  autoConnect: true,
});

type Message = {
  id: string;
  user: string;
  text: string;
};

export default function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const handleMessage = (
      payload: string | { user: string; text: string },
    ) => {
      console.log("Received:", payload);

      const formattedMessage: Message =
        typeof payload === "string"
          ? {
              id: Date.now().toString(),
              user: "Unknown",
              text: payload,
            }
          : {
              id: `${Date.now()}-${Math.random()}`,
              user: payload.user,
              text: payload.text,
            };

      setMessages((prev) => [...prev, formattedMessage]);
    };

    const handleSystem = (msg: string) => {
      console.log("System:", msg);

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-system`,
          user: "SYSTEM",
          text: msg,
        },
      ]);
    };

    socket.on("message", handleMessage);
    socket.on("system", handleSystem);

    return () => {
      socket.off("message", handleMessage);
      socket.off("system", handleSystem);
    };
  }, []);

  const joinChat = useCallback(() => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) return;

    socket.emit("join", trimmedUsername);
    setJoined(true);
  }, [username]);

  const sendMessage = useCallback(() => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    socket.emit("message", trimmedMessage);
    setMessage("");
  }, [message]);

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.username}>
        {item.user === "SYSTEM" ? "🔔 SYSTEM" : item.user}
      </Text>
      <Text>{item.text}</Text>
    </View>
  );

  if (!joined) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Enter username</Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Your username"
          style={styles.input}
        />

        <Button title="Join Chat" onPress={joinChat} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.list}
      />

      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        style={styles.input}
      />

      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
  },
  list: {
    paddingBottom: 20,
  },
  messageContainer: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});

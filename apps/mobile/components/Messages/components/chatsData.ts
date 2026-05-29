import { ChatDataType } from "./ChatList";

export const chats: ChatDataType[] = [
  // TODO: Add piority based on unread messages and latest unread Message
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    timestamp: "2:30 PM",
    avatar:
      "https://img.magnific.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg",
    numberOfUnreadMessages: 2,
  },

  {
    id: 3,
    name: "Malihe k love",
    lastMessage: "Can you send me the files from yesterday?",
    timestamp: "Yesterday",
    avatar: "",
    numberOfUnreadMessages: 200,
  },
  {
    id: 2,
    name: "Dane Smith",
    lastMessage:
      "Don't forget our meeting tomorrow. I wanted to discuss the project details and next steps.",
    timestamp: "1:15 PM",
    avatar: "",
    numberOfUnreadMessages: 0,
  },
];

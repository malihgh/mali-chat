import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import { useState } from "react";
import { TextInput, View } from "react-native";

type SearchBarProps = {
  text: string;
  setText: (text: string) => void;
};
const SearchBar: React.FC<SearchBarProps> = ({ text, setText }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="w-full relative my-4">
      <TextInput
        className="w-full rounded bg-gray-200 p-3.5 pl-11"
        value={text}
        onChangeText={setText}
        placeholderTextColor="gray"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Search icon */}
      <View
        className={`absolute top-0 bottom-0 justify-center items-center pointer-events-none ${
          isFocused || text ? "left-4" : "left-0 right-0 flex-row gap-1"
        }`}
      >
        <Icon name="search" color="gray" size={20} />

        {!isFocused && !text && <Text className="text-gray-500">Search</Text>}
      </View>
    </View>
  );
};

export default SearchBar;

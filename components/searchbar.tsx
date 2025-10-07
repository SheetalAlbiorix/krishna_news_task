import { darkTheme, lightTheme } from "@/theme/colors";
import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function Searchbar({
  value,
  onChangeText,
  placeholder = "Search",
}: Props) {
  const handleClear = () => {
    onChangeText("");
  };

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={[
          styles.input,
          {
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.subText}
        returnKeyType="search"
      />
      {value.length > 0 ? (
        <TouchableOpacity
          onPress={handleClear}
          style={styles.button}
          accessibilityLabel="Clear search"
        >
          <IconSymbol name="clear" size={20} color={theme.icon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
  },
  input: {
    height: 45,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 12,
  },
  button: {
    position: "absolute",
    right: 15,
    top: 12,
  },
});

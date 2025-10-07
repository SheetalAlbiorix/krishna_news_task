import { useTheme } from "@/theme/ThemeProvider";
import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";

export default function Details() {
  const route = useRoute<any>();
  const article = route.params?.article;
  const { theme } = useTheme();

  const getRelativeTime = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={theme.barStyle as "light-content" | "dark-content"}
        backgroundColor={theme.background}
      />
      <ScrollView contentContainerStyle={styles.content}>
        {article?.urlToImage ? (
          <Image source={{ uri: article.urlToImage }} style={styles.image} />
        ) : null}
        <Text style={[styles.title, { color: theme.text }]}>
          {article?.title ?? "Details"}
        </Text>
        {article?.author ? (
          <Text style={[styles.meta, { color: theme.subText }]}>
            By {article.author}
          </Text>
        ) : null}
        {article?.source?.name ? (
          <Text style={[styles.meta, { color: theme.subText }]}>
            {article.source.name}
          </Text>
        ) : null}
        {article?.publishedAt ? (
          <Text style={[styles.meta, { color: theme.subText }]}>
            {getRelativeTime(article.publishedAt)}
          </Text>
        ) : null}
        {article?.description ? (
          <Text style={[styles.body, { color: theme.text }]}>
            {article.description}
          </Text>
        ) : null}
        {article?.content ? (
          <Text style={[styles.body, { color: theme.text }]}>
            {article.content}
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    fontFamily: "EB Garamond",
  },
  meta: {
    fontSize: 12,
    marginBottom: 4,
  },
  body: {
    fontSize: 16,
    marginTop: 12,
    lineHeight: 22,
  },
});

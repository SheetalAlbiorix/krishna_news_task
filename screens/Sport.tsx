import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useTheme } from "@/theme/ThemeProvider";
import { useGetNewsByCategoryQuery } from "../store/newsApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import Searchbar from "@/components/searchbar";
import { NavigationService } from "@/navigation/NavigationService";
import { Image as FastImage } from "expo-image";
import LottieView from "lottie-react-native";

const STORAGE_KEY = "@sport_news_cache";

export default function Sport() {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const { data, refetch, isFetching } = useGetNewsByCategoryQuery("sport");

  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });

    const loadCached = async () => {
      const cached = await AsyncStorage.getItem(STORAGE_KEY);
      if (cached) setArticles(JSON.parse(cached));
    };

    loadCached();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (data?.articles?.length) {
      setArticles(data.articles);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data.articles));
    }
  }, [data]);

  const onRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const onPressCard = (item: any) => {
    NavigationService.navigate("Details", { article: item });
  };

  const getRelativeTime = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  const filteredArticles = articles.filter((item) =>
    (item?.title || "").toLowerCase().includes(search.trim().toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => onPressCard(item)}
      activeOpacity={0.8}
      style={[styles.card, { backgroundColor: theme.cardBackground }]}
    >
      {item.urlToImage ? (
        <FastImage
          source={{ uri: item.urlToImage }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
      ) : (
        <View style={[styles.image, { backgroundColor: theme.placeholder }]} />
      )}
      <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
      <Text
        style={[styles.description, { color: theme.text }]}
        numberOfLines={2}
      >
        {item.description || "No description available"}
      </Text>
      <Text style={[styles.time, { color: theme.subText }]}>
        {getRelativeTime(item.publishedAt)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Searchbar value={search} onChangeText={setSearch} placeholder="Search" />

      {isFetching && articles.length === 0 ? (
        <ActivityIndicator
          size="large"
          color={theme.text}
          style={{ marginTop: 20 }}
        />
      ) : filteredArticles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <LottieView
            source={require("../assets/animations/noResult.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
          <Text style={[styles.emptyText, { color: theme.subText }]}>
            {isOffline
              ? "You're offline. Showing saved news."
              : "No results found"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredArticles}
          keyExtractor={(item) => item.url}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={onRefresh}
              colors={[theme.text]}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#e0e0e0",
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  description: { fontSize: 14 },
  time: { marginTop: 6, fontSize: 12 },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyText: { marginTop: 12, fontSize: 16 },
});

import Searchbar from "@/components/searchbar";
import { NavigationService } from "@/navigation/NavigationService";
import { useTheme } from "@/theme/ThemeProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { Image as FastImage } from "expo-image";
import LottieView from "lottie-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getNewsByQuery } from "../services/newsService";

export default function Health() {
  const { theme } = useTheme();

  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [isOffline, setIsOffline] = useState(false);

  const STORAGE_KEY = "@health_news_cache";

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });
    fetchHealthNews();
    return () => unsubscribe();
  }, []);

  const fetchHealthNews = async () => {
    try {
      setLoading(true);
      const state = await NetInfo.fetch();

      if (state.isConnected) {
        const data = await getNewsByQuery("health");
        setArticles(data);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } else {
        const cached = await AsyncStorage.getItem(STORAGE_KEY);
        if (cached) {
          setArticles(JSON.parse(cached));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchHealthNews();
    setRefreshing(false);
  }, []);

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

  const filteredArticles = articles.filter((item) =>
    (item?.title || "").toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Searchbar value={search} onChangeText={setSearch} placeholder="Search" />

      {loading ? (
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
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.url}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
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
  container: {
    flex: 1,
    padding: 12,
  },
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
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
  time: {
    marginTop: 6,
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
  },
});

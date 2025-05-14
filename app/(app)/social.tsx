import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SocialScreen = () => {
  const [posts, setPosts] = useState([
    {
      id: "1",
      username: "Sarah Johnson",
      timeAgo: "5m ago",
      content: "Just finished my morning workout! 💪",
      likes: 24,
      comments: 3,
    },
    {
      id: "2",
      username: "Mike Chen",
      timeAgo: "15m ago",
      content: "Check out this amazing sunset! 🌅",
      likes: 56,
      comments: 8,
    },
    // ... existing code ...
  ]);

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const renderPost = ({ item }: { item: any }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.timeAgo}>{item.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text>•••</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.content}>{item.content}</Text>

      <View style={styles.interactions}>
        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => handleLike(item.id)}
        >
          <Text>❤️ {item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Text>💬 {item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Text>↪️ Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SocialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  postContainer: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  timeAgo: {
    color: "#666",
    fontSize: 12,
  },
  content: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
  interactions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  interactionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
});

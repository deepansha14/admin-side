import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { PostType } from "../models/post.interface";
import { Post } from "../api/api";

interface ItemProps {
  onOpen: () => void;
  setIsEdit: (state: boolean) => void;
  post: PostType;
  setPostID: (id: number) => void;
  posts: PostType[];
  setPosts: (updatedPost: PostType[]) => void;
}

const Item: React.FC<ItemProps> = ({
  onOpen,
  setIsEdit,
  post,
  setPostID,
  posts,
  setPosts,
}) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleDelete = (id: number) => {
    Post.deletePost(id)
      .then((data) => {
        let updatedPost = posts.filter((post) => post.id !== id);
        setPosts(updatedPost);
      })
      .then((err) => {
        setIsError(true);
      });
  };

  return (
    <View style={styles.item}>
      <Text style={styles.itemName}>{post.title}</Text>
      <Text style={styles.quantity}>x{post.quantity}</Text>
      <Button
        onPress={() => {
          handleDelete(post.id!);
        }}
        title="Delete"
      />

      <Button
        onPress={() => {
          onOpen();
          setIsEdit(true);
          setPostID(post.id!);
        }}
        title="Edit"
      ></Button>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
  },
  itemName: {
    fontWeight: "500",
  },
  quantity: {
    padding: 6,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
});
export default Item;

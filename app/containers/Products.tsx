import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import Header from "../components/Header";
import { useDisclosure } from "@chakra-ui/react";
import { Create } from "../components/Create";
import Item from "../components/Item";
import Edit from "../components/Edit";
import { PostType } from "../models/post.interface";
import { Post } from "../api/api";

const Products = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isError, setIsError] = useState<boolean>(false);
  const [postID, setPostID] = useState<number | null>(null);

  useEffect(() => {
    Post.getPosts()
      .then((response) => {
        setPosts(response);
        return;
      })
      .catch((err) => {
        setIsError(true);
      });
    return () => {};
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header onOpen={onOpen} setIscreate={setIsCreate} />

      <View style={styles.contentWrapper}>
        {isError ? (
          <Text>Oop!!! Error getting posts</Text>
        ) : (
          posts.map((post) => (
            <Item
              key={post.id}
              onOpen={onOpen}
              setIsEdit={setIsEdit}
              post={post}
              setPostID={setPostID}
              posts={posts}
              setPosts={setPosts}
            />
          ))
        )}
      </View>

      {isCreate && (
        <Create
          isOpen={isOpen}
          onClose={onClose}
          setIsCreate={setIsCreate}
          posts={posts}
          setPosts={setPosts}
        />
      )}
      {isEdit && (
        <Edit
          isOpen={isOpen}
          onClose={onClose}
          setIsEdit={setIsEdit}
          posts={posts}
          setPosts={setPosts}
          postID={postID}
          setPostID={setPostID}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e7e3",
  },
  contentWrapper: {
    padding: 20,
  },
});
export default Products;

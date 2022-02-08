import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useDisclosure } from "@chakra-ui/react";
import { ModalProp } from "../models/modal.interface";
import ModalWrap from "./Modelwrap";
import { PostType } from "../models/post.interface";
import { Post } from "../api/api";
import { TextInput } from "react-native-gesture-handler";

interface EditProps extends ModalProp {
  setIsEdit: (state: boolean) => void;
  posts: PostType[];
  setPosts: (updatedPost: PostType[]) => void;
  postID: number | null;
  setPostID: (id: number) => void;
}

const Edit: React.FC<EditProps> = ({
  isOpen,
  onClose,
  setIsEdit,
  posts,
  setPosts,
  postID,
  setPostID,
}) => {
  const [value, setValue] = useState({
    title: "",
    quantity: "",
  });
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    Post.getAPost(postID!)
      .then((data) =>
        setValue({ ...value, title: data.title, quantity: data.quantity })
      )
      .catch((err) => setIsError(true));
    return () => {};
  }, []);

  const handleChange = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setValue({ ...value, [target.name]: target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Post.updatePost(value, postID!)
      .then((data) => {
        let updatedPost = posts.filter((post) => post.id !== postID);
        setPosts([data, ...updatedPost]);
        setValue({ ...value, title: "", quantity: "" });
        onClose();
      })
      .then((err) => {
        setIsError(true);
      });
  };

  return (
    <ModalWrap
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setIsEdit(false);
      }}
      title="Edit Post"
    >
      <form onSubmit={handleSubmit}>
        <View>
          <Text>Title</Text>
          <TextInput
            onChangeText={() => handleChange}
            value={value.title}
            placeholder="Title"
          />
        </View>
        <View>
          <Text>Quantity</Text>
          <TextInput
            onChangeText={() => handleChange}
            value={value.quantity}
            placeholder="Quantity"
          />
        </View>
        <Button
          title="Submit"
          onPress={() => {
            handleSubmit;
          }}
        />
      </form>
    </ModalWrap>
  );
};

export default Edit;

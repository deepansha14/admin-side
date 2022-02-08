import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import { ModalProp } from "../models/modal.interface";
import ModalWrap from "./Modelwrap";
import { PostType } from "../models/post.interface";
import { Post } from "../api/api";

interface CreateProps extends ModalProp {
  setIsCreate: (state: boolean) => void;
  posts: PostType[];
  setPosts: (updatedPost: PostType[]) => void;
}

const Create: React.FC<CreateProps> = ({
  isOpen,
  onClose,
  setIsCreate,
  posts,
  setPosts,
}) => {
  const [value, setValue] = useState({
    title: "",
    quantity: "",
  });
  const [isError, setIsError] = useState<boolean>(false);
  const handleChange = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setValue({ ...value, [target.name]: target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //add
    Post.createPost(value)
      .then((data) => {
        setPosts([data, ...posts]);
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
        setIsCreate(false);
      }}
      title="Create New Post"
    >
      {isError && <Text>Oop!!! Error creating post</Text>}
      <form onSubmit={handleSubmit}>
        <View>
          <Text>Title</Text>
          <TextInput
            onChangeText={() => handleChange}
            value={value.title}
            placeholder="Name"
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
        <Button onPress={() => {}} title="Submit" />
      </form>
    </ModalWrap>
  );
};

export { Create };

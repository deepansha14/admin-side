import { Button, View, Text } from "react-native";

interface HeaderProp {
  onOpen: () => void;
  setIscreate: (state: boolean) => void;
}

const Header: React.FC<HeaderProp> = ({ onOpen, setIscreate }) => {
  return (
    <View>
      <View>
        {/* <Text>
          <a href="/">api-call</a>
        </Text> */}
      </View>
      <Button
        onPress={() => {
          onOpen();
          setIscreate(true);
        }}
        title="Create"
      />
    </View>
  );
};

export default Header;

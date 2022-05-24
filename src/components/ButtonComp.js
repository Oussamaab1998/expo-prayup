import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonComp = (props) => {
  const { bgColor, txtColor, content, pressHandler, textStyle } = props;
  return (
    <TouchableOpacity
      onPress={pressHandler}
      style={[styles.btnStyle, { backgroundColor: bgColor }]}
    >
      <Text style={[styles.textStyle, { color: txtColor, ...textStyle }]}>
        {content}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  // btn
  btnStyle: {
    width: "100%",
    borderRadius: 8,
    marginVertical: 15,
    padding: 8,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 18,
  },
});

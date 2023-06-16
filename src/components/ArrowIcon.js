import { Image, StyleSheet } from "react-native";
import arrowIcon from "../assets/img/mine/icon_arrow.png";
import { xTd } from "../utils/tools";

export default (props) => {
  let { deg, size, color } = props;
  if (!color) {
    color = "black";
  }
  const stys = StyleSheet.create({
    arrowIconSty: {
      width: size || 15,
      height: size || 15,
      tintColor: color,
      resizeMode: "cover",
      marginTop: xTd(1),
      transform: [{ rotate: `${deg || 270}deg` }],
    },
  });
  return <Image style={stys.arrowIconSty} source={arrowIcon} />;
}


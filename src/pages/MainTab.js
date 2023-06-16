import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./tab/home";
import TuitionBill from "./tab/tuitionBill";
import Mine from "./tab/mine";
import { xTd } from "../utils/tools";
import { Image, StyleSheet } from "react-native";
import homeActiveBarIcon from "../assets/img/footerBar/home-icon-active.png";
import homeLinkBarIcon from "../assets/img/footerBar/home-icon-link.png";
import tuitionBillActiveBarIcon from "../assets/img/footerBar/tuitionBill-icon-active.png";
import tuitionBillLinkBarIcon from "../assets/img/footerBar/tuitionBill-icon-link.png";
import mineActiveBarIcon from "../assets/img/footerBar/main-icon-active.png";
import mineLinkBarIcon from "../assets/img/footerBar/main-icon-link.png";

const BottomTab = createBottomTabNavigator();

export default () => {
  const stys = StyleSheet.create({
    barIcon: {
      width: xTd(20),
      height: xTd(22),
      resizeMode: "stretch",
    },
    barButtonLayout: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: xTd(10),
    },
    barTxt: {
      fontSize: xTd(11),
    },
  });
  const renderBar = ({ name, component, title, activeIcon }) => {
    return <BottomTab.Screen name={name}
                             component={component}
                             options={{
                               title: `${title}`,
                               unmountOnBlur: true,
                               headerShown: false,
                               tabBarIcon: ({ focused, color, size }) => {
                                 return <Image
                                   style={[stys.barIcon, {
                                     tintColor: color,
                                   }]}
                                   source={activeIcon} />;
                               },
                               tabBarActiveTintColor: "rgb(52,118,254)",
                               tabBarInactiveTintColor: "rgb(119,119,119)",
                             }} />;
  };

  return (<BottomTab.Navigator
    initialRouteName="Home"
    backBehavior={"none"}>
    {renderBar({
      name: "Home",
      component: Home,
      title: "首页",
      activeIcon: homeActiveBarIcon,
      inactiveIcon: homeLinkBarIcon,
      barIndex: 1,
    })}
    {renderBar({
      name: "TuitionBill",
      component: TuitionBill,
      title: "学费账单",
      activeIcon: tuitionBillActiveBarIcon,
      inactiveIcon: tuitionBillLinkBarIcon,
      barIndex: 2,
    })}
    {renderBar({
      name: "Mine",
      component: Mine,
      title: "我的",
      activeIcon: mineActiveBarIcon,
      inactiveIcon: mineLinkBarIcon,
      barIndex: 3,
    })}
  </BottomTab.Navigator>);
}

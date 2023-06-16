import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { xTd } from "../utils/tools";

export default ({
                  tabs,
                  currentTabIndex,
                  changeTabIndex,
                }) => {
  return <>
    <View style={stys.tabsLayout}>
      {tabs.map((tab, index) =>
        <TouchableOpacity key={tab.code}
                          style={stys.tabItemLayout}
                          onPress={() => {
                            changeTabIndex(tab.code);
                          }}>
          <Text>{tab.title}</Text>
          <View style={[stys.tabLine, currentTabIndex !== tab.code && stys.tabLineHide]} />
        </TouchableOpacity>)}
    </View>
  </>;
}

const stys = StyleSheet.create({
  tabLineHide: {
    backgroundColor: "transparent",
  },
  tabLine: {
    width: "80%",
    height: xTd(4),
    borderRadius: xTd(2),
    backgroundColor: "#3875f6",
    marginTop: xTd(5),
  },
  tabItemLayout: {
    flex: 1,
    padding: xTd(10),
    paddingBottom: xTd(5),
    alignItems: "center",
    justifyContent: "center",
  },
  contentLayout: {
    width: "100%",
    height: "100%",
  },
  tabsLayout: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#D0D0D0",
  },
});

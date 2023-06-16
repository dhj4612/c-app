import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { xTd } from "../utils/tools";

export default (props) => {
  const {
    tabs,
    currentTabIndex,
    changeTabIndex,
    dataSource,
    contentStyle,
    renderItem,
    generateKey,
    once = false,
  } = props;

  return <>
    <View style={stys.tabsLayout}>
      {
        tabs.map((tab, index) => <TouchableOpacity key={index}
                                                   style={stys.tabItemLayout}
                                                   onPress={() => {
                                                     changeTabIndex(index);
                                                   }}>
          <Text>{tab.title}</Text>
          <View style={[stys.tabLine, currentTabIndex !== index && stys.tabLineHide]} />
        </TouchableOpacity>)
      }
    </View>
    <ScrollView style={stys.contentLayout} contentContainerStyle={contentStyle}>
      {
        dataSource.map((item, index) => renderItem(item, index, generateKey(item, index)))
      }
    </ScrollView>
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

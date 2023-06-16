import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { xTd } from "../../../utils/tools";

export default (props) => {
  const { tabs, tabIndex, tabIndexChange } = props;
  const stys = StyleSheet.create({
    layout: {
      width: "100%",
      height: xTd(55),
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    tabItemLayout: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    tabItemContentLayout: {
      flexDirection: "row",
    },
    tabLine: {
      width: "35%",
      height: xTd(4),
      borderRadius: xTd(2),
      backgroundColor: "#3875f6",
      marginTop: xTd(5),
    },
    tabLineHide: {
      backgroundColor: "transparent",
    },
    tabItemTxt: {
      fontSize: xTd(15),
    },
    recordsLayout: {
      minWidth: xTd(16),
      padding: xTd(1),
      height: xTd(16),
      borderRadius: xTd(8),
      borderWidth: xTd(1),
      borderColor: "#3875f6",
      justifyContent: "center",
      alignItems: "center",
    },
    recordsTxt: {
      fontSize: xTd(9),
    },
  });

  return <View style={stys.layout}>
    {tabs.map((tab, index) => <TouchableOpacity style={stys.tabItemLayout}
                                                key={index}
                                                activeOpacity={0.7}
                                                onPress={() => {
                                                  tabIndexChange(index);
                                                }}>
        <View style={stys.tabItemContentLayout}>
          <Text style={stys.tabItemTxt}>{tab.title}</Text>
          <View style={stys.recordsLayout}>
            <Text style={stys.recordsTxt}>{tab.records}</Text>
          </View>
        </View>
        <View style={[stys.tabLine, tabIndex !== index && stys.tabLineHide]} />
      </TouchableOpacity>,
    )}
  </View>;
}

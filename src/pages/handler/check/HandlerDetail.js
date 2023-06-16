import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { xTd } from "../../../utils/tools";
import refreshIcon from "../../../assets/img/lessonExamine/refresh.png";
import processBind from "../../../assets/img/lessonExamine/progress-bind.png";
import { img_bg_stretch } from "../../../assets/stys/const_stys";

export default () => {
  return <>
    <View style={stys.titleLayout}>
      <Text style={stys.titleTxt}>办理详情</Text>
    </View>
    <View style={stys.contentLayout}>
      <View style={stys.headLayout}>
        <View><Text style={{ color: "black" }}>办理进度</Text></View>
        <TouchableOpacity style={stys.refreshBtnLayout}>
          <Image source={refreshIcon} style={stys.refreshIcon} />
          <Text style={stys.refreshBtnTxt}>刷新</Text>
        </TouchableOpacity>
      </View>
      <View style={stys.processLayout}>
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <View style={{ alignItems: "center" }}>
            <View style={{
              width: xTd(35),
              height: xTd(35),
              padding: xTd(3),
              borderRadius: xTd(35 / 2),
              backgroundColor: "red",
            }}>
              <Image source={processBind} style={img_bg_stretch} />
            </View>
            <View>
              <Text style={{ fontSize: xTd(12), textAlign: "center" }}>
                <Text style={{ color: "red" }}>{`绑定课程\n`}</Text>
                <Text style={{ fontSize: xTd(10) }}>
                  {`2023-06-12\n11:45:30`}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  </>;
}

const stys = StyleSheet.create({
  processLayout: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: xTd(10),
    borderBottomColor: "#D0D0D0",
  },
  refreshBtnTxt: {
    fontSize: xTd(12),
    marginLeft: xTd(5),
  },
  refreshBtnLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    paddingVertical: xTd(2),
    paddingHorizontal: xTd(5),
    borderRadius: xTd(12),
  },
  refreshIcon: {
    width: xTd(12),
    height: xTd(12),
    resizeMode: "stretch",
  },
  headLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentLayout: {
    width: "100%",
    padding: xTd(15),
    backgroundColor: "white",
    borderRadius: xTd(12),
    marginTop: xTd(5),
  },
  titleTxt: {
    fontSize: xTd(12),
  },
  titleLayout: {
    width: "100%",
    marginTop: xTd(15),
  },
});

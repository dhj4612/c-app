import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deepFind, xTd } from "../utils/tools";
import { CITY_DATA } from "../const/city_data";

export default forwardRef((props, ref) => {
  const [visible, setVisible] = useState(true);
  const {
    sourceData = CITY_DATA,
    onValueChange,
    titleText = "请选择",
    cancelText = "取消",
    confirmText = "确定",
    labelText = "请选择",
    onConfirm = (value) => hideModal(),
    onCancel = () => hideModal(),
    cols = 1,
    value,
    onPress,
    styles,
    fetchDataList,
  } = props;
  const hideModal = () => {
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
  };

  useImperativeHandle(ref, () => {
    return {
      showModal, hideModal,
    };
  });

  const [labels, setLabels] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [empty, setEmpty] = useState(false);
  const dataListFlatListRef = useRef(false);

  useEffect(() => {
    setDataList(sourceData.map(item => {
      return { value: item.value, label: item.label };
    }));
  }, [sourceData]);

  const handlerDataList = async (item, index) => {
    setDataList([]);
    let result;
    if (fetchDataList) {
      result = await fetchDataList(item, index, sourceData);
    } else {
      result = deepFind(sourceData, item.value);
    }
    const children = result?.children;
    if (children && children.length > 0) {
      setDataList(children);
    } else {
      setEmpty(true);
    }
  };

  // 155,158,161
  const LabelEmptyView = () => <View
    style={stys.labelItemLayout}>
    <Text style={[{ fontSize: xTd(14) }, { color: "#D0D0D0" }]}>{labelText}</Text>
  </View>;

  const labelItemOnPress = async (item, index) => {
    await handlerDataList(item, index);
    let copy = [...labels].map(t => {
      t.selected = t.value === item.value;
      return item;
    });
    copy = copy.splice(0, copy.findIndex(e => e.value === item.value) + 1);
    setLabels(copy);
  };

  const selectedItemOnPress = async (item, index) => {
    await handlerDataList(item, index);
    const copy = [...labels].map(item => {
      item.selected = false;
      return item;
    });
    if (!copy.find(t => t.value === item.value)) {
      copy.push({ label: item.label, value: item.value, selected: true });
    }
    setLabels(copy);
  };

  return <>
    <Modal visible={visible}
           onRequestClose={() => hideModal()}
           transparent={true}
           statusBarTranslucent={true}
           animationType="fade">
      <View style={stys.layout}>
        <View style={stys.contentLayout}>
          <View style={stys.headLayout}>
            <TouchableOpacity style={[stys.headItemLayout, { justifyContent: "flex-start" }]}>
              <Text>{cancelText}</Text>
            </TouchableOpacity>

            <View style={[stys.headItemLayout, { justifyContent: "center" }]}>
              <Text style={{ fontSize: xTd(17) }}>{titleText}</Text>
            </View>
            <TouchableOpacity style={[stys.headItemLayout, { justifyContent: "flex-end" }]}
                              onPress={() => {

                              }}>
              <Text>{confirmText}</Text>
            </TouchableOpacity>
          </View>
          <View style={stys.labelLayout}>
            <FlatList horizontal={true}
                      data={labels}
                      contentContainerStyle={{ height: "100%", justifyContent: "center" }}
                      ListEmptyComponent={<LabelEmptyView />}
                      renderItem={({ item, index }) =>
                        <TouchableOpacity
                          style={stys.labelItemLayout} key={item.value}
                          onPress={() => labelItemOnPress(item, index)}>
                          <Text style={[
                            { fontSize: xTd(14) },
                            item.selected ? { color: "rgb(101, 204, 222)" } : {},
                          ]}>
                            {item.label}
                          </Text>
                        </TouchableOpacity>}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false} />
          </View>
          <View style={stys.line} />
          <View style={stys.dataListLayout}>
            <FlatList data={dataList}
                      ref={dataListFlatListRef}
                      ListEmptyComponent={
                        !empty ?
                          <ActivityIndicator
                            style={{ marginTop: xTd(25) }}
                            color={"#5A9EEE"}
                            animating={true}
                            size={"large"} /> : <></>}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) =>
                        <TouchableOpacity style={[{ paddingVertical: xTd(10) }, stys.line]}
                                          key={item.value}
                                          onPress={() => selectedItemOnPress(item, index)}>
                          <Text>{item.label}</Text>
                        </TouchableOpacity>}
                      contentContainerStyle={[{
                        paddingHorizontal: xTd(10),
                        justifyContent: "center",
                      }, dataList.length === 0 && { alignItems: "center" }]} />
          </View>
        </View>
      </View>
    </Modal>
  </>;
});

const stys = StyleSheet.create({
  dataListLayout: {},
  line: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#D0D0D0",
  },
  labelItemLayout: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: xTd(10),
  },
  labelLayout: {
    height: xTd(45),
    justifyContent: "center",
  },
  headItemLayout: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headLayout: {
    width: "100%",
    padding: xTd(10),
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#D0D0D0",
  },
  contentLayout: {
    width: "100%",
    flex: .45,
    backgroundColor: "white",
    borderTopLeftRadius: xTd(12),
    borderTopRightRadius: xTd(12),
  },
  layout: {
    width: "100%",
    height: Dimensions.get("screen").height,
    backgroundColor: "#00000030",
    justifyContent: "flex-end",
  },
});

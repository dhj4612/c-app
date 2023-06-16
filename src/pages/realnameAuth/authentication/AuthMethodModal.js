import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { forwardRef, useImperativeHandle, useState } from "react";
import { full_container } from "../../../assets/stys/const_stys";
import { ID_TYPE } from "../../../const";
import { navigate, Routers } from "../../../navigation";
import { useUserStore } from "../../../hooks/useUserStore";
import { xTd } from "../../../utils/tools";
import { launchImageLibrary } from "react-native-image-picker";
import { handlerErr } from "../../../utils/request_error_handler";
import { uploadRealNameImgApi } from "../../../api";
import { createFileAndCompress, handlerUploadResult } from "../helper";

export default forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [idType, setIdType] = useState("");
  const { setBackUploading, setFaceUploading } = props;
  const { saveRealNameInfo, userState } = useUserStore();
  const showModal = (idType) => {
    setIdType(idType);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {
      showModal, hideModal,
    };
  });

  const handlerImageUpload = async () => {
    hideModal();
    let file = undefined;
    try {
      const { assets } = await launchImageLibrary(null);
      const { fileName, uri } = assets[0];
      file = await createFileAndCompress({
        uri, fullFileName: fileName,
      });
    } catch (e) {
      return;
    }
    if (file) {
      const onUploadChange = idType === ID_TYPE.FACE ? setFaceUploading : setBackUploading;
      try {
        onUploadChange(true);
        const result = await uploadRealNameImgApi(file);
        handlerUploadResult(result, idType, saveRealNameInfo, userState.realNameInfo);
      } catch (e) {
        await handlerErr(e);
      } finally {
        onUploadChange(false);
      }
    }
  };
  const onTakePhotoMethod = () => {
    hideModal(); // 需要先隐藏 modal，否则再次回到实名页面时，蒙层依然存在，无法操作页面
    navigate(Routers.AuthenticationCamera.name, { idType });
  };

  return <Modal visible={visible}
                onRequestClose={() => hideModal()}
                transparent={true}
                statusBarTranslucent={true}
                animationType="fade">
    <View style={stys.laytout}>
      <View style={stys.methodLayout}>
        <TouchableOpacity style={stys.takePhotoBtnLayout}
                          activeOpacity={.6}
                          onPress={() => onTakePhotoMethod()}>
          <Text style={{ color: "white" }}>拍照上传</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stys.photoBtnLayout}
                          activeOpacity={.6}
                          onPress={() => {
                            handlerImageUpload().then(null);
                          }}>
          <Text style={{ color: "#1989fa" }}>选择相册</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>;
});

const stys = StyleSheet.create({
  photoBtnLayout: {
    padding: xTd(10),
    borderRadius: xTd(2),
    borderWidth: 1,
    borderColor: "#1989fa",
  },
  takePhotoBtnLayout: {
    padding: xTd(10),
    backgroundColor: "#1989fa",
    borderRadius: xTd(2),
  },
  methodLayout: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    borderTopLeftRadius: xTd(12),
    borderTopRightRadius: xTd(12),
    flex: .15,
    backgroundColor: "white",
  },
  laytout: {
    ...full_container,
    justifyContent: "flex-end",
    backgroundColor: "#00000060",
  },
});

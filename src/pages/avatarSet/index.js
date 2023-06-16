import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import avatarBgImg from "../../assets/img/mine/avatar-bg.png";
import logo from "../../assets/img/public/logo.png";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import { goBack } from "../../navigation";
import { toastMessage, xTd } from "../../utils/tools";
import { useUserStore } from "../../hooks/useUserStore";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { handlerErr } from "../../utils/request_error_handler";
import { uploadAvatarApi } from "../../api";
import { createFileAndCompress } from "../realnameAuth/helper";

export default function AvatarSet() {
  const { userState, saveUserInfo } = useUserStore();
  const fileSizeLimit = 7 * 1024 * 1024;
  const SelectImageType = {
    PHOTO: "PHOTO",
    TAKE_PHOTO: "TAKE_PHOTO",
  };

  const handlerImage = async (assets) => {
    const { fileName, uri, fileSize } = assets[0];
    if (fileSize > fileSizeLimit) {
      toastMessage("图片大小不能超过7MB！");
      return;
    }
    try {
      Loading.show();
      const { fileUrl, halfFileUrl } = await uploadAvatarApi(await createFileAndCompress({
        uri,
        fullFileName: fileName,
      }));
      saveUserInfo({
        ...userState.userInfo,
        avatarUrl: fileUrl,
      });
    } catch (e) {
      await handlerErr(e);
    } finally {
      Loading.hide();
    }
  };

  const onSelectImageByType = async (type) => {
    const launcherAction = type === SelectImageType.PHOTO ?
      launchImageLibrary : type === SelectImageType.TAKE_PHOTO ? launchCamera : undefined;
    if (!launcherAction) {
      return;
    }
    const { assets } = await launcherAction(null);
    await handlerImage(assets);
  };

  return <>
    <NavBar title={"设置个人头像"} handler={() => goBack()} />
    <ImageBackground source={avatarBgImg}
                     style={stys.layout}
                     imageStyle={stys.avatarBgImg}>
      <View style={stys.contentLayout}>
        <View style={stys.avatarContentLayout}>
          <Image source={userState.userInfo.avatarUrl ? { uri: userState.userInfo.avatarUrl } : logo}
                 style={stys.avatarImg}
          />
          <View style={stys.userInfoLayout}>
            <Text style={stys.userPhoneText}>
              {userState.userInfo.phone?.replace(userState.userInfo.phone
                .substring(3, 7), "****")}
            </Text>
            <Text style={stys.userNameText}>用户名：{userState.userInfo.userName}</Text>
          </View>
        </View>
        <View style={stys.buttonsLayout}>
          <TouchableOpacity style={stys.buttonLayout}
                            onPress={() => onSelectImageByType(SelectImageType.PHOTO)}>
            <Text style={{ color: "black" }}>从相册选一张</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[stys.buttonLayout, { marginTop: xTd(10) }]}
                            onPress={() => onSelectImageByType(SelectImageType.TAKE_PHOTO)}>
            <Text style={{ color: "black" }}>拍一张照片</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[stys.buttonLayout, { marginTop: xTd(10) }]}
                            onPress={() => goBack()}>
            <Text style={{ color: "black" }}>取消</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  </>;
};

const stys = StyleSheet.create({
  userNameText: {
    paddingVertical: xTd(1),
    paddingHorizontal: xTd(27),
    backgroundColor: "rgb(200,218,255)",
    borderRadius: xTd(12),
  },
  userPhoneText: {
    fontSize: xTd(20),
    color: "black",
  },
  userInfoLayout: {
    marginTop: xTd(30),
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImg: {
    width: xTd(150),
    height: xTd(150),
    borderRadius: xTd(75),
    marginTop: xTd(100),
  },
  avatarContentLayout: {
    alignItems: "center",
  },
  buttonLayout: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: xTd(10),
    borderRadius: xTd(12),
  },
  buttonsLayout: {
    width: "100%",
  },
  avatarBgImg: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  contentLayout: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    padding: xTd(15),
    height: Dimensions.get("window").height - xTd(40),
  },
  layout: {
    width: "100%",
    height: "100%",
  },
});

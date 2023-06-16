import { urlParamsParse } from "../../utils/tools";
import React from "react";

export default () => {
  // // /lessonExamine?id=385201
  // return <WebView originWhitelist={["*"]}
  //                 mixedContentMode="always"
  //                 userAgent={"Mozilla/5.0 (Linux; An33qdroid 10; Android SDK built for x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.185 Mobile Safari/537.36"}
  //                 allowsInlineMediaPlayback={true}
  //                 geolocationEnabled={true}
  //                 mediaPlaybackRequiresUserAction={false}
  //                 javaScriptEnabled={true}
  //                 onMessage={(e) => handlerPostMessage(e, navigation)}
  //                 allowsBackForwardNavigationGestures={true}
  //                 onLoadStart={() => Loading.show()}
  //                 onLoadEnd={() => Loading.hide()}
  //   // useWebView2={true}
  //                 source={{
  //                   uri: `https://user.wz.chengxuexinfu.com/lessonExamine?id=359056`,
  //                 }} />;

  // const icon = <Image style={stys.noticeIcon} source={noticeIcon} />;
  // return <NoticeBar
  //   icon={icon}
  //   style={{
  //     backgroundColor: "white",
  //   }}
  //   onPress={() => alert("click")}
  //   marqueeProps={{ loop: true, leading: 1500, trailing: 0, fps: 120, style: { fontSize: 12, color: "black" } }}>
  //   反诈提醒：近日有部分用户接到诚学信付返资退课等相关诈骗信息，请不要私下转账！保护好个人信息，不要相信任何第三方代理退费机构或个人微信、QQ群，如有疑问，请咨询机构老师或诚学信付官方客服，切实提高反诈意识。诚学信付祝大家新春愉快，阖家欢乐！
  // </NoticeBar>;

  const result = urlParamsParse("https://www.baidu.com?aaa=111&aaa=222&name=zhangsan");
  console.log(result);
  return <>

  </>;
}
//
// const stys = StyleSheet.create({
//   noticeIcon: {
//     marginLeft: xTd(15),
//   },
// });

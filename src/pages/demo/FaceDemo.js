import * as React from "react";
import { useRef } from "react";
import { ImageType } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { Button } from "react-native";

export default () => {
  const handleFacesDetected = ({ faces,image }) => {
    // console.log(JSON.stringify(faces[0]));
    console.log(image)
  };


  const cameraRef = useRef(null);

  const startRecord = () => {
    cameraRef.current.recordAsync({
      mute: false,
    }).then(res => {
      console.log(res);
    });
    // cameraRef.current.getSupportedRatiosAsync().then(res => {
    //   console.log(res);
    // });
  };

  const detectAsync = async () => {
    const { uri } = await cameraRef.current.takePictureAsync({
      base64: false,
      imageType: ImageType.jpg,
      exif: true,
      skipProcessing: true,
      quality: 1,
    });
    FaceDetector.detectFacesAsync(uri).then(res => {
      console.log(res);
    });
  };

  const takePhoto = async () => {
    const { uri } = await cameraRef.current.takePictureAsync({
      base64: false,
      imageType: ImageType.jpg,
      exif: true,
      skipProcessing: true,
      quality: 1,
    });
    console.log(uri);
  };

  return <>
    {/*<Camera*/}
    {/*  style={{*/}
    {/*    width: "100%",*/}
    {/*    flex: .6,*/}
    {/*  }}*/}
    {/*  type={CameraType.front}*/}
    {/*  autoFocus={true}*/}
    {/*  ref={cameraRef}*/}
    {/*  // other props*/}
    {/*  onFacesDetected={handleFacesDetected}*/}
    {/*  faceDetectorSettings={{*/}
    {/*    mode: FaceDetector.FaceDetectorMode.accurate,*/}
    {/*    detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,*/}
    {/*    runClassifications: FaceDetector.FaceDetectorClassifications.all,*/}
    {/*    minDetectionInterval: 1500,*/}
    {/*    tracking: true,*/}
    {/*  }}>*/}
    {/*</Camera>*/}

    <Button title={"开始录制"} onPress={() => startRecord()} />
    <Button title={"检测"} onPress={() => detectAsync()} />
  </>;
}

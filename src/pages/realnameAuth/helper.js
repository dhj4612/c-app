import { ID_TYPE } from "../../const";
import uuid from "react-native-uuid";
import { Image as ImageCompressor } from "react-native-compressor";

/**
 * 根据身份证上传类型，处理返回结果
 * @param result
 * @param idType
 * @param storeOperation
 * @param rawData
 */
export const handlerUploadResult = (result = {}, idType, storeOperation, rawData) => {
  const { fileUrl, halfFileUrl } = result;
  const urlFieldKey = idType === ID_TYPE.FACE ? "faceUrl" : "backUrl";
  const paramFiledKey = idType === ID_TYPE.FACE ? "faceHalfUrl" : "backHalfUrl";
  storeOperation({
    ...rawData,
    [urlFieldKey]: fileUrl,
    [paramFiledKey]: halfFileUrl,
  });
};

/**
 * 通过文件系统绝对路径，创建可上传的文件对象并且使用自动压缩模式进行压缩
 * @param uri
 * @param fileName,
 * @param fullFileName
 * @param suffix
 */
export const createFileAndCompress = async ({
                                              uri,
                                              fullFileName,
                                              fileName = `${uuid.v4()}`,
                                              suffix = ".jpg",
                                            }) => {
  // 图片压缩
  const compressFileUri = await ImageCompressor.compress(uri, {
    compressionMethod: "auto",
  });
  return {
    uri: compressFileUri,
    type: "application/octet-stream",
    name: fullFileName || `${fileName}${suffix}`,
  };
};

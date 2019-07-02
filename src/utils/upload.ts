import * as qiniu from 'qiniu';

export interface ILooseObject {
  [key: string]: any;
}

const qiniuToken = () => {
  const options = {
    scope: 'img_bucket',
    isPrefixalScope: 1,
    deadline: Math.round(Date.now() / 1000 + 3600),
    insertOnly: 1,
    returnBody: JSON.stringify({
      key: '$(key)',
      name: '$(fname)',
      size: '$(fsize)',
      type: '$(mimeType)',
      bucket: '$(bucket)',
      w: '$(imageInfo.width)',
      h: '$(imageInfo.height)'
    })
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const accessKey = process.env.QINIU_ACCESS;
  const secretKey = process.env.QINIU_SECRET;
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  return putPolicy.uploadToken(mac);
};
/**
 * @description 上传操作
 * @param localFile string | stream 上传文件的源文件或者流数据
 * @param key 储存的空间路径key
 */
export function qiniuUpload(stream = 'file', localFile, key) {
  const uploadToken = qiniuToken();
  const config: ILooseObject = new qiniu.conf.Config();
  // 空间对应的机房
  config.zone = qiniu.zone.Zone_z2;
  // 是否使用https域名
  config.useHttpsDomain = true;
  // 上传是否使用cdn加速
  config.useCdnDomain = true;
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  // 文件上传
  return new Promise((resolve, reject) => {
    (formUploader[stream === 'stream' ? 'putStream' : 'putFile'] as any).call(
      formUploader,
      uploadToken,
      key,
      localFile,
      putExtra,
      (respErr, resBody, respInfo) => {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode === 200) {
          resolve(resBody);
        } else {
          reject(resBody);
        }
      }
    );
  });
}

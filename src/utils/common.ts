export function getFileExtensions(fileName: string) {
  /* tslint:disable:no-bitwise */
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
}

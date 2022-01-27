/**
 *
 *  */
export function fileTypeMapMiME(nameSuffix) {
  switch (nameSuffix) {
    case "jpe":
    case "jpeg":
    case "jpg":
      return 'image/jpeg';
    case "tif":
    case "tiff":
      return "image/tiff"
    case "png":
    case "pnz":
      return "image/png"
    case "jfif":
      return 'image/pipeg'
    case "svg":
      return 'image/svg+xml'
    case "ras":
      return 'image/x-cmu-raster'
    case "cmx":
      return 'image/x-cmx'
    case "ico":
      return 'image/x-icon'
    case "pnm":
      return 'image/x-portable-anymap'
    case "pbm":
      return 'image/x-portable-bitmap'
    case "pgm":
      return 'image/x-portable-graymap'
    case "ppm":
      return 'image/x-portable-pixmap'
    case "rgb":
      return 'image/x-rgb'
    case "xbm":
      return 'image/x-xbitmap'
    case "xpm":
      return 'image/x-xpixmap'
    case "xwd":
      return 'image/x-xwindowdump'
    default:
      return ""
  }
}

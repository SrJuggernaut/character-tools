export const b64EncodeUnicode = (base64String: string): string => {
  return btoa(
    encodeURIComponent(base64String).replace(
      /%([0-9A-F]{2})/g,
      function toSolidBytes(_, p1: string) {
        return String.fromCharCode(parseInt(p1, 16))
      }
    )
  )
}

export const b64DecodeUnicode = (str: string): string => {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

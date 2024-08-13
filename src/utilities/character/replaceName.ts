const replaceName = (text: string, name: string): string => {
  return text.replaceAll(name, '{{char}}')
}

export default replaceName

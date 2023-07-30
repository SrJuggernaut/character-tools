const imageToPng = async (image: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const imageContext = canvas.getContext('2d')

      if (imageContext === null) {
        reject(new Error('Could not get the image context'))
        return
      }

      imageContext.drawImage(img, 0, 0)
      const dataUrl = canvas.toDataURL()
      resolve(dataUrl)
    }

    img.src = image
  })
}

export default imageToPng

import imageCompression from 'browser-image-compression'

const compressImage = async (event: any) => {
    const imageFile = event.target.files[0]
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
    }

    try {
        const compressedBlob = await imageCompression(imageFile, options)
        const compressedFile = new File([compressedBlob], imageFile.name, {
            type: imageFile.type,
            lastModified: Date.now(),
        })

        return compressedFile
    } catch (error) {
        console.log(error)
    }
}

export default compressImage

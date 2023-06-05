import axios from "axios";


const upload = async (file) => {
    const data = new FormData()
    data.append("file",file)
    data.append("upload_preset","fiverr")
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dl1a6idba/image/upload",data)
      const {url} =res.data
      console.log("🚀 ~ file: upload.js:10 ~ upload ~ res:", res)
      return url
    } catch (error) {
      console.log("🚀 ~ file: Register.jsx:53 ~ upload ~ error:", error)
    }
  }


export default upload;
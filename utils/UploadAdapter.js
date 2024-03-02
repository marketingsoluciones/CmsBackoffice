import axios from "axios";
import { api } from "../utils/api";
import Resizer from "react-image-file-resizer";
import { fetchApi, queries } from "./Fetching";


export const convertBase64ToFile = function (image, name) {
  const byteString = atob(image.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  const newBlob = new Blob([ab], {
    type: 'image/jpeg',
  });
  const file = new File([newBlob], `${name?.split(".")[0]}.jpg`, { type: 'image/jpeg' });
  return file;
};

export const resizeImageBase64 = (file, name) => {
  try {
    file = convertBase64ToFile(file, name)
    if (file) {
      ///console.log(4111100, file)
      return new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          file.size > 900000 ? 900 : file.size - 100,
          file.size > 900000 ? 900 : file.size - 100,
          "JPEG",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "file"
        );
      });
    }
  } catch (error) {
    console.log(error)
  }
}
export const uploadImage = async (file) => {
  return await new Promise((resolve) => {
    fetchApi({
      query: queries.singleUpload,
      variables: {
        file: file,
      },
      type: "formData",
      development: "bodasdehoy",
    }).then((result) => {
      resolve(`https://api.bodasdehoy.com${result?.i800}`)
    });
  })
}


export const resizeImage = (file) => {
  try {
    return new Promise((resolve) => {
      console.log("text de imagen", file.type, "size de imagen", file.size,)
      Resizer.imageFileResizer(
        file,
        1200,
        1200,
        `${["image/png", "image/webp"].includes(file.type) ? file.type.split("/")[1] : "jpeg"}`.toLowerCase(),
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
  } catch (error) {
    console.log(error)
  }
}


export class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.loader.file.then((pic) => (this.file = pic));
    this.upload();
  }

  async upload() {
    try {
      if (this.file) {
        const fd = new FormData();
        console.log(this.file)
        const params = {
          query: `mutation ($file :Upload!){
                  ckeditorUpload(file: $file){
                    default
                    i1024
                    i800
                    i640
                    i320
                  }
                }`,
          variables: {
            file: null,
          },
        };
        const map = { image: ["variables.file"] };
        fd.append("operations", JSON.stringify(params));
        fd.append("map", JSON.stringify(map));
        fd.append("image", this.file?.size > 900000 ? await resizeImage(this.file) : this.file); // your image

        const { data: { data } } = await api.ApiBodas(fd);
        return Object.values(data)[0];
      }

    } catch (error) {
      console.error("Server Error : ", error);
      return "Server Error";
    }
  }
}

import { fetchApi, queries } from "./Fetching";
import { resizeImageBase64 } from "./UploadAdapter"

export const transformBase64 = async (payload) => {
  try {
    const iterarObjeto = async (objeto) => {
      for (const key in objeto) {
        if (typeof objeto[key] === 'object') {
          // Si es un objeto anidado, llamamos recursivamente
          await iterarObjeto(objeto[key]);
        } else {
          // Si es un valor, realizamos la operación asíncrona
          if (typeof objeto[key] === "string") {
            if (key === "src") {
              if (objeto[key].slice(0, 10) === "data:image") {
                const result = await new Promise((resolve) => {
                  if (objeto?.name !== undefined) {
                    resizeImageBase64(objeto[key], objeto.name).then(file => {
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
                  } else {
                    resolve("https://api.bodasdehoy.com/uploads/0bb3da/default-i800.webp")
                  }
                })
                objeto[key] = result
              }
            }
          }
        }
      }
      return objeto
    }
    const newPayload = await iterarObjeto(payload)
    return newPayload

  } catch (error) {
    console.log(error)
  }
}
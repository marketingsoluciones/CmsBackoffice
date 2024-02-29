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
                  if (objeto[key] !== "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+") {
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
                    resolve("https://api.bodasdehoy.com/uploads/0bb3da/default-i320.webp")
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

export const confgiAsset = {// Activos predeterminados
  // p.ej. [
  // 'https://...imagen1.png',
  // 'https://...imagen2.png',
  // {tipo: 'imagen', src: 'https://...image3.png', someOtherCustomProp: 1},
  // ..
  // ]
  assets: [],

  // Contenido para agregar donde no hay activos para mostrar
  // p.ej. 'No hay <b>materiales</b> aquí, arrastra para subir'
  noAssets: '',

  // Cargar punto final, configurar "falso" para deshabilitar la carga
  // subir: 'https://endpoint/upload/assets',
  // cargar: falso,
  upload: 0,

  // El nombre usado en POST para pasar los archivos cargados
  uploadName: 'files',

  // Encabezados personalizados para pasar con la solicitud de carga
  headers: {},

  // Parámetros personalizados para pasar con la solicitud de carga, por ejemplo. ficha csrf
  params: {},

  // La configuración de credenciales para la solicitud de carga, por ejemplo. 'incluir', 'omitir'
  credentials: 'include',

  // Permitir cargar múltiples archivos por solicitud.
  // Si el nombre del archivo está deshabilitado no tendrá '[]' agregado
  multiUpload: true,

  // Si es verdadero, intenta agregar recursos cargados automáticamente.
  // Para que funcione, el servidor debe responder con un JSON que contenga activos
  // en una clave de datos, por ejemplo:
  // {
  //  datos: [
  // 'https://.../imagen.png',
  //...
  // {fuente: 'https://.../image2.png'},
  //...
  // ]
  // }
  autoAdd: 1,

  // Texto en la entrada de carga
  uploadText: 'Drop files here or click to upload1',

  // Etiqueta para el botón agregar
  addBtnText: 'Add image1',

  // Función personalizada de carga de archivos
  // @ejemplo
  // cargar archivo: (e) => {
  // archivos var = e.dataTransfer? e.dataTransfer.files: e.target.files;
  // // ...enviar a alguna parte
  // }
  uploadFile: '',

  // Maneja el envío de la URL de la imagen desde el formulario incorporado 'Agregar imagen'
  // @ejemplo
  // handleAdd: (textFromInput) => {
  // // algún cheque...
  // editor.AssetManager.add(textFromInput);
  // }
  handleAdd: '',

  // Habilita una zona de carga en todo el editor (no en el documento) al arrastrar
  // archivos sobre él
  dropzone: 1,

  // Abra el administrador de activos una vez que los archivos se hayan eliminado a través de la zona de entrega
  openAssetsOnDrop: 1,

  // Cualquier contenido de dropzone para agregar dentro del elemento de dropzone
  dropzoneContent: '',

  // Título predeterminado para el modal de administrador de activos
  modalTitle: 'Select Image',
}
import grapesjs, { Editor } from 'grapesjs';
import GjsEditor from '@grapesjs/react';

export default function DefaultEditor() {
  const onEditor = (editor: Editor) => {
    console.log('Editor cargado', { editor });
  };

  return (
    <GjsEditor
      grapesjs={grapesjs} // Pasa la biblioteca GrapesJS (obligatorio).
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css" // Carga el archivo CSS de GrapesJS de forma asíncrona desde una URL (opcional).
      options={{
        height: '100vh',
        storageManager: false,
      }}
      onEditor={onEditor}
    />
  );
}


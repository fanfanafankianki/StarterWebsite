import React from 'react';
import { useEditor } from 'tldraw';

function downloadFile(data, filename, type) {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function SaveButton({ onSave, setShowImage }) {
  const editor = useEditor();

  return (
    <button
      style={{
        position: "absolute",
        zIndex: 1000,
        right: 10,
        top: 10,
        backgroundColor: "lightgreen",
        border: "0px solid black",
        padding: "5px 10px",
      }}
      onClick={async () => {
        const snapshot = editor.store.getSnapshot();
        const stringified = JSON.stringify(snapshot);
        console.log(stringified);
        downloadFile(stringified, "snapshot.json", "text/plain");
      }}
    >
      Save .json state
    </button>
  );
}

export default SaveButton;

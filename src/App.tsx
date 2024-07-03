import { TLStoreSnapshot, Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import _jsonSnapshot from './snapshot.json';
import React, { useEffect } from 'react';

const jsonSnapshot = _jsonSnapshot as TLStoreSnapshot;

const LOAD_SNAPSHOT_WITH_INITIAL_DATA = true;

export default function App() {
  const handleGetSnapshot = (editor) => {
    const snapshot = editor.store.getSnapshot()
    console.log(snapshot)  // Wyświetla snapshot w konsoli, można to zmodyfikować do innych potrzeb
    downloadSnapshot(snapshot); // Zapisuje snapshot do pliku
  };

  const downloadSnapshot = (snapshot) => {
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'snapshot.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    // Dodanie klasy blokującej przewijanie
    document.body.classList.add('no-scroll');

    // Przewinięcie na samą górę przy pierwszym renderowaniu
    window.scrollTo(0, 0);

    // Włączenie przewijania po 2 sekundach
    const enableScroll = () => {
      document.body.classList.remove('no-scroll');
    };

    setTimeout(enableScroll, 2000);

    return () => {
      // Przywrócenie przewijania przy odmontowaniu komponentu
      enableScroll();
    };
  }, []);

  useEffect(() => {
    // Przewinięcie na górę przy każdej zmianie komponentu
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (LOAD_SNAPSHOT_WITH_INITIAL_DATA) {
    return (
      <div>
        <div style={{
          height: '650px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
          border: '4px solid #112240',
          borderRadius: '10px',
          backgroundColor: '#0a192f',
          padding: '10px'
        }}>
          <Tldraw
            snapshot={jsonSnapshot}
            onMount={(editor) => {
              window.scrollTo(0, 0);
              window.myEditor = editor;
              editor.updateInstanceState({ canMoveCamera: false });
              editor.updateInstanceState({ isFocused: false });
              editor.updateInstanceState({ isFocusMode: false });
              window.scrollTo(0, 0);
            }}
          />
        </div>
        <button onClick={() => handleGetSnapshot(window.myEditor)} style={{ marginTop: '20px' }}>Get Snapshot</button>
      </div>
    );
  }
}

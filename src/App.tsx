import { TLStoreSnapshot, Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import _jsonSnapshot from './snapshot.json';
import { useEffect } from 'react';

const jsonSnapshot = _jsonSnapshot as TLStoreSnapshot;

const LOAD_SNAPSHOT_WITH_INITIAL_DATA = true;

export default function App() {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    window.scrollTo(0, 0);

    const enableScroll = () => {
      document.body.classList.remove('no-scroll');
    };

    setTimeout(enableScroll, 2000);

    return () => {
      enableScroll();
    };
  }, []);

  useEffect(() => {
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
      <div style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowX: 'auto', // Enable horizontal scrolling
        overflowY: 'hidden', // Disable vertical scrolling
      }}>
        <Tldraw
          hideUi
          snapshot={jsonSnapshot}
          onMount={(editor) => {
            window.scrollTo(0, 0);
            editor.setCurrentTool("hand");
            editor.updateInstanceState({ isReadonly: true });
            editor.updateInstanceState({ canMoveCamera: true });
            editor.updateInstanceState({ isFocused: true });
            editor.updateInstanceState({ isFocusMode: true });
            window.scrollTo(0, 0);
          }}
        />
      </div>
    );
  }

  return null;
}

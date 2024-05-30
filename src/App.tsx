import { TLStoreSnapshot, Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import _jsonSnapshot from './snapshot.json'

const jsonSnapshot = _jsonSnapshot as TLStoreSnapshot

// There's a guide at the bottom of this file!

const LOAD_SNAPSHOT_WITH_INITIAL_DATA = true

//[1]
export default function App() {
  	const handleGetSnapshot = (editor) => {
    	  const snapshot = editor.store.getSnapshot()
    	  console.log(snapshot)  // Wyświetla snapshot w konsoli, można to zmodyfikować do innych potrzeb
  	}
        if (LOAD_SNAPSHOT_WITH_INITIAL_DATA) {
                return (
                        <div style={{
                        height: '600px',
                        width: '92%',
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
                                        hideUi
                                        snapshot={jsonSnapshot}
                                        onMount={(editor) => {
                                                window.myEditor = editor;
                                                editor.setCurrentTool('laser')
                                                editor.updateInstanceState({ isReadonly: true })
                                                console.log("kozak")
                                        }}
                                />

                        </div>
                )
        }
        return (
                <div className="tldraw__editor">
                        <Tldraw
                                onMount={(editor) => {
                                        window.myEditor = editor;
                                        editor.store.loadSnapshot(jsonSnapshot)
                                }}
                        />
                        <button onClick={() => handleGetSnapshot(window.myEditor)}>Get Snapshot</button>
                </div>
        )

}

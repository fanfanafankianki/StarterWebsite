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
			<div className="tldraw__editor">
				<Tldraw snapshot={jsonSnapshot} 
                                	onMount={(editor) => {
                                        	window.myEditor = editor;
 						console.log("kozak")
                                	}}
				/>
                        	<button onClick={() => handleGetSnapshot(window.myEditor)}>Get Snapshot</button>
			</div>
		)
	}
	//[2]
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

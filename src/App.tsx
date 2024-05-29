import { TLStoreSnapshot, Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import _jsonSnapshot from './snapshot.json'

const jsonSnapshot = _jsonSnapshot as TLStoreSnapshot

// There's a guide at the bottom of this file!

const LOAD_SNAPSHOT_WITH_INITIAL_DATA = true

//[1]
export default function SnapshotExample() {
	if (LOAD_SNAPSHOT_WITH_INITIAL_DATA) {
		return (
			<div className="tldraw__editor">
				<Tldraw snapshot={jsonSnapshot} />
			</div>
		)
	}
	//[2]
	return (
		<div className="tldraw__editor">
			<Tldraw
				onMount={(editor) => {
					editor.store.loadSnapshot(jsonSnapshot)
				}}
			/>
		</div>
	)
}

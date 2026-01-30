import { useEffect, useState } from 'react'
import SavedZone from './comps/SavedZone05'
import Zone from './comps/Zone05'
import Modal from './comps/Modal05'

function App() {
	const [saved, setSaved] = useState(false)
	const [data, setData] = useState([])
	const [savedZones, setSavedZones] = useState([])
	const [modal, setModal] = useState(false)
	const [toggled, setToggled] = useState([])

	useEffect(() => {
		fetch('http://127.0.0.1:3407/zones')
			.then(e => e.json())
			.then(setData)
	}, [])

	useEffect(() => {
		fetch('http://127.0.0.1:3407/zones/saved')
			.then(e => e.json())
			.then(setSavedZones)
	}, [saved])

	const getZone = id => data.find(e => e.idx == id)

	const pushToggled = () => {
		setToggled(e => {
			fetch('http://127.0.0.1:3407/save', {
				method: 'POST',
				body: JSON.stringify({saved: e}),
				headers: {'Content-Type': 'application/json'}
			})

			alert(`wysłano stref: ${e.length}`)
		})
	}

	return (
		<>
			{
				!saved ?
				<>
					<button onClick={pushToggled}>wyslij zaznacznone na serwer</button>
					<button onClick={() => setSaved(true)}>wyswietl tylko zapisane =&gt;</button>
				</>
				:
				<>
					<button onClick={() => setSaved(false)}>&lt;= powrót</button>
				</>
			}

			{
				saved ? 
				<>
					{
						savedZones.map(e => {
							const z = getZone(e)
							return <SavedZone data={z} key={z.idx} />
						})
					}
				</>
				:
				<>
					{
						data.map(e => (
							<Zone data={e} setModal={setModal} setToggled={setToggled} key={e.idx} />
						))
					}
				</>
			}

			{
				modal !== false ? <Modal data={getZone(modal).utc} setModal={setModal} /> : <></>
			}
		</>
	)
}

export default App

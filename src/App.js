import React from 'react';
import './App.scss';
import Modal from './components/Modal';
import Note from './components/Note';
import { useGlobalContext } from './ContextProvider';

function App() {
	const { handleModal, notes } = useGlobalContext();
	return (
		<>
			<Modal />
			<main className="main container">
				<div className="main_container">
					<div className="setup same_height">
						<button className="add_btn" onClick={() => handleModal('open')}>
							<span className="add_icon">+</span>
							<p>Add Note</p>
						</button>
					</div>
					{notes.length ? (
						<>
							{notes.map((item, i) => (
								<Note key={i} {...item} />
							))}
						</>
					) : null}
				</div>
			</main>
		</>
	);
}

export default App;

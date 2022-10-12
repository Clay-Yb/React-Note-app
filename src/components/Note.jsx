import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { useGlobalContext } from '../ContextProvider';
import './Note.scss';
const Note = ({ id, title, des, date, dotOpen }) => {
	const { handleDot, handleDelete, handleEdit } = useGlobalContext();
	return (
		<div className="note same_height">
			<div className="note_header">
				<div className="title">
					<h3>{title}</h3>
				</div>
				<hr />
			</div>
			<div className="note_body">
				<p>{des}</p>
			</div>
			<div className="note_footer">
				<hr />
				<div className="note_footer-container">
					<span>{date}</span>
					<div className="note_footer-dropdown">
						<button onClick={() => handleDot(id)}>
							<BsThreeDots />
						</button>
						<div className={`dropdown ${dotOpen ? 'active' : ''}`}>
							<button className="dd_btn" onClick={() => handleEdit(id, 'open')}>
								<AiOutlineEdit />
								Edit
							</button>
							<button className="dd_btn" onClick={() => handleDelete(id)}>
								<AiOutlineDelete />
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Note;

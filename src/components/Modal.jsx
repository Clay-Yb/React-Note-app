import React from 'react';
import { useGlobalContext } from '../ContextProvider';
import './Modal.scss';
const Modal = () => {
	const { modalOpen, handleModal, handleSubmit, titleRef, desRef, isEdit } = useGlobalContext();

	return (
		<div className={`modal_container ${modalOpen ? 'active' : ''}`}>
			<div className="modal">
				<div className="modal_header modal_padding">
					<h3>{isEdit ? 'Edit' : 'Add'} Note</h3>
					<button onClick={() => handleModal('close')}>&times;</button>
				</div>
				<hr />
				<div className="modal_body modal_padding">
					<form onSubmit={(e) => handleSubmit(e, titleRef.current.value, desRef.current.value)}>
						<div className="form_control">
							<label htmlFor="title">Title</label>
							<input type="text" name="title" id="title" autoComplete="off" ref={titleRef} />
						</div>

						<div className="form_control">
							<label htmlFor="des">Description</label>
							<textarea name="des" id="des" ref={desRef} />
						</div>

						<button type="submit" className="submit_btn">
							{isEdit ? 'Edit' : 'Add'} Note
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Modal;

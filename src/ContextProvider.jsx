import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { Actions, Reducer } from './Reducer';

const AppContext = createContext();

export const useGlobalContext = () => useContext(AppContext);

const initialState = {
	modalOpen: false,
	notes: JSON.parse(localStorage.getItem('notes')) || [],
	isEdit: false,
	editId: null,
};

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState);

	const titleRef = useRef(null);
	const desRef = useRef(null);

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(state.notes));
	}, [state.notes]);

	const handleModal = (type) => {
		titleRef.current.focus();
		titleRef.current.value = '';
		desRef.current.value = '';
		dispatch({ type: Actions.ToggleModal, payload: type });
	};

	const handleSubmit = (e, title, des) => {
		e.preventDefault();
		if (!title || !des) return;
		if (title && des && state.isEdit) {
			dispatch({ type: Actions.EditNote, payload: { title, des } });
		} else {
			dispatch({ type: Actions.NewNote, payload: { title, des } });
			titleRef.current.value = '';
			desRef.current.value = '';
		}
	};

	const handleDot = (id) => {
		dispatch({ type: Actions.Toggledot, payload: id });
	};

	const handleDelete = (id) => {
		dispatch({ type: Actions.DeleteNote, payload: id });
	};

	const handleEdit = (id) => {
		dispatch({ type: Actions.SetupEdit, payload: id });
		const selectedNote = state.notes.find((note) => note.id === id);
		titleRef.current.focus();
		titleRef.current.value = selectedNote.title;
		desRef.current.value = selectedNote.des;
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				handleModal,
				handleSubmit,
				titleRef,
				desRef,
				handleDot,
				handleDelete,
				handleEdit,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default ContextProvider;

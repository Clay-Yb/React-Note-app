export const Actions = {
	ToggleModal: 'modal_open',
	Toggledot: 'dot_open',
	NewNote: 'new_note',
	DeleteNote: 'delete_note',
	SetupEdit: 'SetupEdit',
	EditNote: 'EditNote',
};

const month = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const Reducer = (state, action) => {
	let currentDate = new Date();
	const currentMonth = month[currentDate.getMonth()];
	const currentDay = currentDate.getDate();
	const currentYear = currentDate.getFullYear();
	let currentHour = currentDate.getHours();
	let currentMin = currentDate.getMinutes();
	currentHour = currentHour < 10 ? '0' + currentHour : currentHour;
	currentMin = currentMin < 10 ? '0' + currentMin : currentMin;
	let amOrPm = currentHour > 12 ? 'PM' : 'AM';

	let date = `${currentMonth} ${currentDay}, ${currentYear} - ${currentHour}:${currentMin} ${amOrPm}`;

	switch (action.type) {
		case Actions.ToggleModal:
			let newStateModal = action.payload === 'open' ? true : false;
			return {
				...state,
				modalOpen: newStateModal,
				isEdit: false,
				editId: null,
				notes: state.notes.map((n) => {
					return { ...n, dotOpen: false };
				}),
			};

		case Actions.NewNote:
			let NewNote = {
				id: new Date().getTime().toString(),
				title: action.payload.title,
				des: action.payload.des,
				date,
				dotOpen: false,
			};

			return {
				...state,
				notes: [...state.notes, NewNote],
				modalOpen: false,
			};

		case Actions.Toggledot:
			return {
				...state,
				notes: state.notes.map((n) => {
					if (n.id === action.payload) {
						return { ...n, dotOpen: !n.dotOpen };
					}
					return n;
				}),
			};

		case Actions.DeleteNote:
			let DeleteNote = state.notes.filter((n) => n.id !== action.payload);
			return { ...state, notes: DeleteNote };

		case Actions.SetupEdit:
			let SetupEdit = state.notes.map((n) => {
				if (n.id === action.payload) {
					return { ...n, dotOpen: false };
				}
				return n;
			});
			return { ...state, modalOpen: true, isEdit: true, editId: action.payload, notes: SetupEdit };

		case Actions.EditNote:
			let EditNote = state.notes.map((n) => {
				if (n.id === state.editId) {
					return { ...n, title: action.payload.title, des: action.payload.des, date };
				}
				return n;
			});
			return { ...state, editId: null, isEdit: false, notes: EditNote, modalOpen: false };

		default:
			return state;
	}
};

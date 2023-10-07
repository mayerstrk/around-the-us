import { createSlice } from '@reduxjs/toolkit';

const enum PopupName {
	editProfile = 'edit-profile-info',
	editAvatar = 'edit-avatar',
	addCard = 'add-card',
	image = 'image',
	deleteCard = 'delete-card',
	error = 'error',
	logInError = 'log-in-error',
	signUpSuccess = 'signUp-success',
}

interface PopupsVisibility {
	editProfilePopupIsVisible: boolean;
	editAvatarPopupIsVisible: boolean;
	addCardPopupIsVisible: boolean;
	imagePopupIsVisible: boolean;
	deleteCardPopupIsVisible: boolean;
	errorPopupIsVisible: boolean;
	signUpSuccessPopupIsVisible: boolean;
	logInErrorPopupIsVisible: boolean;
}

interface TimeOutClosePopupState {
	wasClicked: boolean;
}

const initialState: PopupsVisibility & TimeOutClosePopupState = {
	editProfilePopupIsVisible: false,
	editAvatarPopupIsVisible: false,
	addCardPopupIsVisible: false,
	imagePopupIsVisible: false,
	deleteCardPopupIsVisible: false,
	errorPopupIsVisible: false,
	signUpSuccessPopupIsVisible: false,
	logInErrorPopupIsVisible: false,
	wasClicked: false,
};

const popupsVisibilitySlice = createSlice({
	name: 'popups-visibility',
	initialState,
	reducers: {
		toggledEditProfilePopupVisibility(state) {
			return {
				...initialState,
				editProfilePopupIsVisible: !state.editProfilePopupIsVisible,
			};
		},
		toggleEditAvatarPopupVisibility(state) {
			return {
				...initialState,
				editAvatarPopupIsVisible: !state.editAvatarPopupIsVisible,
			};
		},
		toggledAddCardPopupVisibility(state) {
			return {
				...initialState,
				addCardPopupIsVisible: !state.addCardPopupIsVisible,
			};
		},
		toggledImagePopupVisibility(state) {
			return {
				...initialState,
				imagePopupIsVisible: !state.imagePopupIsVisible,
			};
		},
		toggledDeleteCardPopupVisibility(state) {
			return {
				...initialState,
				deleteCardPopupIsVisible: !state.deleteCardPopupIsVisible,
			};
		},
		toggledErrorPopupVisibility(state) {
			return {
				...initialState,
				errorPopupIsVisible: !state.errorPopupIsVisible,
			};
		},
		toggledRegisterSuccessPopupVisibility(state) {
			return {
				...initialState,
				signUpSuccessPopupIsVisible: !state.signUpSuccessPopupIsVisible,
			};
		},
		toggledLogInErrorPopupVisibility(state) {
			return {
				...initialState,
				logInErrorPopupIsVisible: !state.logInErrorPopupIsVisible,
			};
		},
		wasClicked(state) {
			state.wasClicked = true;
		},
	},
});

export const {
	toggledAddCardPopupVisibility,
	toggleEditAvatarPopupVisibility,
	toggledErrorPopupVisibility,
	toggledEditProfilePopupVisibility,
	toggledImagePopupVisibility,
	toggledDeleteCardPopupVisibility,
	toggledLogInErrorPopupVisibility,
	toggledRegisterSuccessPopupVisibility,
	wasClicked,
} = popupsVisibilitySlice.actions;

export default popupsVisibilitySlice.reducer;
export { PopupName };

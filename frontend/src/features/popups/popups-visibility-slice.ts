import { createSlice } from '@reduxjs/toolkit';

const enum PopupName {
	editProfile = 'edit-profile-info',
	editAvatar = 'edit-avatar',
	addCard = 'add-card',
	image = 'image',
	deleteCard = 'delete-card',
	error = 'error',
	logInError = 'log-in-error',
	registerSuccess = 'register-success',
}

interface PopupsVisibility {
	editProfilePopupIsVisible: boolean;
	editAvatarPopupIsVisible: boolean;
	addCardPopupIsVisible: boolean;
	imagePopupIsVisible: boolean;
	deleteCardPopupIsVisible: boolean;
	errorPopupIsVisible: boolean;
	registerSuccessPopupIsVisible: boolean;
	logInErrorPopupIsVisible: boolean;
}

const initialState: PopupsVisibility = {
	editProfilePopupIsVisible: false,
	editAvatarPopupIsVisible: false,
	addCardPopupIsVisible: false,
	imagePopupIsVisible: false,
	deleteCardPopupIsVisible: false,
	errorPopupIsVisible: false,
	registerSuccessPopupIsVisible: false,
	logInErrorPopupIsVisible: false,
};

const popupsVisibilitySlice = createSlice({
	name: 'popups-visibility',
	initialState,
	reducers: {
		toggledEditProfilePopupVisibility(state) {
			state.editProfilePopupIsVisible = !state.editProfilePopupIsVisible;
		},
		toggleEditAvatarPopupVisibility(state) {
			state.editAvatarPopupIsVisible = !state.editAvatarPopupIsVisible;
		},
		toggledAddCardPopupVisibility(state) {
			state.addCardPopupIsVisible = !state.addCardPopupIsVisible;
		},
		toggledImagePopupVisibility(state) {
			state.imagePopupIsVisible = !state.imagePopupIsVisible;
		},
		toggledDeleteCardPopupVisibility(state) {
			state.deleteCardPopupIsVisible = !state.deleteCardPopupIsVisible;
		},
		toggledErrorPopupVisibility(state) {
			state.errorPopupIsVisible = !state.errorPopupIsVisible;
		},
		toggledRegisterSuccessPopupVisibility(state) {
			state.registerSuccessPopupIsVisible = !state.registerSuccessPopupIsVisible;
		},
		toggledLogInErrorPopupVisibility(state) {
			state.logInErrorPopupIsVisible = !state.logInErrorPopupIsVisible;
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
} = popupsVisibilitySlice.actions;

export default popupsVisibilitySlice.reducer;
export { PopupName };

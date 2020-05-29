import { axios } from '../config/axios';

const login = (email, password) => {
	return axios({
		method: 'post',
		url: 'auth/login',
		data: { email, password }
	})
		.then((res) => res.data)
		.catch((err) => {
			const messageError = (err.response && err.response.data && err.response.data.message) || 'login failed';
			throw new Error(messageError);
		});
};


export default {
	login
};

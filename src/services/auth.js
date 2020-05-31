import { axios } from '../config/axios';
const pathname = '/auth'

const login = (username, password) => {
	return axios({
		method: 'post',
		url: `${pathname}/login`,
		data: { username, password }
	})
		.then((res) => res.data)
		.catch((err) => {
			const messageError = (err.response && err.response.data && err.response.data.message) || 'login failed';
			throw new Error(messageError);
		});
};


export const AuthService =  {
	pathname,
	login
};

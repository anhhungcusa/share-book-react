import { axios } from "../config/axios"

const pathname = '/registration'

const registerGiveaway = (email, luckyNumber, giveawayId) => {

    return axios({
        url: pathname,
        method: 'post',
        data: {
            email, luckyNumber, giveawayId
        }
    }).then(res => res.data.registration)
        .catch(err => {
            const messageError = (
                err.response && 
                err.response.data && 
                err.response.data.message) || 'action failed';
            throw new Error(messageError);         
        })
}

export default {pathname, registerGiveaway}
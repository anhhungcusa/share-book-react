import { axios } from "../config/axios"

const pathname = '/giveaways'

const createGiveaway = ({
    categoryId, title, description, 
    giftImg, giftTitle, 
    begin, numParticipants
}, token) => {
    return axios({
        url: pathname,
        headers: {
            'Authorization': `Bearer ${token}`,
            
        },
        method: 'post',
        data: {
            categoryId, title, description, 
            giftImg, giftTitle, 
            begin, numParticipants
        }
    }).then(res => res.data.giveaway)
        .catch(err => {
            const messageError = (
                err.response && 
                err.response.data && 
                err.response.data.message) || 'action failed';
            throw new Error(messageError);         
        })
    }
    
const startGiveaway = (giveawayId, token) => {
    return axios({
        url: `${pathname}/${giveawayId}/start`,
        headers: {
            'Authorization': `Bearer ${token}`,
            
        },
        method: 'patch',
    }).then(res => res.data.giveaway)
    .catch(err => {
        const messageError = (
            err.response && 
            err.response.data && 
            err.response.data.message) || 'action failed';
        throw new Error(messageError);         
    })
}

const updateWinnerInfo = ({fullname, address, phone, email}, giveawayId, token) => {
    return axios({
        url: `${pathname}/${giveawayId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'patch',
        data: {
            fullname, address, phone, email
        }
    }).then(res => res.data.message)
        .catch(err => {
            const messageError = (
                err.response && 
                err.response.data && 
                err.response.data.message) || 'action failed';
            throw new Error(messageError);  
        })
}

const getGiveaways = (categoryId, ended, {skip, limit}, token) => {
    return axios({
        url: pathname,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'get',
        params: {
            categoryId, ended, skip, limit
        }
    }).then(res => res.data.giveaways)
        .catch(err => {
            const messageError = (
                err.response && 
                err.response.data && 
                err.response.data.message) || 'failed to fetch giveaways';
            throw new Error(messageError);  
        })
}

const removeGiveaway = (giveawayId, token) => {
    return axios({
        url: `${pathname}/${giveawayId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'delete',
    }).then(res => res.data.message)
        .catch(err => {
            const messageError = (
                err.response && 
                err.response.data && 
                err.response.data.message) || 'action failed';
            throw new Error(messageError);  
        })
}

export default {
    pathname,
    createGiveaway,
    startGiveaway,
    updateWinnerInfo,
    getGiveaways,
    removeGiveaway
}
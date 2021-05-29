import axios from 'axios';
import { getToken } from '@/services/auth';

export const getAllTeams = () => {
    return axios.get(`https://mymeetingsapp.herokuapp.com/api/teams`,
    {
        headers : {
            Authorization : getToken()
        }
    })
    .then( response => response.data);
}

export const excuseYourSelfFromTeam = (id) => {
    return axios.patch(`https://mymeetingsapp.herokuapp.com/api/teams/${id}?action=remove_member`,
        {
            action : "remove_attendee"
        },  
        {    
            headers : {
                Authorization: getToken()
            } 
        })
        .then( response => response.data);
};

export const Addtoteam = (memberid, teamid) => {
    return axios.patch(`https://mymeetingsapp.herokuapp.com/api/teams/${teamid}?action=add_member&userId=${memberid }`,
        {
            action : "add_member",
            userId : memberid
        },  
        {    
            headers : {
                Authorization: getToken()
            } 
        })
        .then( response => response.data);
};
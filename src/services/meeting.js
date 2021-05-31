import axios from 'axios';
import { getToken } from '@/services/auth';

export const searchMeetingDateWord = (search,period) => {
    return axios.get(`https://mymeetingsapp.herokuapp.com/api/meetings?`,
        {
            params : {
                'search' : search,
                'period' : period
            },   
            headers: { 
                'Authorization': getToken()
            }
        })
        .then( response => response.data);
};

export const excuseYourSelfFromMeeting = (id) => {
    return axios.patch(`https://mymeetingsapp.herokuapp.com/api/meetings/${id}/?action=remove_attendee`,
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

export const getAllUsers = () => {
        return axios.get(
            `https://mymeetingsapp.herokuapp.com/api/users`,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
           .then( response => response.data );
};

export const AddToMeeting = (memberid, meetingid) => {
    return axios.patch(`https://mymeetingsapp.herokuapp.com/api/meetings/${meetingid}?action=add_attendee&userId=${memberid}`,
        {
            action : "add_attendee",
            userId : memberid
        },  
        {    
            headers : {
                Authorization: getToken()
            } 
        })
        .then( response => response.data);
};

export const AddMeeting = (data) => {
    console.log(data);
    return axios.post(`https://mymeetingsapp.herokuapp.com/api/meetings`,
    data,
    {
        headers: { 
            'Authorization': getToken()
        },
    }).then( response => response.data);
}
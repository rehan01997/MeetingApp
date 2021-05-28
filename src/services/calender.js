import axios from 'axios';
import { getToken } from '@/services/auth';

export const fetchCalender = (searchdate) => {
    return axios.get(
        `https://mymeetingsapp.herokuapp.com/api/calendar?date=${searchdate}`,
        {
            headers: {
                'Authorization': getToken()
            }
        })
       .then( response => response.data );
};
export const fetchWorkshopById = ( id ) => {
    return axios.get( `http://localhost:8001/workshops/${id}` )
    .then( response => response.data )
};

export const daysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
}
import { values } from 'lodash'

export const firebaseErrorCodesTranslated = (error) => {
    switch(error.code) {
        case 'auth/user-not-found' :
            return 'No account found, click below to create an account';
        default:
            return error.message

    }
};

export const todaysDate = () => {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    return `${mm}-${dd}-${yyyy}`
};


export const parseDate = (date) => {
    const parsedDate = date.split('-');
    return {
        month: parsedDate[0],
        day: parsedDate[1],
        year: parsedDate[2]
    }
};


export const sortRecords = (records) => {
    return values(records).sort((a, b) => (a.date.year > b.date.year) ? 1 : (a.date.month === b.date.month) ? ((a.date.day > b.date.day) ? 1 : -1) : -1 )
  
}
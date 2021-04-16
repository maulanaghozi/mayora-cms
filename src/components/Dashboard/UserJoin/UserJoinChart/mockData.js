import moment from 'moment';

export const mockData = (from, to, range) => {
    let arr = [];
    let startDate = moment.unix(from);
    let currDate = moment.unix(to);
    let step = range+ 's';


    while (currDate.isAfter(startDate)) {
        let date = currDate.unix();

        arr.unshift({
            recruiter: Math.round(Math.random() * 1000),
            talent: Math.round(Math.random() * 1000),
            date: date
        })

        let temp = currDate.subtract(1, step);
        currDate = temp
    }

    return arr;
}
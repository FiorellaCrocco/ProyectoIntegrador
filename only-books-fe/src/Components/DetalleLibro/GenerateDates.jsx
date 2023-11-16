import React, { useState, useEffect } from 'react';
import DateObject from 'react-date-object';

const GenerateDates = ({ startDate, endDate, obtenerFechas}) => {
 const [dates, setDates] = useState([]);

 useEffect(() => {
    let newDates = [];
    let currentDate = new Date(startDate);
    let finishDate = new Date(endDate)
    finishDate.setDate(finishDate.getDate())
    currentDate.setDate(currentDate.getDate())
    while (currentDate <= finishDate) {
        const formattedDate = `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
          }-${currentDate.getDate()}`;  
      newDates.push(new DateObject(formattedDate));
      currentDate.setDate(currentDate.getDate()+1);
    }
    setDates(newDates);
    console.log(dates)
}, [startDate, endDate]);

useEffect(()=>{
     obtenerFechas(dates)

 },[dates])

 return (
    <></>
 );
};

export default GenerateDates;
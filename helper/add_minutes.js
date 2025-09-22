module.exports= function addMinustesToDate(date, minutes){
    return new Date(date.getTime() + minutes * 60000)
}


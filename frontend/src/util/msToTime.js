export const msToTimeShort = (ms) => {

    const now = new Date().getTime();
    const timeLeft = ms - now;
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (days >= 1) {
        return `${days} days ${hours} hours left`;
    } else if (hours >= 1) {
        return `${hours} hours ${minutes} minutes`;
    } else {
        return  ` ${minutes} minutes ${seconds} seconds left`;
    }
  
    

}

export const msToTimeLong = (ms) => {

    const now = new Date().getTime();
    const timeLeft = ms - now;
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds left`;

}
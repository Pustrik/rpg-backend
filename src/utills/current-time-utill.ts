const getCurrentDate = (): string => {
    const date = new Date();
    return date.toLocaleString();
}

export default getCurrentDate;
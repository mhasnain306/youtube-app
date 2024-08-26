const compareDates = (date1: string, date2: string, date3: string): boolean => {
    // Convert the dates to Date objects
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const d3 = new Date(date3);

    // Ensure that date2 is the earlier date and date3 is the later date
    const startDate = d2 < d3 ? d2 : d3;
    const endDate = d2 > d3 ? d2 : d3;

    // Check if date1 is equal to date2 or date3, or falls between them
    return (
        d1.getTime() === startDate.getTime() ||
        d1.getTime() === endDate.getTime() ||
        (d1 > startDate && d1 < endDate)
    );
};

export default compareDates;

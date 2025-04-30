export function convertISODateToDateField(isoDate) {
    return new Date(isoDate).toISOString().slice(0, 10);
}

export function convertDateFieldToISODate(dateFieldValue) {
    return new Date(dateFieldValue).toISOString();
}
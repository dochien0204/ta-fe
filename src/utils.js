import { formatRelative, parseISO } from "date-fns";

const convertDateString = (stringDate) => {

    let result = ""

    if (stringDate) {
        const date = parseISO(stringDate);
        result = formatRelative(date, new Date());
    }

    return result
};

export { convertDateString };

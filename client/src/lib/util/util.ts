import { type DateArg, format, formatDistanceToNow } from "date-fns";
import z from "zod";
// import { z } from "zod";

export function formatDate(date: DateArg<Date>) {
    return format(date, 'dd MMM yyyy h:mm a')
}

export function timeAgo(date: DateArg<Date>) {
    return formatDistanceToNow(date) + ' ago'
}


export const requiredString = (name: string) => 
    z.string().trim().min(1, { message: `${name} is required`  })
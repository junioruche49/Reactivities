import { z } from "zod";

const requiredString = (name: string) => 
    z.string().trim().min(1, { message: `${name} is required`  })

export const activityschema = z.object({
    title: requiredString("Title"),
    description: requiredString("Description"),
    category: requiredString("Category"),
    date: z.coerce.date<Date>({
        message: "Date is required"
    }),
    location: z.object({
        venue: requiredString("Venue"),
        city: z.string().optional(),
        latitude: z.coerce.number<number>(),
        longitude: z.coerce.number<number>()
    })
})

export type Activityschema = z.input<typeof activityschema>;

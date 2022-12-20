import { z } from "zod";
const mongodb = require('mongodb');

const generateObjectId = () => {
    return new mongodb.ObjectID().toString();
}

const metadataSchema = z.object({
    id: z
        .string()
        .length(24, {message: "Must be 24 characters long" })
        .default(generateObjectId)
});

const userDataSchema = metadataSchema.extend({
    userName: z.string().min(5, "Must be at least 5 characters"),
    userEmail: z.string().email({message: "Invalid email"})
});

// ObjectID
type inputObjectId = z.input<typeof metadataSchema>;
type outputObjectId = z.output<typeof metadataSchema>;
type inferredObjectId = z.infer<typeof metadataSchema>;
const testFail = metadataSchema.safeParse({ id: "test" })
const testSucceed = metadataSchema.parse({ id: "5f92cbf10cf217478ba93561" })
console.log(testFail)
console.log(testSucceed)

// userDataSchema
type inputUser = z.input<typeof userDataSchema>;
type outputUser = z.output<typeof userDataSchema>;
type inferredUser = z.infer<typeof userDataSchema>;
const testUserFail = userDataSchema.safeParse({userName: "dwalton", userEmail: "foo@barcom"})
const testUserSucceed = userDataSchema.parse({userName: "dwalton", userEmail: "foo@bar.com"});
const testUserSucceedWithID = userDataSchema.parse({userName: "dwalton", userEmail: "foo@bar.com", id:"5f92cbf10cf217478ba93561"});
console.log(testUserFail);
console.log(testUserSucceed);
console.log(testUserSucceedWithID);

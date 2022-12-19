import { z } from "zod";

const toNumber = (val: any) =>
    typeof val === "number" ? val : Number(val);
const schema = z.object({
    data: z
        .coerce.number()
        .transform((val) => toNumber(val))
});
type input = z.input<typeof schema>; // { data: number}
type output = z.output<typeof schema>; // { data: number }
type inferred = z.infer<typeof schema>; // same as output
const value = schema.parse({ data: "123456" }); // value == { data : 123456}

interface genericThirdPartyType<T> {
    genericData: T;
}

const matchingSchema: z.ZodType<genericThirdPartyType<inferred>> = z.object({
    genericData: schema
}); // will flag as typescript error...try it for yourself

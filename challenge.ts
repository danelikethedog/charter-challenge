import { z } from "zod";

// Option 1 with extra schema inside

const containedSchema = z.custom<{ data: number }>()
    .transform((arg) => Number(arg.data))
    .transform((arg, ctx) => {
        const localSchema = z.object({
            data: z.number()
        });
        return localSchema.parse({ data: arg });
    })
type inputContainedType = z.input<typeof containedSchema>;
type outputContainedType = z.output<typeof containedSchema>;
type inferContainedType = z.infer<typeof containedSchema>;
const containedString = containedSchema.parse({ data: "100" });
const containedNumber = containedSchema.parse({ data: 200 });
const containedBoolean = containedSchema.parse({ data: true })
console.log(containedString)
console.log(containedNumber)
console.log(containedBoolean)

interface genericThirdPartyType<T> {
    genericData: T;
}

const matchingSchemaContained: z.ZodType<genericThirdPartyType<inferContainedType>> = z.object({
    genericData: containedSchema
});

// Option 2 with extra schema outside

const privateSchema = z.object({
    data: z.number()
});
const finalSchema = z.custom<{ data: number }>()
    .transform((arg) => Number(arg.data))
    .transform((arg, ctx) => privateSchema.parse({ data: arg }))
type inputFinalType = z.input<typeof finalSchema>; // { data: number}
type outputFinalType = z.output<typeof finalSchema>; // { data: number}
type inferFinalType = z.infer<typeof finalSchema>;
const tester = finalSchema.parse({ data: "100" }); // pass
const tester2 = finalSchema.parse({ data: 200 }); // pass
const tester3 = finalSchema.parse({ data: true }); //pass
console.log(tester);
console.log(tester2);
console.log(tester3);

interface genericThirdPartyType<T> {
    genericData: T;
}

const matchingSchemaFinal: z.ZodType<genericThirdPartyType<inferFinalType>> = z.object({
    genericData: finalSchema
});

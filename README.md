# Charter Challenge

## Steps Taken

* Set up repo in which to work.
* Dump basic knowledge into README to understand problem.
* Create a `challenge.ts` file to write answer.
* Create a `demo.ts` file with code from problem statement as baseline.
* Pull in Zod as a submodule for reference.
    * Removed since causes build issues.
* Create a `package.json` and `tsconfig.json` file for respective purposes.
* Read through zod documentation to understand it's breadth and came on "JSON type" section which allows you to "validate any JSON value, you can use the snippet below". Trying that snippet.
    * Looks like its overkill for these purposes.
* Reading "preprocess" section...looks interesting.
    > "apply some transform to the input before parsing happens. A common use case: type coercion."
* Looks like new way of doing that is via "coercion". Trying that.
    * It looks to me like it works?

## Notes

### Understand Problem

* Take schema object and allow it to parse any unknown primitive into a number
    * In C, we would make this a `void *` and either do some cast or convert.
    * Zod has `any()`, `unknown()`, and `void()`. Let's look into that.
    * Typescript has an `any` type. Might be useful ([docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)).

### Useful Info

* [Typescript type info and choosing a type](https://www.typescriptlang.org/docs/handbook/type-inference.html)
    * Choose the super class type of all classes.
    * When no best common type is found, the resulting inference is the union array type of all types.

### Used Libs

* [Zod](https://github.com/colinhacks/zod)
    * Schema nesting / composition
        * Is what it sounds like
        * feels initially like struct within struct in C
    * pre / post parse transformation
        * Is this basically marshalling?
    * custom validation
        * Seems it is what it sounds like...make sure things are as they should.



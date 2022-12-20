# Charter Challenge

## Steps Taken

[Link to File for Answer](./challenge.ts)

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
    * It looks to me like it works? [LINK TO WHAT I BELIEVE IS THE ANSWER](https://github.com/danelikethedog/charter-challenge/blob/b90f2481fd1bf1ed97413cf7c496267ce5025839/challenge.ts#L7)

## Bonus - Steps Taken

[Link to File for Answer](./bonus.ts)

metadata schema that stores MongoDB's ObjectId

**For both schemas, the input and output types should not be different from each other**

* Looks like Zod has predefined types but based on the sample code, can create one with `z.ZodType<genericThirdPartyType<inferred>>()`?
    * After a bit, not sure this is needed.
* Have to figure out how to use MongoDB
    * Finding client MongoDB docs/examples
* Background on ObjectID
    > Every document in the collection has an “_id” field that is used to uniquely identify the document in a particular collection it acts as the primary key for the documents in the collection. “_id” field can be used in any format and the default format is ObjectId of the document.
    > An ObjectID is a 12-byte Field Of BSON type
    >   * The first 4 bytes representing the Unix Timestamp of the document
    >   * The next 3 bytes are the machine Id on which the MongoDB server is running.
    >   * The next 2 bytes are of process id
    >   * The last Field is 3 bytes used for increment the objectid.
    * [Link to doc](https://www.geeksforgeeks.org/what-is-objectid-in-mongodb/)
* Object Id is created as a string identifier.
* Trivial answer seems to be make the ID a string?
    * Can use the `refine()` to make sure it's a certain format
* Extend that with `.extend()` and add whatever is needed for the user data.
* On second thought I think we should actually use the mongodb lib here. Importing it to generate one if needed.
* ID should be 24 so can use validate to check the length.
    * Looks like there's a helper that does that for ease. Switching to `.length()` check.
* Going to use `username` and `email` as basic fillers for the extended schema.
    * Using some of the fancier checkers you get out of the box with Zod.
* How to generate the ID is one isn't passed?
    * Maybe some default?
    * Looks like if something is passed as "undefined", it will use from `.default()`. Else it will go through the validation check.


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

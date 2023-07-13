import * as Eq from "fp-ts/Eq";
/**
 * Create an Eq from a non-undefinable value and makes it accept undefined
 * @param eq The non nullable Eq to add to
 * @returns The updated Eq which accepts undefined
 */
export declare const undefinedEq: <T>(eq: Eq.Eq<T>) => Eq.Eq<T | undefined>;
/**
 * An Eq which compares by transforming based on a mapping function and then applying the Eq to it
 * @param map The mapping function to map values to
 * @param eq The Eq which takes the value which the map returns
 * @returns An Eq which takes the input of the mapping function
 */
export declare const mapThenEq: <A, B>(map: (x: A) => B, eq: Eq.Eq<B>) => Eq.Eq<A>;
/**
 * An Eq which checks equality of 2 string in a case insensitive way
 */
export declare const stringCaseInsensitiveEq: Eq.Eq<string>;
/**
 * An Eq that does equality check with Lodash's isEqual function
 */
export declare const lodashIsEqualEq: Eq.Eq<any>;

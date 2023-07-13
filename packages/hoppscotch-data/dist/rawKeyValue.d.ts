import * as E from "fp-ts/Either";
export declare type RawKeyValueEntry = {
    key: string;
    value: string;
    active: boolean;
};
/**
 * Converts Raw Key Value Entries to the file string format
 * @param entries The entries array
 * @returns The entries in string format
 */
export declare const rawKeyValueEntriesToString: (entries: RawKeyValueEntry[]) => string;
/**
 * Parses raw key value entries string to array
 * @param s The file string to parse from
 * @returns Either the parser fail result or the raw key value entries
 */
export declare const parseRawKeyValueEntriesE: (s: string) => E.Either<{
    message: string;
    expected: string[];
    pos: number;
}, readonly RawKeyValueEntry[]>;
/**
 * Less error tolerating version of `parseRawKeyValueEntriesE`
 * @param s The file string to parse from
 * @returns Either the parser fail result or the raw key value entries
 */
export declare const strictParseRawKeyValueEntriesE: (s: string) => E.Either<{
    message: string;
    expected: string[];
    pos: number;
}, readonly RawKeyValueEntry[]>;
/**
 * Kept for legacy code compatibility, parses raw key value entries.
 * If failed, it returns an empty array
 * @deprecated Use `parseRawKeyValueEntriesE` instead
 */
export declare const parseRawKeyValueEntries: (s: string) => RawKeyValueEntry[];

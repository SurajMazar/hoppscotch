import * as t from 'io-ts';
interface EmailBrand {
    readonly Email: unique symbol;
}
export declare const EmailCodec: t.BrandC<t.StringC, EmailBrand>;
export type Email = t.TypeOf<typeof EmailCodec>;
export {};

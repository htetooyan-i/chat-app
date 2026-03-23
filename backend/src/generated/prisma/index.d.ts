
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserToken
 * 
 */
export type UserToken = $Result.DefaultSelection<Prisma.$UserTokenPayload>
/**
 * Model Server
 * 
 */
export type Server = $Result.DefaultSelection<Prisma.$ServerPayload>
/**
 * Model Ban
 * 
 */
export type Ban = $Result.DefaultSelection<Prisma.$BanPayload>
/**
 * Model ServerMember
 * 
 */
export type ServerMember = $Result.DefaultSelection<Prisma.$ServerMemberPayload>
/**
 * Model Channel
 * 
 */
export type Channel = $Result.DefaultSelection<Prisma.$ChannelPayload>
/**
 * Model ServerInvite
 * 
 */
export type ServerInvite = $Result.DefaultSelection<Prisma.$ServerInvitePayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model Attachment
 * 
 */
export type Attachment = $Result.DefaultSelection<Prisma.$AttachmentPayload>
/**
 * Model Reaction
 * 
 */
export type Reaction = $Result.DefaultSelection<Prisma.$ReactionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const VerifyTokenType: {
  EMAIL_VERIFICATION: 'EMAIL_VERIFICATION',
  PASSWORD_RESET: 'PASSWORD_RESET',
  PHONE_VERIFICATION: 'PHONE_VERIFICATION'
};

export type VerifyTokenType = (typeof VerifyTokenType)[keyof typeof VerifyTokenType]


export const MemberRole: {
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR',
  MEMBER: 'MEMBER',
  OWNER: 'OWNER'
};

export type MemberRole = (typeof MemberRole)[keyof typeof MemberRole]


export const ChannelType: {
  TEXT: 'TEXT',
  ANNOUNCEMENT: 'ANNOUNCEMENT',
  BUSINESS: 'BUSINESS'
};

export type ChannelType = (typeof ChannelType)[keyof typeof ChannelType]


export const BanAppealStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REVOKED: 'REVOKED',
  REJECTED: 'REJECTED',
  SUPERSEDED: 'SUPERSEDED'
};

export type BanAppealStatus = (typeof BanAppealStatus)[keyof typeof BanAppealStatus]


export const AttachmentType: {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  RAW: 'RAW',
  GIF: 'GIF'
};

export type AttachmentType = (typeof AttachmentType)[keyof typeof AttachmentType]

}

export type VerifyTokenType = $Enums.VerifyTokenType

export const VerifyTokenType: typeof $Enums.VerifyTokenType

export type MemberRole = $Enums.MemberRole

export const MemberRole: typeof $Enums.MemberRole

export type ChannelType = $Enums.ChannelType

export const ChannelType: typeof $Enums.ChannelType

export type BanAppealStatus = $Enums.BanAppealStatus

export const BanAppealStatus: typeof $Enums.BanAppealStatus

export type AttachmentType = $Enums.AttachmentType

export const AttachmentType: typeof $Enums.AttachmentType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userToken`: Exposes CRUD operations for the **UserToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserTokens
    * const userTokens = await prisma.userToken.findMany()
    * ```
    */
  get userToken(): Prisma.UserTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.server`: Exposes CRUD operations for the **Server** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Servers
    * const servers = await prisma.server.findMany()
    * ```
    */
  get server(): Prisma.ServerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ban`: Exposes CRUD operations for the **Ban** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bans
    * const bans = await prisma.ban.findMany()
    * ```
    */
  get ban(): Prisma.BanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serverMember`: Exposes CRUD operations for the **ServerMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServerMembers
    * const serverMembers = await prisma.serverMember.findMany()
    * ```
    */
  get serverMember(): Prisma.ServerMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.channel`: Exposes CRUD operations for the **Channel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Channels
    * const channels = await prisma.channel.findMany()
    * ```
    */
  get channel(): Prisma.ChannelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serverInvite`: Exposes CRUD operations for the **ServerInvite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServerInvites
    * const serverInvites = await prisma.serverInvite.findMany()
    * ```
    */
  get serverInvite(): Prisma.ServerInviteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attachment`: Exposes CRUD operations for the **Attachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attachments
    * const attachments = await prisma.attachment.findMany()
    * ```
    */
  get attachment(): Prisma.AttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reaction`: Exposes CRUD operations for the **Reaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reactions
    * const reactions = await prisma.reaction.findMany()
    * ```
    */
  get reaction(): Prisma.ReactionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserToken: 'UserToken',
    Server: 'Server',
    Ban: 'Ban',
    ServerMember: 'ServerMember',
    Channel: 'Channel',
    ServerInvite: 'ServerInvite',
    Message: 'Message',
    Attachment: 'Attachment',
    Reaction: 'Reaction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userToken" | "server" | "ban" | "serverMember" | "channel" | "serverInvite" | "message" | "attachment" | "reaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserToken: {
        payload: Prisma.$UserTokenPayload<ExtArgs>
        fields: Prisma.UserTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTokenPayload>
          }
          findFirst: {
            args: Prisma.UserTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTokenPayload>
          }
          findMany: {
            args: Prisma.UserTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTokenPayload>[]
          }
          create: {
            args: Prisma.UserTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTokenPayload>
          }
          createMany: {
            args: Prisma.UserTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTokenPayload>[]
          }
          delete: {
            args: Prisma.UserTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTokenPayload>
          }
          update: {
            args: Prisma.UserTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTokenPayload>
          }
          deleteMany: {
            args: Prisma.UserTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTokenPayload>[]
          }
          upsert: {
            args: Prisma.UserTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTokenPayload>
          }
          aggregate: {
            args: Prisma.UserTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserToken>
          }
          groupBy: {
            args: Prisma.UserTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserTokenCountArgs<ExtArgs>
            result: $Utils.Optional<UserTokenCountAggregateOutputType> | number
          }
        }
      }
      Server: {
        payload: Prisma.$ServerPayload<ExtArgs>
        fields: Prisma.ServerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          findFirst: {
            args: Prisma.ServerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          findMany: {
            args: Prisma.ServerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>[]
          }
          create: {
            args: Prisma.ServerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          createMany: {
            args: Prisma.ServerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>[]
          }
          delete: {
            args: Prisma.ServerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          update: {
            args: Prisma.ServerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          deleteMany: {
            args: Prisma.ServerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>[]
          }
          upsert: {
            args: Prisma.ServerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          aggregate: {
            args: Prisma.ServerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServer>
          }
          groupBy: {
            args: Prisma.ServerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServerCountArgs<ExtArgs>
            result: $Utils.Optional<ServerCountAggregateOutputType> | number
          }
        }
      }
      Ban: {
        payload: Prisma.$BanPayload<ExtArgs>
        fields: Prisma.BanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BanPayload>
          }
          findFirst: {
            args: Prisma.BanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BanPayload>
          }
          findMany: {
            args: Prisma.BanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BanPayload>[]
          }
          create: {
            args: Prisma.BanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BanPayload>
          }
          createMany: {
            args: Prisma.BanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BanPayload>[]
          }
          delete: {
            args: Prisma.BanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BanPayload>
          }
          update: {
            args: Prisma.BanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BanPayload>
          }
          deleteMany: {
            args: Prisma.BanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BanPayload>[]
          }
          upsert: {
            args: Prisma.BanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BanPayload>
          }
          aggregate: {
            args: Prisma.BanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBan>
          }
          groupBy: {
            args: Prisma.BanGroupByArgs<ExtArgs>
            result: $Utils.Optional<BanGroupByOutputType>[]
          }
          count: {
            args: Prisma.BanCountArgs<ExtArgs>
            result: $Utils.Optional<BanCountAggregateOutputType> | number
          }
        }
      }
      ServerMember: {
        payload: Prisma.$ServerMemberPayload<ExtArgs>
        fields: Prisma.ServerMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServerMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServerMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>
          }
          findFirst: {
            args: Prisma.ServerMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServerMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>
          }
          findMany: {
            args: Prisma.ServerMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>[]
          }
          create: {
            args: Prisma.ServerMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>
          }
          createMany: {
            args: Prisma.ServerMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServerMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>[]
          }
          delete: {
            args: Prisma.ServerMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>
          }
          update: {
            args: Prisma.ServerMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>
          }
          deleteMany: {
            args: Prisma.ServerMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServerMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServerMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>[]
          }
          upsert: {
            args: Prisma.ServerMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerMemberPayload>
          }
          aggregate: {
            args: Prisma.ServerMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServerMember>
          }
          groupBy: {
            args: Prisma.ServerMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServerMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServerMemberCountArgs<ExtArgs>
            result: $Utils.Optional<ServerMemberCountAggregateOutputType> | number
          }
        }
      }
      Channel: {
        payload: Prisma.$ChannelPayload<ExtArgs>
        fields: Prisma.ChannelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChannelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChannelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          findFirst: {
            args: Prisma.ChannelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChannelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          findMany: {
            args: Prisma.ChannelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>[]
          }
          create: {
            args: Prisma.ChannelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          createMany: {
            args: Prisma.ChannelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChannelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>[]
          }
          delete: {
            args: Prisma.ChannelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          update: {
            args: Prisma.ChannelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          deleteMany: {
            args: Prisma.ChannelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChannelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChannelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>[]
          }
          upsert: {
            args: Prisma.ChannelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          aggregate: {
            args: Prisma.ChannelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChannel>
          }
          groupBy: {
            args: Prisma.ChannelGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChannelGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChannelCountArgs<ExtArgs>
            result: $Utils.Optional<ChannelCountAggregateOutputType> | number
          }
        }
      }
      ServerInvite: {
        payload: Prisma.$ServerInvitePayload<ExtArgs>
        fields: Prisma.ServerInviteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServerInviteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServerInviteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>
          }
          findFirst: {
            args: Prisma.ServerInviteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServerInviteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>
          }
          findMany: {
            args: Prisma.ServerInviteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>[]
          }
          create: {
            args: Prisma.ServerInviteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>
          }
          createMany: {
            args: Prisma.ServerInviteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServerInviteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>[]
          }
          delete: {
            args: Prisma.ServerInviteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>
          }
          update: {
            args: Prisma.ServerInviteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>
          }
          deleteMany: {
            args: Prisma.ServerInviteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServerInviteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServerInviteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>[]
          }
          upsert: {
            args: Prisma.ServerInviteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerInvitePayload>
          }
          aggregate: {
            args: Prisma.ServerInviteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServerInvite>
          }
          groupBy: {
            args: Prisma.ServerInviteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServerInviteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServerInviteCountArgs<ExtArgs>
            result: $Utils.Optional<ServerInviteCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      Attachment: {
        payload: Prisma.$AttachmentPayload<ExtArgs>
        fields: Prisma.AttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          findFirst: {
            args: Prisma.AttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          findMany: {
            args: Prisma.AttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          create: {
            args: Prisma.AttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          createMany: {
            args: Prisma.AttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          delete: {
            args: Prisma.AttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          update: {
            args: Prisma.AttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          deleteMany: {
            args: Prisma.AttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          upsert: {
            args: Prisma.AttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          aggregate: {
            args: Prisma.AttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttachment>
          }
          groupBy: {
            args: Prisma.AttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<AttachmentCountAggregateOutputType> | number
          }
        }
      }
      Reaction: {
        payload: Prisma.$ReactionPayload<ExtArgs>
        fields: Prisma.ReactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          findFirst: {
            args: Prisma.ReactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          findMany: {
            args: Prisma.ReactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>[]
          }
          create: {
            args: Prisma.ReactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          createMany: {
            args: Prisma.ReactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>[]
          }
          delete: {
            args: Prisma.ReactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          update: {
            args: Prisma.ReactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          deleteMany: {
            args: Prisma.ReactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>[]
          }
          upsert: {
            args: Prisma.ReactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          aggregate: {
            args: Prisma.ReactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReaction>
          }
          groupBy: {
            args: Prisma.ReactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReactionCountArgs<ExtArgs>
            result: $Utils.Optional<ReactionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userToken?: UserTokenOmit
    server?: ServerOmit
    ban?: BanOmit
    serverMember?: ServerMemberOmit
    channel?: ChannelOmit
    serverInvite?: ServerInviteOmit
    message?: MessageOmit
    attachment?: AttachmentOmit
    reaction?: ReactionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    tokens: number
    memberships: number
    ownedServers: number
    createdInvites: number
    bans: number
    messages: number
    reactions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tokens?: boolean | UserCountOutputTypeCountTokensArgs
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs
    ownedServers?: boolean | UserCountOutputTypeCountOwnedServersArgs
    createdInvites?: boolean | UserCountOutputTypeCountCreatedInvitesArgs
    bans?: boolean | UserCountOutputTypeCountBansArgs
    messages?: boolean | UserCountOutputTypeCountMessagesArgs
    reactions?: boolean | UserCountOutputTypeCountReactionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedServersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerInviteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReactionWhereInput
  }


  /**
   * Count Type ServerCountOutputType
   */

  export type ServerCountOutputType = {
    members: number
    channels: number
    invites: number
    bans: number
  }

  export type ServerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | ServerCountOutputTypeCountMembersArgs
    channels?: boolean | ServerCountOutputTypeCountChannelsArgs
    invites?: boolean | ServerCountOutputTypeCountInvitesArgs
    bans?: boolean | ServerCountOutputTypeCountBansArgs
  }

  // Custom InputTypes
  /**
   * ServerCountOutputType without action
   */
  export type ServerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerCountOutputType
     */
    select?: ServerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServerCountOutputType without action
   */
  export type ServerCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerMemberWhereInput
  }

  /**
   * ServerCountOutputType without action
   */
  export type ServerCountOutputTypeCountChannelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelWhereInput
  }

  /**
   * ServerCountOutputType without action
   */
  export type ServerCountOutputTypeCountInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerInviteWhereInput
  }

  /**
   * ServerCountOutputType without action
   */
  export type ServerCountOutputTypeCountBansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BanWhereInput
  }


  /**
   * Count Type ChannelCountOutputType
   */

  export type ChannelCountOutputType = {
    messages: number
    attachments: number
  }

  export type ChannelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ChannelCountOutputTypeCountMessagesArgs
    attachments?: boolean | ChannelCountOutputTypeCountAttachmentsArgs
  }

  // Custom InputTypes
  /**
   * ChannelCountOutputType without action
   */
  export type ChannelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelCountOutputType
     */
    select?: ChannelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChannelCountOutputType without action
   */
  export type ChannelCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * ChannelCountOutputType without action
   */
  export type ChannelCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
  }


  /**
   * Count Type MessageCountOutputType
   */

  export type MessageCountOutputType = {
    replies: number
    attachments: number
    reactions: number
  }

  export type MessageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | MessageCountOutputTypeCountRepliesArgs
    attachments?: boolean | MessageCountOutputTypeCountAttachmentsArgs
    reactions?: boolean | MessageCountOutputTypeCountReactionsArgs
  }

  // Custom InputTypes
  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageCountOutputType
     */
    select?: MessageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountReactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    username: string | null
    passwordHash: string | null
    avatarUrl: string | null
    bio: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    username: string | null
    passwordHash: string | null
    avatarUrl: string | null
    bio: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    passwordHash: number
    avatarUrl: number
    bio: number
    verified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    passwordHash?: true
    avatarUrl?: true
    bio?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    passwordHash?: true
    avatarUrl?: true
    bio?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    passwordHash?: true
    avatarUrl?: true
    bio?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    username: string
    passwordHash: string
    avatarUrl: string | null
    bio: string | null
    verified: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    avatarUrl?: boolean
    bio?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tokens?: boolean | User$tokensArgs<ExtArgs>
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    ownedServers?: boolean | User$ownedServersArgs<ExtArgs>
    createdInvites?: boolean | User$createdInvitesArgs<ExtArgs>
    bans?: boolean | User$bansArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    reactions?: boolean | User$reactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    avatarUrl?: boolean
    bio?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    avatarUrl?: boolean
    bio?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    avatarUrl?: boolean
    bio?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "username" | "passwordHash" | "avatarUrl" | "bio" | "verified" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tokens?: boolean | User$tokensArgs<ExtArgs>
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    ownedServers?: boolean | User$ownedServersArgs<ExtArgs>
    createdInvites?: boolean | User$createdInvitesArgs<ExtArgs>
    bans?: boolean | User$bansArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    reactions?: boolean | User$reactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      tokens: Prisma.$UserTokenPayload<ExtArgs>[]
      memberships: Prisma.$ServerMemberPayload<ExtArgs>[]
      ownedServers: Prisma.$ServerPayload<ExtArgs>[]
      createdInvites: Prisma.$ServerInvitePayload<ExtArgs>[]
      bans: Prisma.$BanPayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
      reactions: Prisma.$ReactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      username: string
      passwordHash: string
      avatarUrl: string | null
      bio: string | null
      verified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tokens<T extends User$tokensArgs<ExtArgs> = {}>(args?: Subset<T, User$tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ownedServers<T extends User$ownedServersArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedServersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdInvites<T extends User$createdInvitesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdInvitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bans<T extends User$bansArgs<ExtArgs> = {}>(args?: Subset<T, User$bansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends User$messagesArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reactions<T extends User$reactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$reactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly verified: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.tokens
   */
  export type User$tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserToken
     */
    omit?: UserTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTokenInclude<ExtArgs> | null
    where?: UserTokenWhereInput
    orderBy?: UserTokenOrderByWithRelationInput | UserTokenOrderByWithRelationInput[]
    cursor?: UserTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserTokenScalarFieldEnum | UserTokenScalarFieldEnum[]
  }

  /**
   * User.memberships
   */
  export type User$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    where?: ServerMemberWhereInput
    orderBy?: ServerMemberOrderByWithRelationInput | ServerMemberOrderByWithRelationInput[]
    cursor?: ServerMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServerMemberScalarFieldEnum | ServerMemberScalarFieldEnum[]
  }

  /**
   * User.ownedServers
   */
  export type User$ownedServersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    where?: ServerWhereInput
    orderBy?: ServerOrderByWithRelationInput | ServerOrderByWithRelationInput[]
    cursor?: ServerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServerScalarFieldEnum | ServerScalarFieldEnum[]
  }

  /**
   * User.createdInvites
   */
  export type User$createdInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    where?: ServerInviteWhereInput
    orderBy?: ServerInviteOrderByWithRelationInput | ServerInviteOrderByWithRelationInput[]
    cursor?: ServerInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServerInviteScalarFieldEnum | ServerInviteScalarFieldEnum[]
  }

  /**
   * User.bans
   */
  export type User$bansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ban
     */
    select?: BanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ban
     */
    omit?: BanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BanInclude<ExtArgs> | null
    where?: BanWhereInput
    orderBy?: BanOrderByWithRelationInput | BanOrderByWithRelationInput[]
    cursor?: BanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BanScalarFieldEnum | BanScalarFieldEnum[]
  }

  /**
   * User.messages
   */
  export type User$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.reactions
   */
  export type User$reactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    where?: ReactionWhereInput
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    cursor?: ReactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReactionScalarFieldEnum | ReactionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserToken
   */

  export type AggregateUserToken = {
    _count: UserTokenCountAggregateOutputType | null
    _avg: UserTokenAvgAggregateOutputType | null
    _sum: UserTokenSumAggregateOutputType | null
    _min: UserTokenMinAggregateOutputType | null
    _max: UserTokenMaxAggregateOutputType | null
  }

  export type UserTokenAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserTokenSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserTokenMinAggregateOutputType = {
    id: number | null
    userId: number | null
    token: string | null
    type: $Enums.VerifyTokenType | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
  }

  export type UserTokenMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    token: string | null
    type: $Enums.VerifyTokenType | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
  }

  export type UserTokenCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    type: number
    expiresAt: number
    used: number
    createdAt: number
    _all: number
  }


  export type UserTokenAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserTokenSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserTokenMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    type?: true
    expiresAt?: true
    used?: true
    createdAt?: true
  }

  export type UserTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    type?: true
    expiresAt?: true
    used?: true
    createdAt?: true
  }

  export type UserTokenCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    type?: true
    expiresAt?: true
    used?: true
    createdAt?: true
    _all?: true
  }

  export type UserTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserToken to aggregate.
     */
    where?: UserTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTokens to fetch.
     */
    orderBy?: UserTokenOrderByWithRelationInput | UserTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserTokens
    **/
    _count?: true | UserTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserTokenMaxAggregateInputType
  }

  export type GetUserTokenAggregateType<T extends UserTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateUserToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserToken[P]>
      : GetScalarType<T[P], AggregateUserToken[P]>
  }




  export type UserTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserTokenWhereInput
    orderBy?: UserTokenOrderByWithAggregationInput | UserTokenOrderByWithAggregationInput[]
    by: UserTokenScalarFieldEnum[] | UserTokenScalarFieldEnum
    having?: UserTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserTokenCountAggregateInputType | true
    _avg?: UserTokenAvgAggregateInputType
    _sum?: UserTokenSumAggregateInputType
    _min?: UserTokenMinAggregateInputType
    _max?: UserTokenMaxAggregateInputType
  }

  export type UserTokenGroupByOutputType = {
    id: number
    userId: number
    token: string
    type: $Enums.VerifyTokenType
    expiresAt: Date
    used: boolean
    createdAt: Date
    _count: UserTokenCountAggregateOutputType | null
    _avg: UserTokenAvgAggregateOutputType | null
    _sum: UserTokenSumAggregateOutputType | null
    _min: UserTokenMinAggregateOutputType | null
    _max: UserTokenMaxAggregateOutputType | null
  }

  type GetUserTokenGroupByPayload<T extends UserTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserTokenGroupByOutputType[P]>
            : GetScalarType<T[P], UserTokenGroupByOutputType[P]>
        }
      >
    >


  export type UserTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    type?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userToken"]>

  export type UserTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    type?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userToken"]>

  export type UserTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    type?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userToken"]>

  export type UserTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    type?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
  }

  export type UserTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "type" | "expiresAt" | "used" | "createdAt", ExtArgs["result"]["userToken"]>
  export type UserTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      token: string
      type: $Enums.VerifyTokenType
      expiresAt: Date
      used: boolean
      createdAt: Date
    }, ExtArgs["result"]["userToken"]>
    composites: {}
  }

  type UserTokenGetPayload<S extends boolean | null | undefined | UserTokenDefaultArgs> = $Result.GetResult<Prisma.$UserTokenPayload, S>

  type UserTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserTokenCountAggregateInputType | true
    }

  export interface UserTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserToken'], meta: { name: 'UserToken' } }
    /**
     * Find zero or one UserToken that matches the filter.
     * @param {UserTokenFindUniqueArgs} args - Arguments to find a UserToken
     * @example
     * // Get one UserToken
     * const userToken = await prisma.userToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserTokenFindUniqueArgs>(args: SelectSubset<T, UserTokenFindUniqueArgs<ExtArgs>>): Prisma__UserTokenClient<$Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserTokenFindUniqueOrThrowArgs} args - Arguments to find a UserToken
     * @example
     * // Get one UserToken
     * const userToken = await prisma.userToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, UserTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserTokenClient<$Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenFindFirstArgs} args - Arguments to find a UserToken
     * @example
     * // Get one UserToken
     * const userToken = await prisma.userToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserTokenFindFirstArgs>(args?: SelectSubset<T, UserTokenFindFirstArgs<ExtArgs>>): Prisma__UserTokenClient<$Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenFindFirstOrThrowArgs} args - Arguments to find a UserToken
     * @example
     * // Get one UserToken
     * const userToken = await prisma.userToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, UserTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserTokenClient<$Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserTokens
     * const userTokens = await prisma.userToken.findMany()
     * 
     * // Get first 10 UserTokens
     * const userTokens = await prisma.userToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userTokenWithIdOnly = await prisma.userToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserTokenFindManyArgs>(args?: SelectSubset<T, UserTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserToken.
     * @param {UserTokenCreateArgs} args - Arguments to create a UserToken.
     * @example
     * // Create one UserToken
     * const UserToken = await prisma.userToken.create({
     *   data: {
     *     // ... data to create a UserToken
     *   }
     * })
     * 
     */
    create<T extends UserTokenCreateArgs>(args: SelectSubset<T, UserTokenCreateArgs<ExtArgs>>): Prisma__UserTokenClient<$Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserTokens.
     * @param {UserTokenCreateManyArgs} args - Arguments to create many UserTokens.
     * @example
     * // Create many UserTokens
     * const userToken = await prisma.userToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserTokenCreateManyArgs>(args?: SelectSubset<T, UserTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserTokens and returns the data saved in the database.
     * @param {UserTokenCreateManyAndReturnArgs} args - Arguments to create many UserTokens.
     * @example
     * // Create many UserTokens
     * const userToken = await prisma.userToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserTokens and only return the `id`
     * const userTokenWithIdOnly = await prisma.userToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, UserTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserToken.
     * @param {UserTokenDeleteArgs} args - Arguments to delete one UserToken.
     * @example
     * // Delete one UserToken
     * const UserToken = await prisma.userToken.delete({
     *   where: {
     *     // ... filter to delete one UserToken
     *   }
     * })
     * 
     */
    delete<T extends UserTokenDeleteArgs>(args: SelectSubset<T, UserTokenDeleteArgs<ExtArgs>>): Prisma__UserTokenClient<$Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserToken.
     * @param {UserTokenUpdateArgs} args - Arguments to update one UserToken.
     * @example
     * // Update one UserToken
     * const userToken = await prisma.userToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserTokenUpdateArgs>(args: SelectSubset<T, UserTokenUpdateArgs<ExtArgs>>): Prisma__UserTokenClient<$Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserTokens.
     * @param {UserTokenDeleteManyArgs} args - Arguments to filter UserTokens to delete.
     * @example
     * // Delete a few UserTokens
     * const { count } = await prisma.userToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserTokenDeleteManyArgs>(args?: SelectSubset<T, UserTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserTokens
     * const userToken = await prisma.userToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserTokenUpdateManyArgs>(args: SelectSubset<T, UserTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserTokens and returns the data updated in the database.
     * @param {UserTokenUpdateManyAndReturnArgs} args - Arguments to update many UserTokens.
     * @example
     * // Update many UserTokens
     * const userToken = await prisma.userToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserTokens and only return the `id`
     * const userTokenWithIdOnly = await prisma.userToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, UserTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserToken.
     * @param {UserTokenUpsertArgs} args - Arguments to update or create a UserToken.
     * @example
     * // Update or create a UserToken
     * const userToken = await prisma.userToken.upsert({
     *   create: {
     *     // ... data to create a UserToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserToken we want to update
     *   }
     * })
     */
    upsert<T extends UserTokenUpsertArgs>(args: SelectSubset<T, UserTokenUpsertArgs<ExtArgs>>): Prisma__UserTokenClient<$Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenCountArgs} args - Arguments to filter UserTokens to count.
     * @example
     * // Count the number of UserTokens
     * const count = await prisma.userToken.count({
     *   where: {
     *     // ... the filter for the UserTokens we want to count
     *   }
     * })
    **/
    count<T extends UserTokenCountArgs>(
      args?: Subset<T, UserTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserTokenAggregateArgs>(args: Subset<T, UserTokenAggregateArgs>): Prisma.PrismaPromise<GetUserTokenAggregateType<T>>

    /**
     * Group by UserToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserTokenGroupByArgs['orderBy'] }
        : { orderBy?: UserTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserToken model
   */
  readonly fields: UserTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserToken model
   */
  interface UserTokenFieldRefs {
    readonly id: FieldRef<"UserToken", 'Int'>
    readonly userId: FieldRef<"UserToken", 'Int'>
    readonly token: FieldRef<"UserToken", 'String'>
    readonly type: FieldRef<"UserToken", 'VerifyTokenType'>
    readonly expiresAt: FieldRef<"UserToken", 'DateTime'>
    readonly used: FieldRef<"UserToken", 'Boolean'>
    readonly createdAt: FieldRef<"UserToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserToken findUnique
   */
  export type UserTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserToken
     */
    omit?: UserTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTokenInclude<ExtArgs> | null
    /**
     * Filter, which UserToken to fetch.
     */
    where: UserTokenWhereUniqueInput
  }

  /**
   * UserToken findUniqueOrThrow
   */
  export type UserTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserToken
     */
    omit?: UserTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTokenInclude<ExtArgs> | null
    /**
     * Filter, which UserToken to fetch.
     */
    where: UserTokenWhereUniqueInput
  }

  /**
   * UserToken findFirst
   */
  export type UserTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserToken
     */
    omit?: UserTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTokenInclude<ExtArgs> | null
    /**
     * Filter, which UserToken to fetch.
     */
    where?: UserTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTokens to fetch.
     */
    orderBy?: UserTokenOrderByWithRelationInput | UserTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserTokens.
     */
    cursor?: UserTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserTokens.
     */
    distinct?: UserTokenScalarFieldEnum | UserTokenScalarFieldEnum[]
  }

  /**
   * UserToken findFirstOrThrow
   */
  export type UserTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserToken
     */
    omit?: UserTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTokenInclude<ExtArgs> | null
    /**
     * Filter, which UserToken to fetch.
     */
    where?: UserTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTokens to fetch.
     */
    orderBy?: UserTokenOrderByWithRelationInput | UserTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserTokens.
     */
    cursor?: UserTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserTokens.
     */
    distinct?: UserTokenScalarFieldEnum | UserTokenScalarFieldEnum[]
  }

  /**
   * UserToken findMany
   */
  export type UserTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserToken
     */
    omit?: UserTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTokenInclude<ExtArgs> | null
    /**
     * Filter, which UserTokens to fetch.
     */
    where?: UserTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTokens to fetch.
     */
    orderBy?: UserTokenOrderByWithRelationInput | UserTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserTokens.
     */
    cursor?: UserTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserTokens.
     */
    distinct?: UserTokenScalarFieldEnum | UserTokenScalarFieldEnum[]
  }

  /**
   * UserToken create
   */
  export type UserTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserToken
     */
    omit?: UserTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a UserToken.
     */
    data: XOR<UserTokenCreateInput, UserTokenUncheckedCreateInput>
  }

  /**
   * UserToken createMany
   */
  export type UserTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserTokens.
     */
    data: UserTokenCreateManyInput | UserTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserToken createManyAndReturn
   */
  export type UserTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserToken
     */
    omit?: UserTokenOmit<ExtArgs> | null
    /**
     * The data used to create many UserTokens.
     */
    data: UserTokenCreateManyInput | UserTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserToken update
   */
  export type UserTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserToken
     */
    omit?: UserTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a UserToken.
     */
    data: XOR<UserTokenUpdateInput, UserTokenUncheckedUpdateInput>
    /**
     * Choose, which UserToken to update.
     */
    where: UserTokenWhereUniqueInput
  }

  /**
   * UserToken updateMany
   */
  export type UserTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserTokens.
     */
    data: XOR<UserTokenUpdateManyMutationInput, UserTokenUncheckedUpdateManyInput>
    /**
     * Filter which UserTokens to update
     */
    where?: UserTokenWhereInput
    /**
     * Limit how many UserTokens to update.
     */
    limit?: number
  }

  /**
   * UserToken updateManyAndReturn
   */
  export type UserTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserToken
     */
    omit?: UserTokenOmit<ExtArgs> | null
    /**
     * The data used to update UserTokens.
     */
    data: XOR<UserTokenUpdateManyMutationInput, UserTokenUncheckedUpdateManyInput>
    /**
     * Filter which UserTokens to update
     */
    where?: UserTokenWhereInput
    /**
     * Limit how many UserTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserToken upsert
   */
  export type UserTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserToken
     */
    omit?: UserTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the UserToken to update in case it exists.
     */
    where: UserTokenWhereUniqueInput
    /**
     * In case the UserToken found by the `where` argument doesn't exist, create a new UserToken with this data.
     */
    create: XOR<UserTokenCreateInput, UserTokenUncheckedCreateInput>
    /**
     * In case the UserToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserTokenUpdateInput, UserTokenUncheckedUpdateInput>
  }

  /**
   * UserToken delete
   */
  export type UserTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserToken
     */
    omit?: UserTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTokenInclude<ExtArgs> | null
    /**
     * Filter which UserToken to delete.
     */
    where: UserTokenWhereUniqueInput
  }

  /**
   * UserToken deleteMany
   */
  export type UserTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserTokens to delete
     */
    where?: UserTokenWhereInput
    /**
     * Limit how many UserTokens to delete.
     */
    limit?: number
  }

  /**
   * UserToken without action
   */
  export type UserTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserToken
     */
    omit?: UserTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTokenInclude<ExtArgs> | null
  }


  /**
   * Model Server
   */

  export type AggregateServer = {
    _count: ServerCountAggregateOutputType | null
    _avg: ServerAvgAggregateOutputType | null
    _sum: ServerSumAggregateOutputType | null
    _min: ServerMinAggregateOutputType | null
    _max: ServerMaxAggregateOutputType | null
  }

  export type ServerAvgAggregateOutputType = {
    id: number | null
    ownerId: number | null
  }

  export type ServerSumAggregateOutputType = {
    id: number | null
    ownerId: number | null
  }

  export type ServerMinAggregateOutputType = {
    id: number | null
    name: string | null
    avatarUrl: string | null
    ownerId: number | null
    createdAt: Date | null
  }

  export type ServerMaxAggregateOutputType = {
    id: number | null
    name: string | null
    avatarUrl: string | null
    ownerId: number | null
    createdAt: Date | null
  }

  export type ServerCountAggregateOutputType = {
    id: number
    name: number
    avatarUrl: number
    ownerId: number
    createdAt: number
    _all: number
  }


  export type ServerAvgAggregateInputType = {
    id?: true
    ownerId?: true
  }

  export type ServerSumAggregateInputType = {
    id?: true
    ownerId?: true
  }

  export type ServerMinAggregateInputType = {
    id?: true
    name?: true
    avatarUrl?: true
    ownerId?: true
    createdAt?: true
  }

  export type ServerMaxAggregateInputType = {
    id?: true
    name?: true
    avatarUrl?: true
    ownerId?: true
    createdAt?: true
  }

  export type ServerCountAggregateInputType = {
    id?: true
    name?: true
    avatarUrl?: true
    ownerId?: true
    createdAt?: true
    _all?: true
  }

  export type ServerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Server to aggregate.
     */
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     */
    orderBy?: ServerOrderByWithRelationInput | ServerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Servers
    **/
    _count?: true | ServerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServerMaxAggregateInputType
  }

  export type GetServerAggregateType<T extends ServerAggregateArgs> = {
        [P in keyof T & keyof AggregateServer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServer[P]>
      : GetScalarType<T[P], AggregateServer[P]>
  }




  export type ServerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerWhereInput
    orderBy?: ServerOrderByWithAggregationInput | ServerOrderByWithAggregationInput[]
    by: ServerScalarFieldEnum[] | ServerScalarFieldEnum
    having?: ServerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServerCountAggregateInputType | true
    _avg?: ServerAvgAggregateInputType
    _sum?: ServerSumAggregateInputType
    _min?: ServerMinAggregateInputType
    _max?: ServerMaxAggregateInputType
  }

  export type ServerGroupByOutputType = {
    id: number
    name: string
    avatarUrl: string | null
    ownerId: number
    createdAt: Date
    _count: ServerCountAggregateOutputType | null
    _avg: ServerAvgAggregateOutputType | null
    _sum: ServerSumAggregateOutputType | null
    _min: ServerMinAggregateOutputType | null
    _max: ServerMaxAggregateOutputType | null
  }

  type GetServerGroupByPayload<T extends ServerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServerGroupByOutputType[P]>
            : GetScalarType<T[P], ServerGroupByOutputType[P]>
        }
      >
    >


  export type ServerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    avatarUrl?: boolean
    ownerId?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Server$membersArgs<ExtArgs>
    channels?: boolean | Server$channelsArgs<ExtArgs>
    invites?: boolean | Server$invitesArgs<ExtArgs>
    bans?: boolean | Server$bansArgs<ExtArgs>
    _count?: boolean | ServerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["server"]>

  export type ServerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    avatarUrl?: boolean
    ownerId?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["server"]>

  export type ServerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    avatarUrl?: boolean
    ownerId?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["server"]>

  export type ServerSelectScalar = {
    id?: boolean
    name?: boolean
    avatarUrl?: boolean
    ownerId?: boolean
    createdAt?: boolean
  }

  export type ServerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "avatarUrl" | "ownerId" | "createdAt", ExtArgs["result"]["server"]>
  export type ServerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Server$membersArgs<ExtArgs>
    channels?: boolean | Server$channelsArgs<ExtArgs>
    invites?: boolean | Server$invitesArgs<ExtArgs>
    bans?: boolean | Server$bansArgs<ExtArgs>
    _count?: boolean | ServerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ServerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ServerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Server"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      members: Prisma.$ServerMemberPayload<ExtArgs>[]
      channels: Prisma.$ChannelPayload<ExtArgs>[]
      invites: Prisma.$ServerInvitePayload<ExtArgs>[]
      bans: Prisma.$BanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      avatarUrl: string | null
      ownerId: number
      createdAt: Date
    }, ExtArgs["result"]["server"]>
    composites: {}
  }

  type ServerGetPayload<S extends boolean | null | undefined | ServerDefaultArgs> = $Result.GetResult<Prisma.$ServerPayload, S>

  type ServerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServerCountAggregateInputType | true
    }

  export interface ServerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Server'], meta: { name: 'Server' } }
    /**
     * Find zero or one Server that matches the filter.
     * @param {ServerFindUniqueArgs} args - Arguments to find a Server
     * @example
     * // Get one Server
     * const server = await prisma.server.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServerFindUniqueArgs>(args: SelectSubset<T, ServerFindUniqueArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Server that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServerFindUniqueOrThrowArgs} args - Arguments to find a Server
     * @example
     * // Get one Server
     * const server = await prisma.server.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServerFindUniqueOrThrowArgs>(args: SelectSubset<T, ServerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Server that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerFindFirstArgs} args - Arguments to find a Server
     * @example
     * // Get one Server
     * const server = await prisma.server.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServerFindFirstArgs>(args?: SelectSubset<T, ServerFindFirstArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Server that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerFindFirstOrThrowArgs} args - Arguments to find a Server
     * @example
     * // Get one Server
     * const server = await prisma.server.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServerFindFirstOrThrowArgs>(args?: SelectSubset<T, ServerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Servers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Servers
     * const servers = await prisma.server.findMany()
     * 
     * // Get first 10 Servers
     * const servers = await prisma.server.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serverWithIdOnly = await prisma.server.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServerFindManyArgs>(args?: SelectSubset<T, ServerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Server.
     * @param {ServerCreateArgs} args - Arguments to create a Server.
     * @example
     * // Create one Server
     * const Server = await prisma.server.create({
     *   data: {
     *     // ... data to create a Server
     *   }
     * })
     * 
     */
    create<T extends ServerCreateArgs>(args: SelectSubset<T, ServerCreateArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Servers.
     * @param {ServerCreateManyArgs} args - Arguments to create many Servers.
     * @example
     * // Create many Servers
     * const server = await prisma.server.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServerCreateManyArgs>(args?: SelectSubset<T, ServerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Servers and returns the data saved in the database.
     * @param {ServerCreateManyAndReturnArgs} args - Arguments to create many Servers.
     * @example
     * // Create many Servers
     * const server = await prisma.server.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Servers and only return the `id`
     * const serverWithIdOnly = await prisma.server.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServerCreateManyAndReturnArgs>(args?: SelectSubset<T, ServerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Server.
     * @param {ServerDeleteArgs} args - Arguments to delete one Server.
     * @example
     * // Delete one Server
     * const Server = await prisma.server.delete({
     *   where: {
     *     // ... filter to delete one Server
     *   }
     * })
     * 
     */
    delete<T extends ServerDeleteArgs>(args: SelectSubset<T, ServerDeleteArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Server.
     * @param {ServerUpdateArgs} args - Arguments to update one Server.
     * @example
     * // Update one Server
     * const server = await prisma.server.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServerUpdateArgs>(args: SelectSubset<T, ServerUpdateArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Servers.
     * @param {ServerDeleteManyArgs} args - Arguments to filter Servers to delete.
     * @example
     * // Delete a few Servers
     * const { count } = await prisma.server.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServerDeleteManyArgs>(args?: SelectSubset<T, ServerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Servers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Servers
     * const server = await prisma.server.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServerUpdateManyArgs>(args: SelectSubset<T, ServerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Servers and returns the data updated in the database.
     * @param {ServerUpdateManyAndReturnArgs} args - Arguments to update many Servers.
     * @example
     * // Update many Servers
     * const server = await prisma.server.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Servers and only return the `id`
     * const serverWithIdOnly = await prisma.server.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServerUpdateManyAndReturnArgs>(args: SelectSubset<T, ServerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Server.
     * @param {ServerUpsertArgs} args - Arguments to update or create a Server.
     * @example
     * // Update or create a Server
     * const server = await prisma.server.upsert({
     *   create: {
     *     // ... data to create a Server
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Server we want to update
     *   }
     * })
     */
    upsert<T extends ServerUpsertArgs>(args: SelectSubset<T, ServerUpsertArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Servers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerCountArgs} args - Arguments to filter Servers to count.
     * @example
     * // Count the number of Servers
     * const count = await prisma.server.count({
     *   where: {
     *     // ... the filter for the Servers we want to count
     *   }
     * })
    **/
    count<T extends ServerCountArgs>(
      args?: Subset<T, ServerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Server.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServerAggregateArgs>(args: Subset<T, ServerAggregateArgs>): Prisma.PrismaPromise<GetServerAggregateType<T>>

    /**
     * Group by Server.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServerGroupByArgs['orderBy'] }
        : { orderBy?: ServerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Server model
   */
  readonly fields: ServerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Server.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends Server$membersArgs<ExtArgs> = {}>(args?: Subset<T, Server$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    channels<T extends Server$channelsArgs<ExtArgs> = {}>(args?: Subset<T, Server$channelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invites<T extends Server$invitesArgs<ExtArgs> = {}>(args?: Subset<T, Server$invitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bans<T extends Server$bansArgs<ExtArgs> = {}>(args?: Subset<T, Server$bansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Server model
   */
  interface ServerFieldRefs {
    readonly id: FieldRef<"Server", 'Int'>
    readonly name: FieldRef<"Server", 'String'>
    readonly avatarUrl: FieldRef<"Server", 'String'>
    readonly ownerId: FieldRef<"Server", 'Int'>
    readonly createdAt: FieldRef<"Server", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Server findUnique
   */
  export type ServerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Server to fetch.
     */
    where: ServerWhereUniqueInput
  }

  /**
   * Server findUniqueOrThrow
   */
  export type ServerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Server to fetch.
     */
    where: ServerWhereUniqueInput
  }

  /**
   * Server findFirst
   */
  export type ServerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Server to fetch.
     */
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     */
    orderBy?: ServerOrderByWithRelationInput | ServerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Servers.
     */
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servers.
     */
    distinct?: ServerScalarFieldEnum | ServerScalarFieldEnum[]
  }

  /**
   * Server findFirstOrThrow
   */
  export type ServerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Server to fetch.
     */
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     */
    orderBy?: ServerOrderByWithRelationInput | ServerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Servers.
     */
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servers.
     */
    distinct?: ServerScalarFieldEnum | ServerScalarFieldEnum[]
  }

  /**
   * Server findMany
   */
  export type ServerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Servers to fetch.
     */
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     */
    orderBy?: ServerOrderByWithRelationInput | ServerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Servers.
     */
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servers.
     */
    distinct?: ServerScalarFieldEnum | ServerScalarFieldEnum[]
  }

  /**
   * Server create
   */
  export type ServerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * The data needed to create a Server.
     */
    data: XOR<ServerCreateInput, ServerUncheckedCreateInput>
  }

  /**
   * Server createMany
   */
  export type ServerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Servers.
     */
    data: ServerCreateManyInput | ServerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Server createManyAndReturn
   */
  export type ServerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * The data used to create many Servers.
     */
    data: ServerCreateManyInput | ServerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Server update
   */
  export type ServerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * The data needed to update a Server.
     */
    data: XOR<ServerUpdateInput, ServerUncheckedUpdateInput>
    /**
     * Choose, which Server to update.
     */
    where: ServerWhereUniqueInput
  }

  /**
   * Server updateMany
   */
  export type ServerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Servers.
     */
    data: XOR<ServerUpdateManyMutationInput, ServerUncheckedUpdateManyInput>
    /**
     * Filter which Servers to update
     */
    where?: ServerWhereInput
    /**
     * Limit how many Servers to update.
     */
    limit?: number
  }

  /**
   * Server updateManyAndReturn
   */
  export type ServerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * The data used to update Servers.
     */
    data: XOR<ServerUpdateManyMutationInput, ServerUncheckedUpdateManyInput>
    /**
     * Filter which Servers to update
     */
    where?: ServerWhereInput
    /**
     * Limit how many Servers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Server upsert
   */
  export type ServerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * The filter to search for the Server to update in case it exists.
     */
    where: ServerWhereUniqueInput
    /**
     * In case the Server found by the `where` argument doesn't exist, create a new Server with this data.
     */
    create: XOR<ServerCreateInput, ServerUncheckedCreateInput>
    /**
     * In case the Server was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServerUpdateInput, ServerUncheckedUpdateInput>
  }

  /**
   * Server delete
   */
  export type ServerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter which Server to delete.
     */
    where: ServerWhereUniqueInput
  }

  /**
   * Server deleteMany
   */
  export type ServerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Servers to delete
     */
    where?: ServerWhereInput
    /**
     * Limit how many Servers to delete.
     */
    limit?: number
  }

  /**
   * Server.members
   */
  export type Server$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    where?: ServerMemberWhereInput
    orderBy?: ServerMemberOrderByWithRelationInput | ServerMemberOrderByWithRelationInput[]
    cursor?: ServerMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServerMemberScalarFieldEnum | ServerMemberScalarFieldEnum[]
  }

  /**
   * Server.channels
   */
  export type Server$channelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    where?: ChannelWhereInput
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    cursor?: ChannelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Server.invites
   */
  export type Server$invitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    where?: ServerInviteWhereInput
    orderBy?: ServerInviteOrderByWithRelationInput | ServerInviteOrderByWithRelationInput[]
    cursor?: ServerInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServerInviteScalarFieldEnum | ServerInviteScalarFieldEnum[]
  }

  /**
   * Server.bans
   */
  export type Server$bansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ban
     */
    select?: BanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ban
     */
    omit?: BanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BanInclude<ExtArgs> | null
    where?: BanWhereInput
    orderBy?: BanOrderByWithRelationInput | BanOrderByWithRelationInput[]
    cursor?: BanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BanScalarFieldEnum | BanScalarFieldEnum[]
  }

  /**
   * Server without action
   */
  export type ServerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
  }


  /**
   * Model Ban
   */

  export type AggregateBan = {
    _count: BanCountAggregateOutputType | null
    _avg: BanAvgAggregateOutputType | null
    _sum: BanSumAggregateOutputType | null
    _min: BanMinAggregateOutputType | null
    _max: BanMaxAggregateOutputType | null
  }

  export type BanAvgAggregateOutputType = {
    id: number | null
    serverId: number | null
    userId: number | null
  }

  export type BanSumAggregateOutputType = {
    id: number | null
    serverId: number | null
    userId: number | null
  }

  export type BanMinAggregateOutputType = {
    id: number | null
    serverId: number | null
    userId: number | null
    bannedByRole: $Enums.MemberRole | null
    reason: string | null
    expiresAt: Date | null
    createdAt: Date | null
    revokedAt: Date | null
    appealStatus: $Enums.BanAppealStatus | null
  }

  export type BanMaxAggregateOutputType = {
    id: number | null
    serverId: number | null
    userId: number | null
    bannedByRole: $Enums.MemberRole | null
    reason: string | null
    expiresAt: Date | null
    createdAt: Date | null
    revokedAt: Date | null
    appealStatus: $Enums.BanAppealStatus | null
  }

  export type BanCountAggregateOutputType = {
    id: number
    serverId: number
    userId: number
    bannedByRole: number
    reason: number
    expiresAt: number
    createdAt: number
    revokedAt: number
    appealStatus: number
    _all: number
  }


  export type BanAvgAggregateInputType = {
    id?: true
    serverId?: true
    userId?: true
  }

  export type BanSumAggregateInputType = {
    id?: true
    serverId?: true
    userId?: true
  }

  export type BanMinAggregateInputType = {
    id?: true
    serverId?: true
    userId?: true
    bannedByRole?: true
    reason?: true
    expiresAt?: true
    createdAt?: true
    revokedAt?: true
    appealStatus?: true
  }

  export type BanMaxAggregateInputType = {
    id?: true
    serverId?: true
    userId?: true
    bannedByRole?: true
    reason?: true
    expiresAt?: true
    createdAt?: true
    revokedAt?: true
    appealStatus?: true
  }

  export type BanCountAggregateInputType = {
    id?: true
    serverId?: true
    userId?: true
    bannedByRole?: true
    reason?: true
    expiresAt?: true
    createdAt?: true
    revokedAt?: true
    appealStatus?: true
    _all?: true
  }

  export type BanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ban to aggregate.
     */
    where?: BanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bans to fetch.
     */
    orderBy?: BanOrderByWithRelationInput | BanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bans
    **/
    _count?: true | BanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BanMaxAggregateInputType
  }

  export type GetBanAggregateType<T extends BanAggregateArgs> = {
        [P in keyof T & keyof AggregateBan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBan[P]>
      : GetScalarType<T[P], AggregateBan[P]>
  }




  export type BanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BanWhereInput
    orderBy?: BanOrderByWithAggregationInput | BanOrderByWithAggregationInput[]
    by: BanScalarFieldEnum[] | BanScalarFieldEnum
    having?: BanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BanCountAggregateInputType | true
    _avg?: BanAvgAggregateInputType
    _sum?: BanSumAggregateInputType
    _min?: BanMinAggregateInputType
    _max?: BanMaxAggregateInputType
  }

  export type BanGroupByOutputType = {
    id: number
    serverId: number
    userId: number
    bannedByRole: $Enums.MemberRole
    reason: string | null
    expiresAt: Date | null
    createdAt: Date
    revokedAt: Date | null
    appealStatus: $Enums.BanAppealStatus
    _count: BanCountAggregateOutputType | null
    _avg: BanAvgAggregateOutputType | null
    _sum: BanSumAggregateOutputType | null
    _min: BanMinAggregateOutputType | null
    _max: BanMaxAggregateOutputType | null
  }

  type GetBanGroupByPayload<T extends BanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BanGroupByOutputType[P]>
            : GetScalarType<T[P], BanGroupByOutputType[P]>
        }
      >
    >


  export type BanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serverId?: boolean
    userId?: boolean
    bannedByRole?: boolean
    reason?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    appealStatus?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ban"]>

  export type BanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serverId?: boolean
    userId?: boolean
    bannedByRole?: boolean
    reason?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    appealStatus?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ban"]>

  export type BanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serverId?: boolean
    userId?: boolean
    bannedByRole?: boolean
    reason?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    appealStatus?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ban"]>

  export type BanSelectScalar = {
    id?: boolean
    serverId?: boolean
    userId?: boolean
    bannedByRole?: boolean
    reason?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    appealStatus?: boolean
  }

  export type BanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "serverId" | "userId" | "bannedByRole" | "reason" | "expiresAt" | "createdAt" | "revokedAt" | "appealStatus", ExtArgs["result"]["ban"]>
  export type BanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }
  export type BanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }
  export type BanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }

  export type $BanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ban"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      server: Prisma.$ServerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      serverId: number
      userId: number
      bannedByRole: $Enums.MemberRole
      reason: string | null
      expiresAt: Date | null
      createdAt: Date
      revokedAt: Date | null
      appealStatus: $Enums.BanAppealStatus
    }, ExtArgs["result"]["ban"]>
    composites: {}
  }

  type BanGetPayload<S extends boolean | null | undefined | BanDefaultArgs> = $Result.GetResult<Prisma.$BanPayload, S>

  type BanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BanCountAggregateInputType | true
    }

  export interface BanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ban'], meta: { name: 'Ban' } }
    /**
     * Find zero or one Ban that matches the filter.
     * @param {BanFindUniqueArgs} args - Arguments to find a Ban
     * @example
     * // Get one Ban
     * const ban = await prisma.ban.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BanFindUniqueArgs>(args: SelectSubset<T, BanFindUniqueArgs<ExtArgs>>): Prisma__BanClient<$Result.GetResult<Prisma.$BanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ban that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BanFindUniqueOrThrowArgs} args - Arguments to find a Ban
     * @example
     * // Get one Ban
     * const ban = await prisma.ban.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BanFindUniqueOrThrowArgs>(args: SelectSubset<T, BanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BanClient<$Result.GetResult<Prisma.$BanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ban that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BanFindFirstArgs} args - Arguments to find a Ban
     * @example
     * // Get one Ban
     * const ban = await prisma.ban.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BanFindFirstArgs>(args?: SelectSubset<T, BanFindFirstArgs<ExtArgs>>): Prisma__BanClient<$Result.GetResult<Prisma.$BanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ban that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BanFindFirstOrThrowArgs} args - Arguments to find a Ban
     * @example
     * // Get one Ban
     * const ban = await prisma.ban.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BanFindFirstOrThrowArgs>(args?: SelectSubset<T, BanFindFirstOrThrowArgs<ExtArgs>>): Prisma__BanClient<$Result.GetResult<Prisma.$BanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bans
     * const bans = await prisma.ban.findMany()
     * 
     * // Get first 10 Bans
     * const bans = await prisma.ban.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const banWithIdOnly = await prisma.ban.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BanFindManyArgs>(args?: SelectSubset<T, BanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ban.
     * @param {BanCreateArgs} args - Arguments to create a Ban.
     * @example
     * // Create one Ban
     * const Ban = await prisma.ban.create({
     *   data: {
     *     // ... data to create a Ban
     *   }
     * })
     * 
     */
    create<T extends BanCreateArgs>(args: SelectSubset<T, BanCreateArgs<ExtArgs>>): Prisma__BanClient<$Result.GetResult<Prisma.$BanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bans.
     * @param {BanCreateManyArgs} args - Arguments to create many Bans.
     * @example
     * // Create many Bans
     * const ban = await prisma.ban.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BanCreateManyArgs>(args?: SelectSubset<T, BanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bans and returns the data saved in the database.
     * @param {BanCreateManyAndReturnArgs} args - Arguments to create many Bans.
     * @example
     * // Create many Bans
     * const ban = await prisma.ban.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bans and only return the `id`
     * const banWithIdOnly = await prisma.ban.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BanCreateManyAndReturnArgs>(args?: SelectSubset<T, BanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ban.
     * @param {BanDeleteArgs} args - Arguments to delete one Ban.
     * @example
     * // Delete one Ban
     * const Ban = await prisma.ban.delete({
     *   where: {
     *     // ... filter to delete one Ban
     *   }
     * })
     * 
     */
    delete<T extends BanDeleteArgs>(args: SelectSubset<T, BanDeleteArgs<ExtArgs>>): Prisma__BanClient<$Result.GetResult<Prisma.$BanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ban.
     * @param {BanUpdateArgs} args - Arguments to update one Ban.
     * @example
     * // Update one Ban
     * const ban = await prisma.ban.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BanUpdateArgs>(args: SelectSubset<T, BanUpdateArgs<ExtArgs>>): Prisma__BanClient<$Result.GetResult<Prisma.$BanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bans.
     * @param {BanDeleteManyArgs} args - Arguments to filter Bans to delete.
     * @example
     * // Delete a few Bans
     * const { count } = await prisma.ban.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BanDeleteManyArgs>(args?: SelectSubset<T, BanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bans
     * const ban = await prisma.ban.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BanUpdateManyArgs>(args: SelectSubset<T, BanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bans and returns the data updated in the database.
     * @param {BanUpdateManyAndReturnArgs} args - Arguments to update many Bans.
     * @example
     * // Update many Bans
     * const ban = await prisma.ban.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bans and only return the `id`
     * const banWithIdOnly = await prisma.ban.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BanUpdateManyAndReturnArgs>(args: SelectSubset<T, BanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ban.
     * @param {BanUpsertArgs} args - Arguments to update or create a Ban.
     * @example
     * // Update or create a Ban
     * const ban = await prisma.ban.upsert({
     *   create: {
     *     // ... data to create a Ban
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ban we want to update
     *   }
     * })
     */
    upsert<T extends BanUpsertArgs>(args: SelectSubset<T, BanUpsertArgs<ExtArgs>>): Prisma__BanClient<$Result.GetResult<Prisma.$BanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BanCountArgs} args - Arguments to filter Bans to count.
     * @example
     * // Count the number of Bans
     * const count = await prisma.ban.count({
     *   where: {
     *     // ... the filter for the Bans we want to count
     *   }
     * })
    **/
    count<T extends BanCountArgs>(
      args?: Subset<T, BanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ban.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BanAggregateArgs>(args: Subset<T, BanAggregateArgs>): Prisma.PrismaPromise<GetBanAggregateType<T>>

    /**
     * Group by Ban.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BanGroupByArgs['orderBy'] }
        : { orderBy?: BanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ban model
   */
  readonly fields: BanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ban.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    server<T extends ServerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServerDefaultArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ban model
   */
  interface BanFieldRefs {
    readonly id: FieldRef<"Ban", 'Int'>
    readonly serverId: FieldRef<"Ban", 'Int'>
    readonly userId: FieldRef<"Ban", 'Int'>
    readonly bannedByRole: FieldRef<"Ban", 'MemberRole'>
    readonly reason: FieldRef<"Ban", 'String'>
    readonly expiresAt: FieldRef<"Ban", 'DateTime'>
    readonly createdAt: FieldRef<"Ban", 'DateTime'>
    readonly revokedAt: FieldRef<"Ban", 'DateTime'>
    readonly appealStatus: FieldRef<"Ban", 'BanAppealStatus'>
  }
    

  // Custom InputTypes
  /**
   * Ban findUnique
   */
  export type BanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ban
     */
    select?: BanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ban
     */
    omit?: BanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BanInclude<ExtArgs> | null
    /**
     * Filter, which Ban to fetch.
     */
    where: BanWhereUniqueInput
  }

  /**
   * Ban findUniqueOrThrow
   */
  export type BanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ban
     */
    select?: BanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ban
     */
    omit?: BanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BanInclude<ExtArgs> | null
    /**
     * Filter, which Ban to fetch.
     */
    where: BanWhereUniqueInput
  }

  /**
   * Ban findFirst
   */
  export type BanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ban
     */
    select?: BanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ban
     */
    omit?: BanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BanInclude<ExtArgs> | null
    /**
     * Filter, which Ban to fetch.
     */
    where?: BanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bans to fetch.
     */
    orderBy?: BanOrderByWithRelationInput | BanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bans.
     */
    cursor?: BanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bans.
     */
    distinct?: BanScalarFieldEnum | BanScalarFieldEnum[]
  }

  /**
   * Ban findFirstOrThrow
   */
  export type BanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ban
     */
    select?: BanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ban
     */
    omit?: BanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BanInclude<ExtArgs> | null
    /**
     * Filter, which Ban to fetch.
     */
    where?: BanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bans to fetch.
     */
    orderBy?: BanOrderByWithRelationInput | BanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bans.
     */
    cursor?: BanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bans.
     */
    distinct?: BanScalarFieldEnum | BanScalarFieldEnum[]
  }

  /**
   * Ban findMany
   */
  export type BanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ban
     */
    select?: BanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ban
     */
    omit?: BanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BanInclude<ExtArgs> | null
    /**
     * Filter, which Bans to fetch.
     */
    where?: BanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bans to fetch.
     */
    orderBy?: BanOrderByWithRelationInput | BanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bans.
     */
    cursor?: BanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bans.
     */
    distinct?: BanScalarFieldEnum | BanScalarFieldEnum[]
  }

  /**
   * Ban create
   */
  export type BanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ban
     */
    select?: BanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ban
     */
    omit?: BanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BanInclude<ExtArgs> | null
    /**
     * The data needed to create a Ban.
     */
    data: XOR<BanCreateInput, BanUncheckedCreateInput>
  }

  /**
   * Ban createMany
   */
  export type BanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bans.
     */
    data: BanCreateManyInput | BanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ban createManyAndReturn
   */
  export type BanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ban
     */
    select?: BanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ban
     */
    omit?: BanOmit<ExtArgs> | null
    /**
     * The data used to create many Bans.
     */
    data: BanCreateManyInput | BanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ban update
   */
  export type BanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ban
     */
    select?: BanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ban
     */
    omit?: BanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BanInclude<ExtArgs> | null
    /**
     * The data needed to update a Ban.
     */
    data: XOR<BanUpdateInput, BanUncheckedUpdateInput>
    /**
     * Choose, which Ban to update.
     */
    where: BanWhereUniqueInput
  }

  /**
   * Ban updateMany
   */
  export type BanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bans.
     */
    data: XOR<BanUpdateManyMutationInput, BanUncheckedUpdateManyInput>
    /**
     * Filter which Bans to update
     */
    where?: BanWhereInput
    /**
     * Limit how many Bans to update.
     */
    limit?: number
  }

  /**
   * Ban updateManyAndReturn
   */
  export type BanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ban
     */
    select?: BanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ban
     */
    omit?: BanOmit<ExtArgs> | null
    /**
     * The data used to update Bans.
     */
    data: XOR<BanUpdateManyMutationInput, BanUncheckedUpdateManyInput>
    /**
     * Filter which Bans to update
     */
    where?: BanWhereInput
    /**
     * Limit how many Bans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ban upsert
   */
  export type BanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ban
     */
    select?: BanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ban
     */
    omit?: BanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BanInclude<ExtArgs> | null
    /**
     * The filter to search for the Ban to update in case it exists.
     */
    where: BanWhereUniqueInput
    /**
     * In case the Ban found by the `where` argument doesn't exist, create a new Ban with this data.
     */
    create: XOR<BanCreateInput, BanUncheckedCreateInput>
    /**
     * In case the Ban was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BanUpdateInput, BanUncheckedUpdateInput>
  }

  /**
   * Ban delete
   */
  export type BanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ban
     */
    select?: BanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ban
     */
    omit?: BanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BanInclude<ExtArgs> | null
    /**
     * Filter which Ban to delete.
     */
    where: BanWhereUniqueInput
  }

  /**
   * Ban deleteMany
   */
  export type BanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bans to delete
     */
    where?: BanWhereInput
    /**
     * Limit how many Bans to delete.
     */
    limit?: number
  }

  /**
   * Ban without action
   */
  export type BanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ban
     */
    select?: BanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ban
     */
    omit?: BanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BanInclude<ExtArgs> | null
  }


  /**
   * Model ServerMember
   */

  export type AggregateServerMember = {
    _count: ServerMemberCountAggregateOutputType | null
    _avg: ServerMemberAvgAggregateOutputType | null
    _sum: ServerMemberSumAggregateOutputType | null
    _min: ServerMemberMinAggregateOutputType | null
    _max: ServerMemberMaxAggregateOutputType | null
  }

  export type ServerMemberAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    serverId: number | null
  }

  export type ServerMemberSumAggregateOutputType = {
    id: number | null
    userId: number | null
    serverId: number | null
  }

  export type ServerMemberMinAggregateOutputType = {
    id: number | null
    userId: number | null
    serverId: number | null
    role: $Enums.MemberRole | null
    joinedAt: Date | null
  }

  export type ServerMemberMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    serverId: number | null
    role: $Enums.MemberRole | null
    joinedAt: Date | null
  }

  export type ServerMemberCountAggregateOutputType = {
    id: number
    userId: number
    serverId: number
    role: number
    joinedAt: number
    _all: number
  }


  export type ServerMemberAvgAggregateInputType = {
    id?: true
    userId?: true
    serverId?: true
  }

  export type ServerMemberSumAggregateInputType = {
    id?: true
    userId?: true
    serverId?: true
  }

  export type ServerMemberMinAggregateInputType = {
    id?: true
    userId?: true
    serverId?: true
    role?: true
    joinedAt?: true
  }

  export type ServerMemberMaxAggregateInputType = {
    id?: true
    userId?: true
    serverId?: true
    role?: true
    joinedAt?: true
  }

  export type ServerMemberCountAggregateInputType = {
    id?: true
    userId?: true
    serverId?: true
    role?: true
    joinedAt?: true
    _all?: true
  }

  export type ServerMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServerMember to aggregate.
     */
    where?: ServerMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerMembers to fetch.
     */
    orderBy?: ServerMemberOrderByWithRelationInput | ServerMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServerMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServerMembers
    **/
    _count?: true | ServerMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServerMemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServerMemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServerMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServerMemberMaxAggregateInputType
  }

  export type GetServerMemberAggregateType<T extends ServerMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateServerMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServerMember[P]>
      : GetScalarType<T[P], AggregateServerMember[P]>
  }




  export type ServerMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerMemberWhereInput
    orderBy?: ServerMemberOrderByWithAggregationInput | ServerMemberOrderByWithAggregationInput[]
    by: ServerMemberScalarFieldEnum[] | ServerMemberScalarFieldEnum
    having?: ServerMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServerMemberCountAggregateInputType | true
    _avg?: ServerMemberAvgAggregateInputType
    _sum?: ServerMemberSumAggregateInputType
    _min?: ServerMemberMinAggregateInputType
    _max?: ServerMemberMaxAggregateInputType
  }

  export type ServerMemberGroupByOutputType = {
    id: number
    userId: number
    serverId: number
    role: $Enums.MemberRole
    joinedAt: Date
    _count: ServerMemberCountAggregateOutputType | null
    _avg: ServerMemberAvgAggregateOutputType | null
    _sum: ServerMemberSumAggregateOutputType | null
    _min: ServerMemberMinAggregateOutputType | null
    _max: ServerMemberMaxAggregateOutputType | null
  }

  type GetServerMemberGroupByPayload<T extends ServerMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServerMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServerMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServerMemberGroupByOutputType[P]>
            : GetScalarType<T[P], ServerMemberGroupByOutputType[P]>
        }
      >
    >


  export type ServerMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serverId?: boolean
    role?: boolean
    joinedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverMember"]>

  export type ServerMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serverId?: boolean
    role?: boolean
    joinedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverMember"]>

  export type ServerMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serverId?: boolean
    role?: boolean
    joinedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverMember"]>

  export type ServerMemberSelectScalar = {
    id?: boolean
    userId?: boolean
    serverId?: boolean
    role?: boolean
    joinedAt?: boolean
  }

  export type ServerMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "serverId" | "role" | "joinedAt", ExtArgs["result"]["serverMember"]>
  export type ServerMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }
  export type ServerMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }
  export type ServerMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }

  export type $ServerMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServerMember"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      server: Prisma.$ServerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      serverId: number
      role: $Enums.MemberRole
      joinedAt: Date
    }, ExtArgs["result"]["serverMember"]>
    composites: {}
  }

  type ServerMemberGetPayload<S extends boolean | null | undefined | ServerMemberDefaultArgs> = $Result.GetResult<Prisma.$ServerMemberPayload, S>

  type ServerMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServerMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServerMemberCountAggregateInputType | true
    }

  export interface ServerMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServerMember'], meta: { name: 'ServerMember' } }
    /**
     * Find zero or one ServerMember that matches the filter.
     * @param {ServerMemberFindUniqueArgs} args - Arguments to find a ServerMember
     * @example
     * // Get one ServerMember
     * const serverMember = await prisma.serverMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServerMemberFindUniqueArgs>(args: SelectSubset<T, ServerMemberFindUniqueArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServerMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServerMemberFindUniqueOrThrowArgs} args - Arguments to find a ServerMember
     * @example
     * // Get one ServerMember
     * const serverMember = await prisma.serverMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServerMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, ServerMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServerMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerMemberFindFirstArgs} args - Arguments to find a ServerMember
     * @example
     * // Get one ServerMember
     * const serverMember = await prisma.serverMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServerMemberFindFirstArgs>(args?: SelectSubset<T, ServerMemberFindFirstArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServerMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerMemberFindFirstOrThrowArgs} args - Arguments to find a ServerMember
     * @example
     * // Get one ServerMember
     * const serverMember = await prisma.serverMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServerMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, ServerMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServerMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServerMembers
     * const serverMembers = await prisma.serverMember.findMany()
     * 
     * // Get first 10 ServerMembers
     * const serverMembers = await prisma.serverMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serverMemberWithIdOnly = await prisma.serverMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServerMemberFindManyArgs>(args?: SelectSubset<T, ServerMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServerMember.
     * @param {ServerMemberCreateArgs} args - Arguments to create a ServerMember.
     * @example
     * // Create one ServerMember
     * const ServerMember = await prisma.serverMember.create({
     *   data: {
     *     // ... data to create a ServerMember
     *   }
     * })
     * 
     */
    create<T extends ServerMemberCreateArgs>(args: SelectSubset<T, ServerMemberCreateArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServerMembers.
     * @param {ServerMemberCreateManyArgs} args - Arguments to create many ServerMembers.
     * @example
     * // Create many ServerMembers
     * const serverMember = await prisma.serverMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServerMemberCreateManyArgs>(args?: SelectSubset<T, ServerMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServerMembers and returns the data saved in the database.
     * @param {ServerMemberCreateManyAndReturnArgs} args - Arguments to create many ServerMembers.
     * @example
     * // Create many ServerMembers
     * const serverMember = await prisma.serverMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServerMembers and only return the `id`
     * const serverMemberWithIdOnly = await prisma.serverMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServerMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, ServerMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServerMember.
     * @param {ServerMemberDeleteArgs} args - Arguments to delete one ServerMember.
     * @example
     * // Delete one ServerMember
     * const ServerMember = await prisma.serverMember.delete({
     *   where: {
     *     // ... filter to delete one ServerMember
     *   }
     * })
     * 
     */
    delete<T extends ServerMemberDeleteArgs>(args: SelectSubset<T, ServerMemberDeleteArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServerMember.
     * @param {ServerMemberUpdateArgs} args - Arguments to update one ServerMember.
     * @example
     * // Update one ServerMember
     * const serverMember = await prisma.serverMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServerMemberUpdateArgs>(args: SelectSubset<T, ServerMemberUpdateArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServerMembers.
     * @param {ServerMemberDeleteManyArgs} args - Arguments to filter ServerMembers to delete.
     * @example
     * // Delete a few ServerMembers
     * const { count } = await prisma.serverMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServerMemberDeleteManyArgs>(args?: SelectSubset<T, ServerMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServerMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServerMembers
     * const serverMember = await prisma.serverMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServerMemberUpdateManyArgs>(args: SelectSubset<T, ServerMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServerMembers and returns the data updated in the database.
     * @param {ServerMemberUpdateManyAndReturnArgs} args - Arguments to update many ServerMembers.
     * @example
     * // Update many ServerMembers
     * const serverMember = await prisma.serverMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServerMembers and only return the `id`
     * const serverMemberWithIdOnly = await prisma.serverMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServerMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, ServerMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServerMember.
     * @param {ServerMemberUpsertArgs} args - Arguments to update or create a ServerMember.
     * @example
     * // Update or create a ServerMember
     * const serverMember = await prisma.serverMember.upsert({
     *   create: {
     *     // ... data to create a ServerMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServerMember we want to update
     *   }
     * })
     */
    upsert<T extends ServerMemberUpsertArgs>(args: SelectSubset<T, ServerMemberUpsertArgs<ExtArgs>>): Prisma__ServerMemberClient<$Result.GetResult<Prisma.$ServerMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServerMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerMemberCountArgs} args - Arguments to filter ServerMembers to count.
     * @example
     * // Count the number of ServerMembers
     * const count = await prisma.serverMember.count({
     *   where: {
     *     // ... the filter for the ServerMembers we want to count
     *   }
     * })
    **/
    count<T extends ServerMemberCountArgs>(
      args?: Subset<T, ServerMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServerMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServerMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServerMemberAggregateArgs>(args: Subset<T, ServerMemberAggregateArgs>): Prisma.PrismaPromise<GetServerMemberAggregateType<T>>

    /**
     * Group by ServerMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServerMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServerMemberGroupByArgs['orderBy'] }
        : { orderBy?: ServerMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServerMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServerMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServerMember model
   */
  readonly fields: ServerMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServerMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServerMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    server<T extends ServerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServerDefaultArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServerMember model
   */
  interface ServerMemberFieldRefs {
    readonly id: FieldRef<"ServerMember", 'Int'>
    readonly userId: FieldRef<"ServerMember", 'Int'>
    readonly serverId: FieldRef<"ServerMember", 'Int'>
    readonly role: FieldRef<"ServerMember", 'MemberRole'>
    readonly joinedAt: FieldRef<"ServerMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServerMember findUnique
   */
  export type ServerMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * Filter, which ServerMember to fetch.
     */
    where: ServerMemberWhereUniqueInput
  }

  /**
   * ServerMember findUniqueOrThrow
   */
  export type ServerMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * Filter, which ServerMember to fetch.
     */
    where: ServerMemberWhereUniqueInput
  }

  /**
   * ServerMember findFirst
   */
  export type ServerMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * Filter, which ServerMember to fetch.
     */
    where?: ServerMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerMembers to fetch.
     */
    orderBy?: ServerMemberOrderByWithRelationInput | ServerMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServerMembers.
     */
    cursor?: ServerMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerMembers.
     */
    distinct?: ServerMemberScalarFieldEnum | ServerMemberScalarFieldEnum[]
  }

  /**
   * ServerMember findFirstOrThrow
   */
  export type ServerMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * Filter, which ServerMember to fetch.
     */
    where?: ServerMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerMembers to fetch.
     */
    orderBy?: ServerMemberOrderByWithRelationInput | ServerMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServerMembers.
     */
    cursor?: ServerMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerMembers.
     */
    distinct?: ServerMemberScalarFieldEnum | ServerMemberScalarFieldEnum[]
  }

  /**
   * ServerMember findMany
   */
  export type ServerMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * Filter, which ServerMembers to fetch.
     */
    where?: ServerMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerMembers to fetch.
     */
    orderBy?: ServerMemberOrderByWithRelationInput | ServerMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServerMembers.
     */
    cursor?: ServerMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerMembers.
     */
    distinct?: ServerMemberScalarFieldEnum | ServerMemberScalarFieldEnum[]
  }

  /**
   * ServerMember create
   */
  export type ServerMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a ServerMember.
     */
    data: XOR<ServerMemberCreateInput, ServerMemberUncheckedCreateInput>
  }

  /**
   * ServerMember createMany
   */
  export type ServerMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServerMembers.
     */
    data: ServerMemberCreateManyInput | ServerMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServerMember createManyAndReturn
   */
  export type ServerMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * The data used to create many ServerMembers.
     */
    data: ServerMemberCreateManyInput | ServerMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServerMember update
   */
  export type ServerMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a ServerMember.
     */
    data: XOR<ServerMemberUpdateInput, ServerMemberUncheckedUpdateInput>
    /**
     * Choose, which ServerMember to update.
     */
    where: ServerMemberWhereUniqueInput
  }

  /**
   * ServerMember updateMany
   */
  export type ServerMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServerMembers.
     */
    data: XOR<ServerMemberUpdateManyMutationInput, ServerMemberUncheckedUpdateManyInput>
    /**
     * Filter which ServerMembers to update
     */
    where?: ServerMemberWhereInput
    /**
     * Limit how many ServerMembers to update.
     */
    limit?: number
  }

  /**
   * ServerMember updateManyAndReturn
   */
  export type ServerMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * The data used to update ServerMembers.
     */
    data: XOR<ServerMemberUpdateManyMutationInput, ServerMemberUncheckedUpdateManyInput>
    /**
     * Filter which ServerMembers to update
     */
    where?: ServerMemberWhereInput
    /**
     * Limit how many ServerMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServerMember upsert
   */
  export type ServerMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the ServerMember to update in case it exists.
     */
    where: ServerMemberWhereUniqueInput
    /**
     * In case the ServerMember found by the `where` argument doesn't exist, create a new ServerMember with this data.
     */
    create: XOR<ServerMemberCreateInput, ServerMemberUncheckedCreateInput>
    /**
     * In case the ServerMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServerMemberUpdateInput, ServerMemberUncheckedUpdateInput>
  }

  /**
   * ServerMember delete
   */
  export type ServerMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
    /**
     * Filter which ServerMember to delete.
     */
    where: ServerMemberWhereUniqueInput
  }

  /**
   * ServerMember deleteMany
   */
  export type ServerMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServerMembers to delete
     */
    where?: ServerMemberWhereInput
    /**
     * Limit how many ServerMembers to delete.
     */
    limit?: number
  }

  /**
   * ServerMember without action
   */
  export type ServerMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerMember
     */
    select?: ServerMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerMember
     */
    omit?: ServerMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerMemberInclude<ExtArgs> | null
  }


  /**
   * Model Channel
   */

  export type AggregateChannel = {
    _count: ChannelCountAggregateOutputType | null
    _avg: ChannelAvgAggregateOutputType | null
    _sum: ChannelSumAggregateOutputType | null
    _min: ChannelMinAggregateOutputType | null
    _max: ChannelMaxAggregateOutputType | null
  }

  export type ChannelAvgAggregateOutputType = {
    id: number | null
    serverId: number | null
  }

  export type ChannelSumAggregateOutputType = {
    id: number | null
    serverId: number | null
  }

  export type ChannelMinAggregateOutputType = {
    id: number | null
    name: string | null
    serverId: number | null
    type: $Enums.ChannelType | null
    createdAt: Date | null
  }

  export type ChannelMaxAggregateOutputType = {
    id: number | null
    name: string | null
    serverId: number | null
    type: $Enums.ChannelType | null
    createdAt: Date | null
  }

  export type ChannelCountAggregateOutputType = {
    id: number
    name: number
    serverId: number
    type: number
    createdAt: number
    _all: number
  }


  export type ChannelAvgAggregateInputType = {
    id?: true
    serverId?: true
  }

  export type ChannelSumAggregateInputType = {
    id?: true
    serverId?: true
  }

  export type ChannelMinAggregateInputType = {
    id?: true
    name?: true
    serverId?: true
    type?: true
    createdAt?: true
  }

  export type ChannelMaxAggregateInputType = {
    id?: true
    name?: true
    serverId?: true
    type?: true
    createdAt?: true
  }

  export type ChannelCountAggregateInputType = {
    id?: true
    name?: true
    serverId?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type ChannelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Channel to aggregate.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Channels
    **/
    _count?: true | ChannelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChannelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChannelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChannelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChannelMaxAggregateInputType
  }

  export type GetChannelAggregateType<T extends ChannelAggregateArgs> = {
        [P in keyof T & keyof AggregateChannel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChannel[P]>
      : GetScalarType<T[P], AggregateChannel[P]>
  }




  export type ChannelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelWhereInput
    orderBy?: ChannelOrderByWithAggregationInput | ChannelOrderByWithAggregationInput[]
    by: ChannelScalarFieldEnum[] | ChannelScalarFieldEnum
    having?: ChannelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChannelCountAggregateInputType | true
    _avg?: ChannelAvgAggregateInputType
    _sum?: ChannelSumAggregateInputType
    _min?: ChannelMinAggregateInputType
    _max?: ChannelMaxAggregateInputType
  }

  export type ChannelGroupByOutputType = {
    id: number
    name: string
    serverId: number
    type: $Enums.ChannelType
    createdAt: Date
    _count: ChannelCountAggregateOutputType | null
    _avg: ChannelAvgAggregateOutputType | null
    _sum: ChannelSumAggregateOutputType | null
    _min: ChannelMinAggregateOutputType | null
    _max: ChannelMaxAggregateOutputType | null
  }

  type GetChannelGroupByPayload<T extends ChannelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChannelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChannelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChannelGroupByOutputType[P]>
            : GetScalarType<T[P], ChannelGroupByOutputType[P]>
        }
      >
    >


  export type ChannelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    serverId?: boolean
    type?: boolean
    createdAt?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
    messages?: boolean | Channel$messagesArgs<ExtArgs>
    attachments?: boolean | Channel$attachmentsArgs<ExtArgs>
    _count?: boolean | ChannelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channel"]>

  export type ChannelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    serverId?: boolean
    type?: boolean
    createdAt?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channel"]>

  export type ChannelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    serverId?: boolean
    type?: boolean
    createdAt?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channel"]>

  export type ChannelSelectScalar = {
    id?: boolean
    name?: boolean
    serverId?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type ChannelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "serverId" | "type" | "createdAt", ExtArgs["result"]["channel"]>
  export type ChannelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
    messages?: boolean | Channel$messagesArgs<ExtArgs>
    attachments?: boolean | Channel$attachmentsArgs<ExtArgs>
    _count?: boolean | ChannelCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChannelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }
  export type ChannelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }

  export type $ChannelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Channel"
    objects: {
      server: Prisma.$ServerPayload<ExtArgs>
      messages: Prisma.$MessagePayload<ExtArgs>[]
      attachments: Prisma.$AttachmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      serverId: number
      type: $Enums.ChannelType
      createdAt: Date
    }, ExtArgs["result"]["channel"]>
    composites: {}
  }

  type ChannelGetPayload<S extends boolean | null | undefined | ChannelDefaultArgs> = $Result.GetResult<Prisma.$ChannelPayload, S>

  type ChannelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChannelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChannelCountAggregateInputType | true
    }

  export interface ChannelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Channel'], meta: { name: 'Channel' } }
    /**
     * Find zero or one Channel that matches the filter.
     * @param {ChannelFindUniqueArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChannelFindUniqueArgs>(args: SelectSubset<T, ChannelFindUniqueArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Channel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChannelFindUniqueOrThrowArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChannelFindUniqueOrThrowArgs>(args: SelectSubset<T, ChannelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Channel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindFirstArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChannelFindFirstArgs>(args?: SelectSubset<T, ChannelFindFirstArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Channel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindFirstOrThrowArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChannelFindFirstOrThrowArgs>(args?: SelectSubset<T, ChannelFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Channels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Channels
     * const channels = await prisma.channel.findMany()
     * 
     * // Get first 10 Channels
     * const channels = await prisma.channel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const channelWithIdOnly = await prisma.channel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChannelFindManyArgs>(args?: SelectSubset<T, ChannelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Channel.
     * @param {ChannelCreateArgs} args - Arguments to create a Channel.
     * @example
     * // Create one Channel
     * const Channel = await prisma.channel.create({
     *   data: {
     *     // ... data to create a Channel
     *   }
     * })
     * 
     */
    create<T extends ChannelCreateArgs>(args: SelectSubset<T, ChannelCreateArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Channels.
     * @param {ChannelCreateManyArgs} args - Arguments to create many Channels.
     * @example
     * // Create many Channels
     * const channel = await prisma.channel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChannelCreateManyArgs>(args?: SelectSubset<T, ChannelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Channels and returns the data saved in the database.
     * @param {ChannelCreateManyAndReturnArgs} args - Arguments to create many Channels.
     * @example
     * // Create many Channels
     * const channel = await prisma.channel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Channels and only return the `id`
     * const channelWithIdOnly = await prisma.channel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChannelCreateManyAndReturnArgs>(args?: SelectSubset<T, ChannelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Channel.
     * @param {ChannelDeleteArgs} args - Arguments to delete one Channel.
     * @example
     * // Delete one Channel
     * const Channel = await prisma.channel.delete({
     *   where: {
     *     // ... filter to delete one Channel
     *   }
     * })
     * 
     */
    delete<T extends ChannelDeleteArgs>(args: SelectSubset<T, ChannelDeleteArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Channel.
     * @param {ChannelUpdateArgs} args - Arguments to update one Channel.
     * @example
     * // Update one Channel
     * const channel = await prisma.channel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChannelUpdateArgs>(args: SelectSubset<T, ChannelUpdateArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Channels.
     * @param {ChannelDeleteManyArgs} args - Arguments to filter Channels to delete.
     * @example
     * // Delete a few Channels
     * const { count } = await prisma.channel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChannelDeleteManyArgs>(args?: SelectSubset<T, ChannelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Channels
     * const channel = await prisma.channel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChannelUpdateManyArgs>(args: SelectSubset<T, ChannelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Channels and returns the data updated in the database.
     * @param {ChannelUpdateManyAndReturnArgs} args - Arguments to update many Channels.
     * @example
     * // Update many Channels
     * const channel = await prisma.channel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Channels and only return the `id`
     * const channelWithIdOnly = await prisma.channel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChannelUpdateManyAndReturnArgs>(args: SelectSubset<T, ChannelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Channel.
     * @param {ChannelUpsertArgs} args - Arguments to update or create a Channel.
     * @example
     * // Update or create a Channel
     * const channel = await prisma.channel.upsert({
     *   create: {
     *     // ... data to create a Channel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Channel we want to update
     *   }
     * })
     */
    upsert<T extends ChannelUpsertArgs>(args: SelectSubset<T, ChannelUpsertArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelCountArgs} args - Arguments to filter Channels to count.
     * @example
     * // Count the number of Channels
     * const count = await prisma.channel.count({
     *   where: {
     *     // ... the filter for the Channels we want to count
     *   }
     * })
    **/
    count<T extends ChannelCountArgs>(
      args?: Subset<T, ChannelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChannelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Channel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChannelAggregateArgs>(args: Subset<T, ChannelAggregateArgs>): Prisma.PrismaPromise<GetChannelAggregateType<T>>

    /**
     * Group by Channel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChannelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChannelGroupByArgs['orderBy'] }
        : { orderBy?: ChannelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChannelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChannelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Channel model
   */
  readonly fields: ChannelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Channel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChannelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    server<T extends ServerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServerDefaultArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    messages<T extends Channel$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Channel$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attachments<T extends Channel$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Channel$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Channel model
   */
  interface ChannelFieldRefs {
    readonly id: FieldRef<"Channel", 'Int'>
    readonly name: FieldRef<"Channel", 'String'>
    readonly serverId: FieldRef<"Channel", 'Int'>
    readonly type: FieldRef<"Channel", 'ChannelType'>
    readonly createdAt: FieldRef<"Channel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Channel findUnique
   */
  export type ChannelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel findUniqueOrThrow
   */
  export type ChannelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel findFirst
   */
  export type ChannelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Channel findFirstOrThrow
   */
  export type ChannelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Channel findMany
   */
  export type ChannelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channels to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Channel create
   */
  export type ChannelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * The data needed to create a Channel.
     */
    data: XOR<ChannelCreateInput, ChannelUncheckedCreateInput>
  }

  /**
   * Channel createMany
   */
  export type ChannelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Channels.
     */
    data: ChannelCreateManyInput | ChannelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Channel createManyAndReturn
   */
  export type ChannelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * The data used to create many Channels.
     */
    data: ChannelCreateManyInput | ChannelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Channel update
   */
  export type ChannelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * The data needed to update a Channel.
     */
    data: XOR<ChannelUpdateInput, ChannelUncheckedUpdateInput>
    /**
     * Choose, which Channel to update.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel updateMany
   */
  export type ChannelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Channels.
     */
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyInput>
    /**
     * Filter which Channels to update
     */
    where?: ChannelWhereInput
    /**
     * Limit how many Channels to update.
     */
    limit?: number
  }

  /**
   * Channel updateManyAndReturn
   */
  export type ChannelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * The data used to update Channels.
     */
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyInput>
    /**
     * Filter which Channels to update
     */
    where?: ChannelWhereInput
    /**
     * Limit how many Channels to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Channel upsert
   */
  export type ChannelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * The filter to search for the Channel to update in case it exists.
     */
    where: ChannelWhereUniqueInput
    /**
     * In case the Channel found by the `where` argument doesn't exist, create a new Channel with this data.
     */
    create: XOR<ChannelCreateInput, ChannelUncheckedCreateInput>
    /**
     * In case the Channel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChannelUpdateInput, ChannelUncheckedUpdateInput>
  }

  /**
   * Channel delete
   */
  export type ChannelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter which Channel to delete.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel deleteMany
   */
  export type ChannelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Channels to delete
     */
    where?: ChannelWhereInput
    /**
     * Limit how many Channels to delete.
     */
    limit?: number
  }

  /**
   * Channel.messages
   */
  export type Channel$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Channel.attachments
   */
  export type Channel$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    where?: AttachmentWhereInput
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    cursor?: AttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Channel without action
   */
  export type ChannelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
  }


  /**
   * Model ServerInvite
   */

  export type AggregateServerInvite = {
    _count: ServerInviteCountAggregateOutputType | null
    _avg: ServerInviteAvgAggregateOutputType | null
    _sum: ServerInviteSumAggregateOutputType | null
    _min: ServerInviteMinAggregateOutputType | null
    _max: ServerInviteMaxAggregateOutputType | null
  }

  export type ServerInviteAvgAggregateOutputType = {
    id: number | null
    serverId: number | null
    maxUses: number | null
    currentUses: number | null
    createdById: number | null
  }

  export type ServerInviteSumAggregateOutputType = {
    id: number | null
    serverId: number | null
    maxUses: number | null
    currentUses: number | null
    createdById: number | null
  }

  export type ServerInviteMinAggregateOutputType = {
    id: number | null
    code: string | null
    serverId: number | null
    maxUses: number | null
    currentUses: number | null
    expiresAt: Date | null
    createdById: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServerInviteMaxAggregateOutputType = {
    id: number | null
    code: string | null
    serverId: number | null
    maxUses: number | null
    currentUses: number | null
    expiresAt: Date | null
    createdById: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServerInviteCountAggregateOutputType = {
    id: number
    code: number
    serverId: number
    maxUses: number
    currentUses: number
    expiresAt: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServerInviteAvgAggregateInputType = {
    id?: true
    serverId?: true
    maxUses?: true
    currentUses?: true
    createdById?: true
  }

  export type ServerInviteSumAggregateInputType = {
    id?: true
    serverId?: true
    maxUses?: true
    currentUses?: true
    createdById?: true
  }

  export type ServerInviteMinAggregateInputType = {
    id?: true
    code?: true
    serverId?: true
    maxUses?: true
    currentUses?: true
    expiresAt?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServerInviteMaxAggregateInputType = {
    id?: true
    code?: true
    serverId?: true
    maxUses?: true
    currentUses?: true
    expiresAt?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServerInviteCountAggregateInputType = {
    id?: true
    code?: true
    serverId?: true
    maxUses?: true
    currentUses?: true
    expiresAt?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServerInviteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServerInvite to aggregate.
     */
    where?: ServerInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerInvites to fetch.
     */
    orderBy?: ServerInviteOrderByWithRelationInput | ServerInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServerInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServerInvites
    **/
    _count?: true | ServerInviteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServerInviteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServerInviteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServerInviteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServerInviteMaxAggregateInputType
  }

  export type GetServerInviteAggregateType<T extends ServerInviteAggregateArgs> = {
        [P in keyof T & keyof AggregateServerInvite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServerInvite[P]>
      : GetScalarType<T[P], AggregateServerInvite[P]>
  }




  export type ServerInviteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerInviteWhereInput
    orderBy?: ServerInviteOrderByWithAggregationInput | ServerInviteOrderByWithAggregationInput[]
    by: ServerInviteScalarFieldEnum[] | ServerInviteScalarFieldEnum
    having?: ServerInviteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServerInviteCountAggregateInputType | true
    _avg?: ServerInviteAvgAggregateInputType
    _sum?: ServerInviteSumAggregateInputType
    _min?: ServerInviteMinAggregateInputType
    _max?: ServerInviteMaxAggregateInputType
  }

  export type ServerInviteGroupByOutputType = {
    id: number
    code: string
    serverId: number
    maxUses: number | null
    currentUses: number
    expiresAt: Date | null
    createdById: number
    createdAt: Date
    updatedAt: Date
    _count: ServerInviteCountAggregateOutputType | null
    _avg: ServerInviteAvgAggregateOutputType | null
    _sum: ServerInviteSumAggregateOutputType | null
    _min: ServerInviteMinAggregateOutputType | null
    _max: ServerInviteMaxAggregateOutputType | null
  }

  type GetServerInviteGroupByPayload<T extends ServerInviteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServerInviteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServerInviteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServerInviteGroupByOutputType[P]>
            : GetScalarType<T[P], ServerInviteGroupByOutputType[P]>
        }
      >
    >


  export type ServerInviteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    serverId?: boolean
    maxUses?: boolean
    currentUses?: boolean
    expiresAt?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverInvite"]>

  export type ServerInviteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    serverId?: boolean
    maxUses?: boolean
    currentUses?: boolean
    expiresAt?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverInvite"]>

  export type ServerInviteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    serverId?: boolean
    maxUses?: boolean
    currentUses?: boolean
    expiresAt?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    server?: boolean | ServerDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serverInvite"]>

  export type ServerInviteSelectScalar = {
    id?: boolean
    code?: boolean
    serverId?: boolean
    maxUses?: boolean
    currentUses?: boolean
    expiresAt?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServerInviteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "serverId" | "maxUses" | "currentUses" | "expiresAt" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["serverInvite"]>
  export type ServerInviteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ServerInviteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ServerInviteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    server?: boolean | ServerDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ServerInvitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServerInvite"
    objects: {
      server: Prisma.$ServerPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      serverId: number
      maxUses: number | null
      currentUses: number
      expiresAt: Date | null
      createdById: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serverInvite"]>
    composites: {}
  }

  type ServerInviteGetPayload<S extends boolean | null | undefined | ServerInviteDefaultArgs> = $Result.GetResult<Prisma.$ServerInvitePayload, S>

  type ServerInviteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServerInviteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServerInviteCountAggregateInputType | true
    }

  export interface ServerInviteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServerInvite'], meta: { name: 'ServerInvite' } }
    /**
     * Find zero or one ServerInvite that matches the filter.
     * @param {ServerInviteFindUniqueArgs} args - Arguments to find a ServerInvite
     * @example
     * // Get one ServerInvite
     * const serverInvite = await prisma.serverInvite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServerInviteFindUniqueArgs>(args: SelectSubset<T, ServerInviteFindUniqueArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServerInvite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServerInviteFindUniqueOrThrowArgs} args - Arguments to find a ServerInvite
     * @example
     * // Get one ServerInvite
     * const serverInvite = await prisma.serverInvite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServerInviteFindUniqueOrThrowArgs>(args: SelectSubset<T, ServerInviteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServerInvite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerInviteFindFirstArgs} args - Arguments to find a ServerInvite
     * @example
     * // Get one ServerInvite
     * const serverInvite = await prisma.serverInvite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServerInviteFindFirstArgs>(args?: SelectSubset<T, ServerInviteFindFirstArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServerInvite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerInviteFindFirstOrThrowArgs} args - Arguments to find a ServerInvite
     * @example
     * // Get one ServerInvite
     * const serverInvite = await prisma.serverInvite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServerInviteFindFirstOrThrowArgs>(args?: SelectSubset<T, ServerInviteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServerInvites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerInviteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServerInvites
     * const serverInvites = await prisma.serverInvite.findMany()
     * 
     * // Get first 10 ServerInvites
     * const serverInvites = await prisma.serverInvite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serverInviteWithIdOnly = await prisma.serverInvite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServerInviteFindManyArgs>(args?: SelectSubset<T, ServerInviteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServerInvite.
     * @param {ServerInviteCreateArgs} args - Arguments to create a ServerInvite.
     * @example
     * // Create one ServerInvite
     * const ServerInvite = await prisma.serverInvite.create({
     *   data: {
     *     // ... data to create a ServerInvite
     *   }
     * })
     * 
     */
    create<T extends ServerInviteCreateArgs>(args: SelectSubset<T, ServerInviteCreateArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServerInvites.
     * @param {ServerInviteCreateManyArgs} args - Arguments to create many ServerInvites.
     * @example
     * // Create many ServerInvites
     * const serverInvite = await prisma.serverInvite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServerInviteCreateManyArgs>(args?: SelectSubset<T, ServerInviteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServerInvites and returns the data saved in the database.
     * @param {ServerInviteCreateManyAndReturnArgs} args - Arguments to create many ServerInvites.
     * @example
     * // Create many ServerInvites
     * const serverInvite = await prisma.serverInvite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServerInvites and only return the `id`
     * const serverInviteWithIdOnly = await prisma.serverInvite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServerInviteCreateManyAndReturnArgs>(args?: SelectSubset<T, ServerInviteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServerInvite.
     * @param {ServerInviteDeleteArgs} args - Arguments to delete one ServerInvite.
     * @example
     * // Delete one ServerInvite
     * const ServerInvite = await prisma.serverInvite.delete({
     *   where: {
     *     // ... filter to delete one ServerInvite
     *   }
     * })
     * 
     */
    delete<T extends ServerInviteDeleteArgs>(args: SelectSubset<T, ServerInviteDeleteArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServerInvite.
     * @param {ServerInviteUpdateArgs} args - Arguments to update one ServerInvite.
     * @example
     * // Update one ServerInvite
     * const serverInvite = await prisma.serverInvite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServerInviteUpdateArgs>(args: SelectSubset<T, ServerInviteUpdateArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServerInvites.
     * @param {ServerInviteDeleteManyArgs} args - Arguments to filter ServerInvites to delete.
     * @example
     * // Delete a few ServerInvites
     * const { count } = await prisma.serverInvite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServerInviteDeleteManyArgs>(args?: SelectSubset<T, ServerInviteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServerInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerInviteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServerInvites
     * const serverInvite = await prisma.serverInvite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServerInviteUpdateManyArgs>(args: SelectSubset<T, ServerInviteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServerInvites and returns the data updated in the database.
     * @param {ServerInviteUpdateManyAndReturnArgs} args - Arguments to update many ServerInvites.
     * @example
     * // Update many ServerInvites
     * const serverInvite = await prisma.serverInvite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServerInvites and only return the `id`
     * const serverInviteWithIdOnly = await prisma.serverInvite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServerInviteUpdateManyAndReturnArgs>(args: SelectSubset<T, ServerInviteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServerInvite.
     * @param {ServerInviteUpsertArgs} args - Arguments to update or create a ServerInvite.
     * @example
     * // Update or create a ServerInvite
     * const serverInvite = await prisma.serverInvite.upsert({
     *   create: {
     *     // ... data to create a ServerInvite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServerInvite we want to update
     *   }
     * })
     */
    upsert<T extends ServerInviteUpsertArgs>(args: SelectSubset<T, ServerInviteUpsertArgs<ExtArgs>>): Prisma__ServerInviteClient<$Result.GetResult<Prisma.$ServerInvitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServerInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerInviteCountArgs} args - Arguments to filter ServerInvites to count.
     * @example
     * // Count the number of ServerInvites
     * const count = await prisma.serverInvite.count({
     *   where: {
     *     // ... the filter for the ServerInvites we want to count
     *   }
     * })
    **/
    count<T extends ServerInviteCountArgs>(
      args?: Subset<T, ServerInviteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServerInviteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServerInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerInviteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServerInviteAggregateArgs>(args: Subset<T, ServerInviteAggregateArgs>): Prisma.PrismaPromise<GetServerInviteAggregateType<T>>

    /**
     * Group by ServerInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerInviteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServerInviteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServerInviteGroupByArgs['orderBy'] }
        : { orderBy?: ServerInviteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServerInviteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServerInviteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServerInvite model
   */
  readonly fields: ServerInviteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServerInvite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServerInviteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    server<T extends ServerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServerDefaultArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServerInvite model
   */
  interface ServerInviteFieldRefs {
    readonly id: FieldRef<"ServerInvite", 'Int'>
    readonly code: FieldRef<"ServerInvite", 'String'>
    readonly serverId: FieldRef<"ServerInvite", 'Int'>
    readonly maxUses: FieldRef<"ServerInvite", 'Int'>
    readonly currentUses: FieldRef<"ServerInvite", 'Int'>
    readonly expiresAt: FieldRef<"ServerInvite", 'DateTime'>
    readonly createdById: FieldRef<"ServerInvite", 'Int'>
    readonly createdAt: FieldRef<"ServerInvite", 'DateTime'>
    readonly updatedAt: FieldRef<"ServerInvite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServerInvite findUnique
   */
  export type ServerInviteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * Filter, which ServerInvite to fetch.
     */
    where: ServerInviteWhereUniqueInput
  }

  /**
   * ServerInvite findUniqueOrThrow
   */
  export type ServerInviteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * Filter, which ServerInvite to fetch.
     */
    where: ServerInviteWhereUniqueInput
  }

  /**
   * ServerInvite findFirst
   */
  export type ServerInviteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * Filter, which ServerInvite to fetch.
     */
    where?: ServerInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerInvites to fetch.
     */
    orderBy?: ServerInviteOrderByWithRelationInput | ServerInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServerInvites.
     */
    cursor?: ServerInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerInvites.
     */
    distinct?: ServerInviteScalarFieldEnum | ServerInviteScalarFieldEnum[]
  }

  /**
   * ServerInvite findFirstOrThrow
   */
  export type ServerInviteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * Filter, which ServerInvite to fetch.
     */
    where?: ServerInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerInvites to fetch.
     */
    orderBy?: ServerInviteOrderByWithRelationInput | ServerInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServerInvites.
     */
    cursor?: ServerInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerInvites.
     */
    distinct?: ServerInviteScalarFieldEnum | ServerInviteScalarFieldEnum[]
  }

  /**
   * ServerInvite findMany
   */
  export type ServerInviteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * Filter, which ServerInvites to fetch.
     */
    where?: ServerInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServerInvites to fetch.
     */
    orderBy?: ServerInviteOrderByWithRelationInput | ServerInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServerInvites.
     */
    cursor?: ServerInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServerInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServerInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServerInvites.
     */
    distinct?: ServerInviteScalarFieldEnum | ServerInviteScalarFieldEnum[]
  }

  /**
   * ServerInvite create
   */
  export type ServerInviteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * The data needed to create a ServerInvite.
     */
    data: XOR<ServerInviteCreateInput, ServerInviteUncheckedCreateInput>
  }

  /**
   * ServerInvite createMany
   */
  export type ServerInviteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServerInvites.
     */
    data: ServerInviteCreateManyInput | ServerInviteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServerInvite createManyAndReturn
   */
  export type ServerInviteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * The data used to create many ServerInvites.
     */
    data: ServerInviteCreateManyInput | ServerInviteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServerInvite update
   */
  export type ServerInviteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * The data needed to update a ServerInvite.
     */
    data: XOR<ServerInviteUpdateInput, ServerInviteUncheckedUpdateInput>
    /**
     * Choose, which ServerInvite to update.
     */
    where: ServerInviteWhereUniqueInput
  }

  /**
   * ServerInvite updateMany
   */
  export type ServerInviteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServerInvites.
     */
    data: XOR<ServerInviteUpdateManyMutationInput, ServerInviteUncheckedUpdateManyInput>
    /**
     * Filter which ServerInvites to update
     */
    where?: ServerInviteWhereInput
    /**
     * Limit how many ServerInvites to update.
     */
    limit?: number
  }

  /**
   * ServerInvite updateManyAndReturn
   */
  export type ServerInviteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * The data used to update ServerInvites.
     */
    data: XOR<ServerInviteUpdateManyMutationInput, ServerInviteUncheckedUpdateManyInput>
    /**
     * Filter which ServerInvites to update
     */
    where?: ServerInviteWhereInput
    /**
     * Limit how many ServerInvites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServerInvite upsert
   */
  export type ServerInviteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * The filter to search for the ServerInvite to update in case it exists.
     */
    where: ServerInviteWhereUniqueInput
    /**
     * In case the ServerInvite found by the `where` argument doesn't exist, create a new ServerInvite with this data.
     */
    create: XOR<ServerInviteCreateInput, ServerInviteUncheckedCreateInput>
    /**
     * In case the ServerInvite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServerInviteUpdateInput, ServerInviteUncheckedUpdateInput>
  }

  /**
   * ServerInvite delete
   */
  export type ServerInviteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
    /**
     * Filter which ServerInvite to delete.
     */
    where: ServerInviteWhereUniqueInput
  }

  /**
   * ServerInvite deleteMany
   */
  export type ServerInviteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServerInvites to delete
     */
    where?: ServerInviteWhereInput
    /**
     * Limit how many ServerInvites to delete.
     */
    limit?: number
  }

  /**
   * ServerInvite without action
   */
  export type ServerInviteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerInvite
     */
    select?: ServerInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServerInvite
     */
    omit?: ServerInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInviteInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageAvgAggregateOutputType = {
    id: number | null
    channelId: number | null
    authorId: number | null
    replyToMessageId: number | null
  }

  export type MessageSumAggregateOutputType = {
    id: number | null
    channelId: number | null
    authorId: number | null
    replyToMessageId: number | null
  }

  export type MessageMinAggregateOutputType = {
    id: number | null
    channelId: number | null
    authorId: number | null
    replyToMessageId: number | null
    content: string | null
    createdAt: Date | null
    editedAt: Date | null
    replyToDeleted: boolean | null
    clientMsgId: string | null
  }

  export type MessageMaxAggregateOutputType = {
    id: number | null
    channelId: number | null
    authorId: number | null
    replyToMessageId: number | null
    content: string | null
    createdAt: Date | null
    editedAt: Date | null
    replyToDeleted: boolean | null
    clientMsgId: string | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    channelId: number
    authorId: number
    replyToMessageId: number
    content: number
    createdAt: number
    editedAt: number
    replyToDeleted: number
    clientMsgId: number
    _all: number
  }


  export type MessageAvgAggregateInputType = {
    id?: true
    channelId?: true
    authorId?: true
    replyToMessageId?: true
  }

  export type MessageSumAggregateInputType = {
    id?: true
    channelId?: true
    authorId?: true
    replyToMessageId?: true
  }

  export type MessageMinAggregateInputType = {
    id?: true
    channelId?: true
    authorId?: true
    replyToMessageId?: true
    content?: true
    createdAt?: true
    editedAt?: true
    replyToDeleted?: true
    clientMsgId?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    channelId?: true
    authorId?: true
    replyToMessageId?: true
    content?: true
    createdAt?: true
    editedAt?: true
    replyToDeleted?: true
    clientMsgId?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    channelId?: true
    authorId?: true
    replyToMessageId?: true
    content?: true
    createdAt?: true
    editedAt?: true
    replyToDeleted?: true
    clientMsgId?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _avg?: MessageAvgAggregateInputType
    _sum?: MessageSumAggregateInputType
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: number
    channelId: number
    authorId: number
    replyToMessageId: number | null
    content: string | null
    createdAt: Date
    editedAt: Date | null
    replyToDeleted: boolean
    clientMsgId: string | null
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    channelId?: boolean
    authorId?: boolean
    replyToMessageId?: boolean
    content?: boolean
    createdAt?: boolean
    editedAt?: boolean
    replyToDeleted?: boolean
    clientMsgId?: boolean
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    replyTo?: boolean | Message$replyToArgs<ExtArgs>
    replies?: boolean | Message$repliesArgs<ExtArgs>
    attachments?: boolean | Message$attachmentsArgs<ExtArgs>
    reactions?: boolean | Message$reactionsArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    channelId?: boolean
    authorId?: boolean
    replyToMessageId?: boolean
    content?: boolean
    createdAt?: boolean
    editedAt?: boolean
    replyToDeleted?: boolean
    clientMsgId?: boolean
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    replyTo?: boolean | Message$replyToArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    channelId?: boolean
    authorId?: boolean
    replyToMessageId?: boolean
    content?: boolean
    createdAt?: boolean
    editedAt?: boolean
    replyToDeleted?: boolean
    clientMsgId?: boolean
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    replyTo?: boolean | Message$replyToArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    channelId?: boolean
    authorId?: boolean
    replyToMessageId?: boolean
    content?: boolean
    createdAt?: boolean
    editedAt?: boolean
    replyToDeleted?: boolean
    clientMsgId?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "channelId" | "authorId" | "replyToMessageId" | "content" | "createdAt" | "editedAt" | "replyToDeleted" | "clientMsgId", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    replyTo?: boolean | Message$replyToArgs<ExtArgs>
    replies?: boolean | Message$repliesArgs<ExtArgs>
    attachments?: boolean | Message$attachmentsArgs<ExtArgs>
    reactions?: boolean | Message$reactionsArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    replyTo?: boolean | Message$replyToArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    replyTo?: boolean | Message$replyToArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      channel: Prisma.$ChannelPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
      replyTo: Prisma.$MessagePayload<ExtArgs> | null
      replies: Prisma.$MessagePayload<ExtArgs>[]
      attachments: Prisma.$AttachmentPayload<ExtArgs>[]
      reactions: Prisma.$ReactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      channelId: number
      authorId: number
      replyToMessageId: number | null
      content: string | null
      createdAt: Date
      editedAt: Date | null
      replyToDeleted: boolean
      clientMsgId: string | null
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    channel<T extends ChannelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChannelDefaultArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    replyTo<T extends Message$replyToArgs<ExtArgs> = {}>(args?: Subset<T, Message$replyToArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    replies<T extends Message$repliesArgs<ExtArgs> = {}>(args?: Subset<T, Message$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attachments<T extends Message$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Message$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reactions<T extends Message$reactionsArgs<ExtArgs> = {}>(args?: Subset<T, Message$reactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'Int'>
    readonly channelId: FieldRef<"Message", 'Int'>
    readonly authorId: FieldRef<"Message", 'Int'>
    readonly replyToMessageId: FieldRef<"Message", 'Int'>
    readonly content: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly editedAt: FieldRef<"Message", 'DateTime'>
    readonly replyToDeleted: FieldRef<"Message", 'Boolean'>
    readonly clientMsgId: FieldRef<"Message", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message.replyTo
   */
  export type Message$replyToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
  }

  /**
   * Message.replies
   */
  export type Message$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message.attachments
   */
  export type Message$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    where?: AttachmentWhereInput
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    cursor?: AttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Message.reactions
   */
  export type Message$reactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    where?: ReactionWhereInput
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    cursor?: ReactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReactionScalarFieldEnum | ReactionScalarFieldEnum[]
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model Attachment
   */

  export type AggregateAttachment = {
    _count: AttachmentCountAggregateOutputType | null
    _avg: AttachmentAvgAggregateOutputType | null
    _sum: AttachmentSumAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  export type AttachmentAvgAggregateOutputType = {
    id: number | null
    messageId: number | null
    channelId: number | null
  }

  export type AttachmentSumAggregateOutputType = {
    id: number | null
    messageId: number | null
    channelId: number | null
  }

  export type AttachmentMinAggregateOutputType = {
    id: number | null
    messageId: number | null
    channelId: number | null
    originalName: string | null
    type: $Enums.AttachmentType | null
    publicId: string | null
    url: string | null
  }

  export type AttachmentMaxAggregateOutputType = {
    id: number | null
    messageId: number | null
    channelId: number | null
    originalName: string | null
    type: $Enums.AttachmentType | null
    publicId: string | null
    url: string | null
  }

  export type AttachmentCountAggregateOutputType = {
    id: number
    messageId: number
    channelId: number
    originalName: number
    type: number
    publicId: number
    url: number
    _all: number
  }


  export type AttachmentAvgAggregateInputType = {
    id?: true
    messageId?: true
    channelId?: true
  }

  export type AttachmentSumAggregateInputType = {
    id?: true
    messageId?: true
    channelId?: true
  }

  export type AttachmentMinAggregateInputType = {
    id?: true
    messageId?: true
    channelId?: true
    originalName?: true
    type?: true
    publicId?: true
    url?: true
  }

  export type AttachmentMaxAggregateInputType = {
    id?: true
    messageId?: true
    channelId?: true
    originalName?: true
    type?: true
    publicId?: true
    url?: true
  }

  export type AttachmentCountAggregateInputType = {
    id?: true
    messageId?: true
    channelId?: true
    originalName?: true
    type?: true
    publicId?: true
    url?: true
    _all?: true
  }

  export type AttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attachment to aggregate.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attachments
    **/
    _count?: true | AttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttachmentMaxAggregateInputType
  }

  export type GetAttachmentAggregateType<T extends AttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttachment[P]>
      : GetScalarType<T[P], AggregateAttachment[P]>
  }




  export type AttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
    orderBy?: AttachmentOrderByWithAggregationInput | AttachmentOrderByWithAggregationInput[]
    by: AttachmentScalarFieldEnum[] | AttachmentScalarFieldEnum
    having?: AttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttachmentCountAggregateInputType | true
    _avg?: AttachmentAvgAggregateInputType
    _sum?: AttachmentSumAggregateInputType
    _min?: AttachmentMinAggregateInputType
    _max?: AttachmentMaxAggregateInputType
  }

  export type AttachmentGroupByOutputType = {
    id: number
    messageId: number
    channelId: number
    originalName: string
    type: $Enums.AttachmentType
    publicId: string
    url: string
    _count: AttachmentCountAggregateOutputType | null
    _avg: AttachmentAvgAggregateOutputType | null
    _sum: AttachmentSumAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  type GetAttachmentGroupByPayload<T extends AttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
        }
      >
    >


  export type AttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    channelId?: boolean
    originalName?: boolean
    type?: boolean
    publicId?: boolean
    url?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    channelId?: boolean
    originalName?: boolean
    type?: boolean
    publicId?: boolean
    url?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    channelId?: boolean
    originalName?: boolean
    type?: boolean
    publicId?: boolean
    url?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectScalar = {
    id?: boolean
    messageId?: boolean
    channelId?: boolean
    originalName?: boolean
    type?: boolean
    publicId?: boolean
    url?: boolean
  }

  export type AttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "messageId" | "channelId" | "originalName" | "type" | "publicId" | "url", ExtArgs["result"]["attachment"]>
  export type AttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }
  export type AttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }
  export type AttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }

  export type $AttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attachment"
    objects: {
      message: Prisma.$MessagePayload<ExtArgs>
      channel: Prisma.$ChannelPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      messageId: number
      channelId: number
      originalName: string
      type: $Enums.AttachmentType
      publicId: string
      url: string
    }, ExtArgs["result"]["attachment"]>
    composites: {}
  }

  type AttachmentGetPayload<S extends boolean | null | undefined | AttachmentDefaultArgs> = $Result.GetResult<Prisma.$AttachmentPayload, S>

  type AttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttachmentCountAggregateInputType | true
    }

  export interface AttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attachment'], meta: { name: 'Attachment' } }
    /**
     * Find zero or one Attachment that matches the filter.
     * @param {AttachmentFindUniqueArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttachmentFindUniqueArgs>(args: SelectSubset<T, AttachmentFindUniqueArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttachmentFindUniqueOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttachmentFindFirstArgs>(args?: SelectSubset<T, AttachmentFindFirstArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attachments
     * const attachments = await prisma.attachment.findMany()
     * 
     * // Get first 10 Attachments
     * const attachments = await prisma.attachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attachmentWithIdOnly = await prisma.attachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttachmentFindManyArgs>(args?: SelectSubset<T, AttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attachment.
     * @param {AttachmentCreateArgs} args - Arguments to create a Attachment.
     * @example
     * // Create one Attachment
     * const Attachment = await prisma.attachment.create({
     *   data: {
     *     // ... data to create a Attachment
     *   }
     * })
     * 
     */
    create<T extends AttachmentCreateArgs>(args: SelectSubset<T, AttachmentCreateArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attachments.
     * @param {AttachmentCreateManyArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttachmentCreateManyArgs>(args?: SelectSubset<T, AttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attachments and returns the data saved in the database.
     * @param {AttachmentCreateManyAndReturnArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attachments and only return the `id`
     * const attachmentWithIdOnly = await prisma.attachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Attachment.
     * @param {AttachmentDeleteArgs} args - Arguments to delete one Attachment.
     * @example
     * // Delete one Attachment
     * const Attachment = await prisma.attachment.delete({
     *   where: {
     *     // ... filter to delete one Attachment
     *   }
     * })
     * 
     */
    delete<T extends AttachmentDeleteArgs>(args: SelectSubset<T, AttachmentDeleteArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attachment.
     * @param {AttachmentUpdateArgs} args - Arguments to update one Attachment.
     * @example
     * // Update one Attachment
     * const attachment = await prisma.attachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttachmentUpdateArgs>(args: SelectSubset<T, AttachmentUpdateArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attachments.
     * @param {AttachmentDeleteManyArgs} args - Arguments to filter Attachments to delete.
     * @example
     * // Delete a few Attachments
     * const { count } = await prisma.attachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttachmentDeleteManyArgs>(args?: SelectSubset<T, AttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttachmentUpdateManyArgs>(args: SelectSubset<T, AttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachments and returns the data updated in the database.
     * @param {AttachmentUpdateManyAndReturnArgs} args - Arguments to update many Attachments.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Attachments and only return the `id`
     * const attachmentWithIdOnly = await prisma.attachment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Attachment.
     * @param {AttachmentUpsertArgs} args - Arguments to update or create a Attachment.
     * @example
     * // Update or create a Attachment
     * const attachment = await prisma.attachment.upsert({
     *   create: {
     *     // ... data to create a Attachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attachment we want to update
     *   }
     * })
     */
    upsert<T extends AttachmentUpsertArgs>(args: SelectSubset<T, AttachmentUpsertArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentCountArgs} args - Arguments to filter Attachments to count.
     * @example
     * // Count the number of Attachments
     * const count = await prisma.attachment.count({
     *   where: {
     *     // ... the filter for the Attachments we want to count
     *   }
     * })
    **/
    count<T extends AttachmentCountArgs>(
      args?: Subset<T, AttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttachmentAggregateArgs>(args: Subset<T, AttachmentAggregateArgs>): Prisma.PrismaPromise<GetAttachmentAggregateType<T>>

    /**
     * Group by Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttachmentGroupByArgs['orderBy'] }
        : { orderBy?: AttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attachment model
   */
  readonly fields: AttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    message<T extends MessageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MessageDefaultArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    channel<T extends ChannelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChannelDefaultArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attachment model
   */
  interface AttachmentFieldRefs {
    readonly id: FieldRef<"Attachment", 'Int'>
    readonly messageId: FieldRef<"Attachment", 'Int'>
    readonly channelId: FieldRef<"Attachment", 'Int'>
    readonly originalName: FieldRef<"Attachment", 'String'>
    readonly type: FieldRef<"Attachment", 'AttachmentType'>
    readonly publicId: FieldRef<"Attachment", 'String'>
    readonly url: FieldRef<"Attachment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Attachment findUnique
   */
  export type AttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment findUniqueOrThrow
   */
  export type AttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment findFirst
   */
  export type AttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment findFirstOrThrow
   */
  export type AttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment findMany
   */
  export type AttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachments to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment create
   */
  export type AttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Attachment.
     */
    data: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>
  }

  /**
   * Attachment createMany
   */
  export type AttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attachments.
     */
    data: AttachmentCreateManyInput | AttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attachment createManyAndReturn
   */
  export type AttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many Attachments.
     */
    data: AttachmentCreateManyInput | AttachmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attachment update
   */
  export type AttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Attachment.
     */
    data: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>
    /**
     * Choose, which Attachment to update.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment updateMany
   */
  export type AttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attachments.
     */
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyInput>
    /**
     * Filter which Attachments to update
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to update.
     */
    limit?: number
  }

  /**
   * Attachment updateManyAndReturn
   */
  export type AttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * The data used to update Attachments.
     */
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyInput>
    /**
     * Filter which Attachments to update
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attachment upsert
   */
  export type AttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Attachment to update in case it exists.
     */
    where: AttachmentWhereUniqueInput
    /**
     * In case the Attachment found by the `where` argument doesn't exist, create a new Attachment with this data.
     */
    create: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>
    /**
     * In case the Attachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>
  }

  /**
   * Attachment delete
   */
  export type AttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter which Attachment to delete.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment deleteMany
   */
  export type AttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attachments to delete
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to delete.
     */
    limit?: number
  }

  /**
   * Attachment without action
   */
  export type AttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
  }


  /**
   * Model Reaction
   */

  export type AggregateReaction = {
    _count: ReactionCountAggregateOutputType | null
    _avg: ReactionAvgAggregateOutputType | null
    _sum: ReactionSumAggregateOutputType | null
    _min: ReactionMinAggregateOutputType | null
    _max: ReactionMaxAggregateOutputType | null
  }

  export type ReactionAvgAggregateOutputType = {
    id: number | null
    messageId: number | null
    userId: number | null
  }

  export type ReactionSumAggregateOutputType = {
    id: number | null
    messageId: number | null
    userId: number | null
  }

  export type ReactionMinAggregateOutputType = {
    id: number | null
    messageId: number | null
    userId: number | null
    emoji: string | null
    createdAt: Date | null
  }

  export type ReactionMaxAggregateOutputType = {
    id: number | null
    messageId: number | null
    userId: number | null
    emoji: string | null
    createdAt: Date | null
  }

  export type ReactionCountAggregateOutputType = {
    id: number
    messageId: number
    userId: number
    emoji: number
    createdAt: number
    _all: number
  }


  export type ReactionAvgAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
  }

  export type ReactionSumAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
  }

  export type ReactionMinAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    emoji?: true
    createdAt?: true
  }

  export type ReactionMaxAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    emoji?: true
    createdAt?: true
  }

  export type ReactionCountAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    emoji?: true
    createdAt?: true
    _all?: true
  }

  export type ReactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reaction to aggregate.
     */
    where?: ReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reactions to fetch.
     */
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reactions
    **/
    _count?: true | ReactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReactionMaxAggregateInputType
  }

  export type GetReactionAggregateType<T extends ReactionAggregateArgs> = {
        [P in keyof T & keyof AggregateReaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReaction[P]>
      : GetScalarType<T[P], AggregateReaction[P]>
  }




  export type ReactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReactionWhereInput
    orderBy?: ReactionOrderByWithAggregationInput | ReactionOrderByWithAggregationInput[]
    by: ReactionScalarFieldEnum[] | ReactionScalarFieldEnum
    having?: ReactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReactionCountAggregateInputType | true
    _avg?: ReactionAvgAggregateInputType
    _sum?: ReactionSumAggregateInputType
    _min?: ReactionMinAggregateInputType
    _max?: ReactionMaxAggregateInputType
  }

  export type ReactionGroupByOutputType = {
    id: number
    messageId: number
    userId: number
    emoji: string
    createdAt: Date
    _count: ReactionCountAggregateOutputType | null
    _avg: ReactionAvgAggregateOutputType | null
    _sum: ReactionSumAggregateOutputType | null
    _min: ReactionMinAggregateOutputType | null
    _max: ReactionMaxAggregateOutputType | null
  }

  type GetReactionGroupByPayload<T extends ReactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReactionGroupByOutputType[P]>
            : GetScalarType<T[P], ReactionGroupByOutputType[P]>
        }
      >
    >


  export type ReactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    userId?: boolean
    emoji?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    Message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reaction"]>

  export type ReactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    userId?: boolean
    emoji?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    Message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reaction"]>

  export type ReactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    userId?: boolean
    emoji?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    Message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reaction"]>

  export type ReactionSelectScalar = {
    id?: boolean
    messageId?: boolean
    userId?: boolean
    emoji?: boolean
    createdAt?: boolean
  }

  export type ReactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "messageId" | "userId" | "emoji" | "createdAt", ExtArgs["result"]["reaction"]>
  export type ReactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    Message?: boolean | MessageDefaultArgs<ExtArgs>
  }
  export type ReactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    Message?: boolean | MessageDefaultArgs<ExtArgs>
  }
  export type ReactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    Message?: boolean | MessageDefaultArgs<ExtArgs>
  }

  export type $ReactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      Message: Prisma.$MessagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      messageId: number
      userId: number
      emoji: string
      createdAt: Date
    }, ExtArgs["result"]["reaction"]>
    composites: {}
  }

  type ReactionGetPayload<S extends boolean | null | undefined | ReactionDefaultArgs> = $Result.GetResult<Prisma.$ReactionPayload, S>

  type ReactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReactionCountAggregateInputType | true
    }

  export interface ReactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reaction'], meta: { name: 'Reaction' } }
    /**
     * Find zero or one Reaction that matches the filter.
     * @param {ReactionFindUniqueArgs} args - Arguments to find a Reaction
     * @example
     * // Get one Reaction
     * const reaction = await prisma.reaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReactionFindUniqueArgs>(args: SelectSubset<T, ReactionFindUniqueArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReactionFindUniqueOrThrowArgs} args - Arguments to find a Reaction
     * @example
     * // Get one Reaction
     * const reaction = await prisma.reaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReactionFindUniqueOrThrowArgs>(args: SelectSubset<T, ReactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionFindFirstArgs} args - Arguments to find a Reaction
     * @example
     * // Get one Reaction
     * const reaction = await prisma.reaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReactionFindFirstArgs>(args?: SelectSubset<T, ReactionFindFirstArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionFindFirstOrThrowArgs} args - Arguments to find a Reaction
     * @example
     * // Get one Reaction
     * const reaction = await prisma.reaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReactionFindFirstOrThrowArgs>(args?: SelectSubset<T, ReactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reactions
     * const reactions = await prisma.reaction.findMany()
     * 
     * // Get first 10 Reactions
     * const reactions = await prisma.reaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reactionWithIdOnly = await prisma.reaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReactionFindManyArgs>(args?: SelectSubset<T, ReactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reaction.
     * @param {ReactionCreateArgs} args - Arguments to create a Reaction.
     * @example
     * // Create one Reaction
     * const Reaction = await prisma.reaction.create({
     *   data: {
     *     // ... data to create a Reaction
     *   }
     * })
     * 
     */
    create<T extends ReactionCreateArgs>(args: SelectSubset<T, ReactionCreateArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reactions.
     * @param {ReactionCreateManyArgs} args - Arguments to create many Reactions.
     * @example
     * // Create many Reactions
     * const reaction = await prisma.reaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReactionCreateManyArgs>(args?: SelectSubset<T, ReactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reactions and returns the data saved in the database.
     * @param {ReactionCreateManyAndReturnArgs} args - Arguments to create many Reactions.
     * @example
     * // Create many Reactions
     * const reaction = await prisma.reaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reactions and only return the `id`
     * const reactionWithIdOnly = await prisma.reaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReactionCreateManyAndReturnArgs>(args?: SelectSubset<T, ReactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reaction.
     * @param {ReactionDeleteArgs} args - Arguments to delete one Reaction.
     * @example
     * // Delete one Reaction
     * const Reaction = await prisma.reaction.delete({
     *   where: {
     *     // ... filter to delete one Reaction
     *   }
     * })
     * 
     */
    delete<T extends ReactionDeleteArgs>(args: SelectSubset<T, ReactionDeleteArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reaction.
     * @param {ReactionUpdateArgs} args - Arguments to update one Reaction.
     * @example
     * // Update one Reaction
     * const reaction = await prisma.reaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReactionUpdateArgs>(args: SelectSubset<T, ReactionUpdateArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reactions.
     * @param {ReactionDeleteManyArgs} args - Arguments to filter Reactions to delete.
     * @example
     * // Delete a few Reactions
     * const { count } = await prisma.reaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReactionDeleteManyArgs>(args?: SelectSubset<T, ReactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reactions
     * const reaction = await prisma.reaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReactionUpdateManyArgs>(args: SelectSubset<T, ReactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reactions and returns the data updated in the database.
     * @param {ReactionUpdateManyAndReturnArgs} args - Arguments to update many Reactions.
     * @example
     * // Update many Reactions
     * const reaction = await prisma.reaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reactions and only return the `id`
     * const reactionWithIdOnly = await prisma.reaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReactionUpdateManyAndReturnArgs>(args: SelectSubset<T, ReactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reaction.
     * @param {ReactionUpsertArgs} args - Arguments to update or create a Reaction.
     * @example
     * // Update or create a Reaction
     * const reaction = await prisma.reaction.upsert({
     *   create: {
     *     // ... data to create a Reaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reaction we want to update
     *   }
     * })
     */
    upsert<T extends ReactionUpsertArgs>(args: SelectSubset<T, ReactionUpsertArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionCountArgs} args - Arguments to filter Reactions to count.
     * @example
     * // Count the number of Reactions
     * const count = await prisma.reaction.count({
     *   where: {
     *     // ... the filter for the Reactions we want to count
     *   }
     * })
    **/
    count<T extends ReactionCountArgs>(
      args?: Subset<T, ReactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReactionAggregateArgs>(args: Subset<T, ReactionAggregateArgs>): Prisma.PrismaPromise<GetReactionAggregateType<T>>

    /**
     * Group by Reaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReactionGroupByArgs['orderBy'] }
        : { orderBy?: ReactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reaction model
   */
  readonly fields: ReactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Message<T extends MessageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MessageDefaultArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reaction model
   */
  interface ReactionFieldRefs {
    readonly id: FieldRef<"Reaction", 'Int'>
    readonly messageId: FieldRef<"Reaction", 'Int'>
    readonly userId: FieldRef<"Reaction", 'Int'>
    readonly emoji: FieldRef<"Reaction", 'String'>
    readonly createdAt: FieldRef<"Reaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Reaction findUnique
   */
  export type ReactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reaction to fetch.
     */
    where: ReactionWhereUniqueInput
  }

  /**
   * Reaction findUniqueOrThrow
   */
  export type ReactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reaction to fetch.
     */
    where: ReactionWhereUniqueInput
  }

  /**
   * Reaction findFirst
   */
  export type ReactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reaction to fetch.
     */
    where?: ReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reactions to fetch.
     */
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reactions.
     */
    cursor?: ReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reactions.
     */
    distinct?: ReactionScalarFieldEnum | ReactionScalarFieldEnum[]
  }

  /**
   * Reaction findFirstOrThrow
   */
  export type ReactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reaction to fetch.
     */
    where?: ReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reactions to fetch.
     */
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reactions.
     */
    cursor?: ReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reactions.
     */
    distinct?: ReactionScalarFieldEnum | ReactionScalarFieldEnum[]
  }

  /**
   * Reaction findMany
   */
  export type ReactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reactions to fetch.
     */
    where?: ReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reactions to fetch.
     */
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reactions.
     */
    cursor?: ReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reactions.
     */
    distinct?: ReactionScalarFieldEnum | ReactionScalarFieldEnum[]
  }

  /**
   * Reaction create
   */
  export type ReactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Reaction.
     */
    data: XOR<ReactionCreateInput, ReactionUncheckedCreateInput>
  }

  /**
   * Reaction createMany
   */
  export type ReactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reactions.
     */
    data: ReactionCreateManyInput | ReactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reaction createManyAndReturn
   */
  export type ReactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * The data used to create many Reactions.
     */
    data: ReactionCreateManyInput | ReactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reaction update
   */
  export type ReactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Reaction.
     */
    data: XOR<ReactionUpdateInput, ReactionUncheckedUpdateInput>
    /**
     * Choose, which Reaction to update.
     */
    where: ReactionWhereUniqueInput
  }

  /**
   * Reaction updateMany
   */
  export type ReactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reactions.
     */
    data: XOR<ReactionUpdateManyMutationInput, ReactionUncheckedUpdateManyInput>
    /**
     * Filter which Reactions to update
     */
    where?: ReactionWhereInput
    /**
     * Limit how many Reactions to update.
     */
    limit?: number
  }

  /**
   * Reaction updateManyAndReturn
   */
  export type ReactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * The data used to update Reactions.
     */
    data: XOR<ReactionUpdateManyMutationInput, ReactionUncheckedUpdateManyInput>
    /**
     * Filter which Reactions to update
     */
    where?: ReactionWhereInput
    /**
     * Limit how many Reactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reaction upsert
   */
  export type ReactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Reaction to update in case it exists.
     */
    where: ReactionWhereUniqueInput
    /**
     * In case the Reaction found by the `where` argument doesn't exist, create a new Reaction with this data.
     */
    create: XOR<ReactionCreateInput, ReactionUncheckedCreateInput>
    /**
     * In case the Reaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReactionUpdateInput, ReactionUncheckedUpdateInput>
  }

  /**
   * Reaction delete
   */
  export type ReactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter which Reaction to delete.
     */
    where: ReactionWhereUniqueInput
  }

  /**
   * Reaction deleteMany
   */
  export type ReactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reactions to delete
     */
    where?: ReactionWhereInput
    /**
     * Limit how many Reactions to delete.
     */
    limit?: number
  }

  /**
   * Reaction without action
   */
  export type ReactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    passwordHash: 'passwordHash',
    avatarUrl: 'avatarUrl',
    bio: 'bio',
    verified: 'verified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    type: 'type',
    expiresAt: 'expiresAt',
    used: 'used',
    createdAt: 'createdAt'
  };

  export type UserTokenScalarFieldEnum = (typeof UserTokenScalarFieldEnum)[keyof typeof UserTokenScalarFieldEnum]


  export const ServerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    avatarUrl: 'avatarUrl',
    ownerId: 'ownerId',
    createdAt: 'createdAt'
  };

  export type ServerScalarFieldEnum = (typeof ServerScalarFieldEnum)[keyof typeof ServerScalarFieldEnum]


  export const BanScalarFieldEnum: {
    id: 'id',
    serverId: 'serverId',
    userId: 'userId',
    bannedByRole: 'bannedByRole',
    reason: 'reason',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    revokedAt: 'revokedAt',
    appealStatus: 'appealStatus'
  };

  export type BanScalarFieldEnum = (typeof BanScalarFieldEnum)[keyof typeof BanScalarFieldEnum]


  export const ServerMemberScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    serverId: 'serverId',
    role: 'role',
    joinedAt: 'joinedAt'
  };

  export type ServerMemberScalarFieldEnum = (typeof ServerMemberScalarFieldEnum)[keyof typeof ServerMemberScalarFieldEnum]


  export const ChannelScalarFieldEnum: {
    id: 'id',
    name: 'name',
    serverId: 'serverId',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type ChannelScalarFieldEnum = (typeof ChannelScalarFieldEnum)[keyof typeof ChannelScalarFieldEnum]


  export const ServerInviteScalarFieldEnum: {
    id: 'id',
    code: 'code',
    serverId: 'serverId',
    maxUses: 'maxUses',
    currentUses: 'currentUses',
    expiresAt: 'expiresAt',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServerInviteScalarFieldEnum = (typeof ServerInviteScalarFieldEnum)[keyof typeof ServerInviteScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    channelId: 'channelId',
    authorId: 'authorId',
    replyToMessageId: 'replyToMessageId',
    content: 'content',
    createdAt: 'createdAt',
    editedAt: 'editedAt',
    replyToDeleted: 'replyToDeleted',
    clientMsgId: 'clientMsgId'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const AttachmentScalarFieldEnum: {
    id: 'id',
    messageId: 'messageId',
    channelId: 'channelId',
    originalName: 'originalName',
    type: 'type',
    publicId: 'publicId',
    url: 'url'
  };

  export type AttachmentScalarFieldEnum = (typeof AttachmentScalarFieldEnum)[keyof typeof AttachmentScalarFieldEnum]


  export const ReactionScalarFieldEnum: {
    id: 'id',
    messageId: 'messageId',
    userId: 'userId',
    emoji: 'emoji',
    createdAt: 'createdAt'
  };

  export type ReactionScalarFieldEnum = (typeof ReactionScalarFieldEnum)[keyof typeof ReactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'VerifyTokenType'
   */
  export type EnumVerifyTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerifyTokenType'>
    


  /**
   * Reference to a field of type 'VerifyTokenType[]'
   */
  export type ListEnumVerifyTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerifyTokenType[]'>
    


  /**
   * Reference to a field of type 'MemberRole'
   */
  export type EnumMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MemberRole'>
    


  /**
   * Reference to a field of type 'MemberRole[]'
   */
  export type ListEnumMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MemberRole[]'>
    


  /**
   * Reference to a field of type 'BanAppealStatus'
   */
  export type EnumBanAppealStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BanAppealStatus'>
    


  /**
   * Reference to a field of type 'BanAppealStatus[]'
   */
  export type ListEnumBanAppealStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BanAppealStatus[]'>
    


  /**
   * Reference to a field of type 'ChannelType'
   */
  export type EnumChannelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChannelType'>
    


  /**
   * Reference to a field of type 'ChannelType[]'
   */
  export type ListEnumChannelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChannelType[]'>
    


  /**
   * Reference to a field of type 'AttachmentType'
   */
  export type EnumAttachmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AttachmentType'>
    


  /**
   * Reference to a field of type 'AttachmentType[]'
   */
  export type ListEnumAttachmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AttachmentType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    verified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tokens?: UserTokenListRelationFilter
    memberships?: ServerMemberListRelationFilter
    ownedServers?: ServerListRelationFilter
    createdInvites?: ServerInviteListRelationFilter
    bans?: BanListRelationFilter
    messages?: MessageListRelationFilter
    reactions?: ReactionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tokens?: UserTokenOrderByRelationAggregateInput
    memberships?: ServerMemberOrderByRelationAggregateInput
    ownedServers?: ServerOrderByRelationAggregateInput
    createdInvites?: ServerInviteOrderByRelationAggregateInput
    bans?: BanOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
    reactions?: ReactionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    verified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tokens?: UserTokenListRelationFilter
    memberships?: ServerMemberListRelationFilter
    ownedServers?: ServerListRelationFilter
    createdInvites?: ServerInviteListRelationFilter
    bans?: BanListRelationFilter
    messages?: MessageListRelationFilter
    reactions?: ReactionListRelationFilter
  }, "id" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    verified?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserTokenWhereInput = {
    AND?: UserTokenWhereInput | UserTokenWhereInput[]
    OR?: UserTokenWhereInput[]
    NOT?: UserTokenWhereInput | UserTokenWhereInput[]
    id?: IntFilter<"UserToken"> | number
    userId?: IntFilter<"UserToken"> | number
    token?: StringFilter<"UserToken"> | string
    type?: EnumVerifyTokenTypeFilter<"UserToken"> | $Enums.VerifyTokenType
    expiresAt?: DateTimeFilter<"UserToken"> | Date | string
    used?: BoolFilter<"UserToken"> | boolean
    createdAt?: DateTimeFilter<"UserToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserTokenWhereInput | UserTokenWhereInput[]
    OR?: UserTokenWhereInput[]
    NOT?: UserTokenWhereInput | UserTokenWhereInput[]
    userId?: IntFilter<"UserToken"> | number
    token?: StringFilter<"UserToken"> | string
    type?: EnumVerifyTokenTypeFilter<"UserToken"> | $Enums.VerifyTokenType
    expiresAt?: DateTimeFilter<"UserToken"> | Date | string
    used?: BoolFilter<"UserToken"> | boolean
    createdAt?: DateTimeFilter<"UserToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    _count?: UserTokenCountOrderByAggregateInput
    _avg?: UserTokenAvgOrderByAggregateInput
    _max?: UserTokenMaxOrderByAggregateInput
    _min?: UserTokenMinOrderByAggregateInput
    _sum?: UserTokenSumOrderByAggregateInput
  }

  export type UserTokenScalarWhereWithAggregatesInput = {
    AND?: UserTokenScalarWhereWithAggregatesInput | UserTokenScalarWhereWithAggregatesInput[]
    OR?: UserTokenScalarWhereWithAggregatesInput[]
    NOT?: UserTokenScalarWhereWithAggregatesInput | UserTokenScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserToken"> | number
    userId?: IntWithAggregatesFilter<"UserToken"> | number
    token?: StringWithAggregatesFilter<"UserToken"> | string
    type?: EnumVerifyTokenTypeWithAggregatesFilter<"UserToken"> | $Enums.VerifyTokenType
    expiresAt?: DateTimeWithAggregatesFilter<"UserToken"> | Date | string
    used?: BoolWithAggregatesFilter<"UserToken"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"UserToken"> | Date | string
  }

  export type ServerWhereInput = {
    AND?: ServerWhereInput | ServerWhereInput[]
    OR?: ServerWhereInput[]
    NOT?: ServerWhereInput | ServerWhereInput[]
    id?: IntFilter<"Server"> | number
    name?: StringFilter<"Server"> | string
    avatarUrl?: StringNullableFilter<"Server"> | string | null
    ownerId?: IntFilter<"Server"> | number
    createdAt?: DateTimeFilter<"Server"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: ServerMemberListRelationFilter
    channels?: ChannelListRelationFilter
    invites?: ServerInviteListRelationFilter
    bans?: BanListRelationFilter
  }

  export type ServerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    members?: ServerMemberOrderByRelationAggregateInput
    channels?: ChannelOrderByRelationAggregateInput
    invites?: ServerInviteOrderByRelationAggregateInput
    bans?: BanOrderByRelationAggregateInput
  }

  export type ServerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ServerWhereInput | ServerWhereInput[]
    OR?: ServerWhereInput[]
    NOT?: ServerWhereInput | ServerWhereInput[]
    name?: StringFilter<"Server"> | string
    avatarUrl?: StringNullableFilter<"Server"> | string | null
    ownerId?: IntFilter<"Server"> | number
    createdAt?: DateTimeFilter<"Server"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: ServerMemberListRelationFilter
    channels?: ChannelListRelationFilter
    invites?: ServerInviteListRelationFilter
    bans?: BanListRelationFilter
  }, "id">

  export type ServerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    _count?: ServerCountOrderByAggregateInput
    _avg?: ServerAvgOrderByAggregateInput
    _max?: ServerMaxOrderByAggregateInput
    _min?: ServerMinOrderByAggregateInput
    _sum?: ServerSumOrderByAggregateInput
  }

  export type ServerScalarWhereWithAggregatesInput = {
    AND?: ServerScalarWhereWithAggregatesInput | ServerScalarWhereWithAggregatesInput[]
    OR?: ServerScalarWhereWithAggregatesInput[]
    NOT?: ServerScalarWhereWithAggregatesInput | ServerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Server"> | number
    name?: StringWithAggregatesFilter<"Server"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"Server"> | string | null
    ownerId?: IntWithAggregatesFilter<"Server"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Server"> | Date | string
  }

  export type BanWhereInput = {
    AND?: BanWhereInput | BanWhereInput[]
    OR?: BanWhereInput[]
    NOT?: BanWhereInput | BanWhereInput[]
    id?: IntFilter<"Ban"> | number
    serverId?: IntFilter<"Ban"> | number
    userId?: IntFilter<"Ban"> | number
    bannedByRole?: EnumMemberRoleFilter<"Ban"> | $Enums.MemberRole
    reason?: StringNullableFilter<"Ban"> | string | null
    expiresAt?: DateTimeNullableFilter<"Ban"> | Date | string | null
    createdAt?: DateTimeFilter<"Ban"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Ban"> | Date | string | null
    appealStatus?: EnumBanAppealStatusFilter<"Ban"> | $Enums.BanAppealStatus
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
  }

  export type BanOrderByWithRelationInput = {
    id?: SortOrder
    serverId?: SortOrder
    userId?: SortOrder
    bannedByRole?: SortOrder
    reason?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    appealStatus?: SortOrder
    user?: UserOrderByWithRelationInput
    server?: ServerOrderByWithRelationInput
  }

  export type BanWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BanWhereInput | BanWhereInput[]
    OR?: BanWhereInput[]
    NOT?: BanWhereInput | BanWhereInput[]
    serverId?: IntFilter<"Ban"> | number
    userId?: IntFilter<"Ban"> | number
    bannedByRole?: EnumMemberRoleFilter<"Ban"> | $Enums.MemberRole
    reason?: StringNullableFilter<"Ban"> | string | null
    expiresAt?: DateTimeNullableFilter<"Ban"> | Date | string | null
    createdAt?: DateTimeFilter<"Ban"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Ban"> | Date | string | null
    appealStatus?: EnumBanAppealStatusFilter<"Ban"> | $Enums.BanAppealStatus
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
  }, "id">

  export type BanOrderByWithAggregationInput = {
    id?: SortOrder
    serverId?: SortOrder
    userId?: SortOrder
    bannedByRole?: SortOrder
    reason?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    appealStatus?: SortOrder
    _count?: BanCountOrderByAggregateInput
    _avg?: BanAvgOrderByAggregateInput
    _max?: BanMaxOrderByAggregateInput
    _min?: BanMinOrderByAggregateInput
    _sum?: BanSumOrderByAggregateInput
  }

  export type BanScalarWhereWithAggregatesInput = {
    AND?: BanScalarWhereWithAggregatesInput | BanScalarWhereWithAggregatesInput[]
    OR?: BanScalarWhereWithAggregatesInput[]
    NOT?: BanScalarWhereWithAggregatesInput | BanScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Ban"> | number
    serverId?: IntWithAggregatesFilter<"Ban"> | number
    userId?: IntWithAggregatesFilter<"Ban"> | number
    bannedByRole?: EnumMemberRoleWithAggregatesFilter<"Ban"> | $Enums.MemberRole
    reason?: StringNullableWithAggregatesFilter<"Ban"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Ban"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Ban"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"Ban"> | Date | string | null
    appealStatus?: EnumBanAppealStatusWithAggregatesFilter<"Ban"> | $Enums.BanAppealStatus
  }

  export type ServerMemberWhereInput = {
    AND?: ServerMemberWhereInput | ServerMemberWhereInput[]
    OR?: ServerMemberWhereInput[]
    NOT?: ServerMemberWhereInput | ServerMemberWhereInput[]
    id?: IntFilter<"ServerMember"> | number
    userId?: IntFilter<"ServerMember"> | number
    serverId?: IntFilter<"ServerMember"> | number
    role?: EnumMemberRoleFilter<"ServerMember"> | $Enums.MemberRole
    joinedAt?: DateTimeFilter<"ServerMember"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
  }

  export type ServerMemberOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    serverId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    server?: ServerOrderByWithRelationInput
  }

  export type ServerMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_serverId?: ServerMemberUserIdServerIdCompoundUniqueInput
    AND?: ServerMemberWhereInput | ServerMemberWhereInput[]
    OR?: ServerMemberWhereInput[]
    NOT?: ServerMemberWhereInput | ServerMemberWhereInput[]
    userId?: IntFilter<"ServerMember"> | number
    serverId?: IntFilter<"ServerMember"> | number
    role?: EnumMemberRoleFilter<"ServerMember"> | $Enums.MemberRole
    joinedAt?: DateTimeFilter<"ServerMember"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
  }, "id" | "userId_serverId">

  export type ServerMemberOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    serverId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    _count?: ServerMemberCountOrderByAggregateInput
    _avg?: ServerMemberAvgOrderByAggregateInput
    _max?: ServerMemberMaxOrderByAggregateInput
    _min?: ServerMemberMinOrderByAggregateInput
    _sum?: ServerMemberSumOrderByAggregateInput
  }

  export type ServerMemberScalarWhereWithAggregatesInput = {
    AND?: ServerMemberScalarWhereWithAggregatesInput | ServerMemberScalarWhereWithAggregatesInput[]
    OR?: ServerMemberScalarWhereWithAggregatesInput[]
    NOT?: ServerMemberScalarWhereWithAggregatesInput | ServerMemberScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ServerMember"> | number
    userId?: IntWithAggregatesFilter<"ServerMember"> | number
    serverId?: IntWithAggregatesFilter<"ServerMember"> | number
    role?: EnumMemberRoleWithAggregatesFilter<"ServerMember"> | $Enums.MemberRole
    joinedAt?: DateTimeWithAggregatesFilter<"ServerMember"> | Date | string
  }

  export type ChannelWhereInput = {
    AND?: ChannelWhereInput | ChannelWhereInput[]
    OR?: ChannelWhereInput[]
    NOT?: ChannelWhereInput | ChannelWhereInput[]
    id?: IntFilter<"Channel"> | number
    name?: StringFilter<"Channel"> | string
    serverId?: IntFilter<"Channel"> | number
    type?: EnumChannelTypeFilter<"Channel"> | $Enums.ChannelType
    createdAt?: DateTimeFilter<"Channel"> | Date | string
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
    messages?: MessageListRelationFilter
    attachments?: AttachmentListRelationFilter
  }

  export type ChannelOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    serverId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    server?: ServerOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
    attachments?: AttachmentOrderByRelationAggregateInput
  }

  export type ChannelWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    serverId_name?: ChannelServerIdNameCompoundUniqueInput
    AND?: ChannelWhereInput | ChannelWhereInput[]
    OR?: ChannelWhereInput[]
    NOT?: ChannelWhereInput | ChannelWhereInput[]
    name?: StringFilter<"Channel"> | string
    serverId?: IntFilter<"Channel"> | number
    type?: EnumChannelTypeFilter<"Channel"> | $Enums.ChannelType
    createdAt?: DateTimeFilter<"Channel"> | Date | string
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
    messages?: MessageListRelationFilter
    attachments?: AttachmentListRelationFilter
  }, "id" | "serverId_name">

  export type ChannelOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    serverId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    _count?: ChannelCountOrderByAggregateInput
    _avg?: ChannelAvgOrderByAggregateInput
    _max?: ChannelMaxOrderByAggregateInput
    _min?: ChannelMinOrderByAggregateInput
    _sum?: ChannelSumOrderByAggregateInput
  }

  export type ChannelScalarWhereWithAggregatesInput = {
    AND?: ChannelScalarWhereWithAggregatesInput | ChannelScalarWhereWithAggregatesInput[]
    OR?: ChannelScalarWhereWithAggregatesInput[]
    NOT?: ChannelScalarWhereWithAggregatesInput | ChannelScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Channel"> | number
    name?: StringWithAggregatesFilter<"Channel"> | string
    serverId?: IntWithAggregatesFilter<"Channel"> | number
    type?: EnumChannelTypeWithAggregatesFilter<"Channel"> | $Enums.ChannelType
    createdAt?: DateTimeWithAggregatesFilter<"Channel"> | Date | string
  }

  export type ServerInviteWhereInput = {
    AND?: ServerInviteWhereInput | ServerInviteWhereInput[]
    OR?: ServerInviteWhereInput[]
    NOT?: ServerInviteWhereInput | ServerInviteWhereInput[]
    id?: IntFilter<"ServerInvite"> | number
    code?: StringFilter<"ServerInvite"> | string
    serverId?: IntFilter<"ServerInvite"> | number
    maxUses?: IntNullableFilter<"ServerInvite"> | number | null
    currentUses?: IntFilter<"ServerInvite"> | number
    expiresAt?: DateTimeNullableFilter<"ServerInvite"> | Date | string | null
    createdById?: IntFilter<"ServerInvite"> | number
    createdAt?: DateTimeFilter<"ServerInvite"> | Date | string
    updatedAt?: DateTimeFilter<"ServerInvite"> | Date | string
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ServerInviteOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    serverId?: SortOrder
    maxUses?: SortOrderInput | SortOrder
    currentUses?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    server?: ServerOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type ServerInviteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: ServerInviteWhereInput | ServerInviteWhereInput[]
    OR?: ServerInviteWhereInput[]
    NOT?: ServerInviteWhereInput | ServerInviteWhereInput[]
    serverId?: IntFilter<"ServerInvite"> | number
    maxUses?: IntNullableFilter<"ServerInvite"> | number | null
    currentUses?: IntFilter<"ServerInvite"> | number
    expiresAt?: DateTimeNullableFilter<"ServerInvite"> | Date | string | null
    createdById?: IntFilter<"ServerInvite"> | number
    createdAt?: DateTimeFilter<"ServerInvite"> | Date | string
    updatedAt?: DateTimeFilter<"ServerInvite"> | Date | string
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "code">

  export type ServerInviteOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    serverId?: SortOrder
    maxUses?: SortOrderInput | SortOrder
    currentUses?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServerInviteCountOrderByAggregateInput
    _avg?: ServerInviteAvgOrderByAggregateInput
    _max?: ServerInviteMaxOrderByAggregateInput
    _min?: ServerInviteMinOrderByAggregateInput
    _sum?: ServerInviteSumOrderByAggregateInput
  }

  export type ServerInviteScalarWhereWithAggregatesInput = {
    AND?: ServerInviteScalarWhereWithAggregatesInput | ServerInviteScalarWhereWithAggregatesInput[]
    OR?: ServerInviteScalarWhereWithAggregatesInput[]
    NOT?: ServerInviteScalarWhereWithAggregatesInput | ServerInviteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ServerInvite"> | number
    code?: StringWithAggregatesFilter<"ServerInvite"> | string
    serverId?: IntWithAggregatesFilter<"ServerInvite"> | number
    maxUses?: IntNullableWithAggregatesFilter<"ServerInvite"> | number | null
    currentUses?: IntWithAggregatesFilter<"ServerInvite"> | number
    expiresAt?: DateTimeNullableWithAggregatesFilter<"ServerInvite"> | Date | string | null
    createdById?: IntWithAggregatesFilter<"ServerInvite"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ServerInvite"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServerInvite"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: IntFilter<"Message"> | number
    channelId?: IntFilter<"Message"> | number
    authorId?: IntFilter<"Message"> | number
    replyToMessageId?: IntNullableFilter<"Message"> | number | null
    content?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    editedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    replyToDeleted?: BoolFilter<"Message"> | boolean
    clientMsgId?: StringNullableFilter<"Message"> | string | null
    channel?: XOR<ChannelScalarRelationFilter, ChannelWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    replyTo?: XOR<MessageNullableScalarRelationFilter, MessageWhereInput> | null
    replies?: MessageListRelationFilter
    attachments?: AttachmentListRelationFilter
    reactions?: ReactionListRelationFilter
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    channelId?: SortOrder
    authorId?: SortOrder
    replyToMessageId?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrderInput | SortOrder
    replyToDeleted?: SortOrder
    clientMsgId?: SortOrderInput | SortOrder
    channel?: ChannelOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
    replyTo?: MessageOrderByWithRelationInput
    replies?: MessageOrderByRelationAggregateInput
    attachments?: AttachmentOrderByRelationAggregateInput
    reactions?: ReactionOrderByRelationAggregateInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    clientMsgId?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    channelId?: IntFilter<"Message"> | number
    authorId?: IntFilter<"Message"> | number
    replyToMessageId?: IntNullableFilter<"Message"> | number | null
    content?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    editedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    replyToDeleted?: BoolFilter<"Message"> | boolean
    channel?: XOR<ChannelScalarRelationFilter, ChannelWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    replyTo?: XOR<MessageNullableScalarRelationFilter, MessageWhereInput> | null
    replies?: MessageListRelationFilter
    attachments?: AttachmentListRelationFilter
    reactions?: ReactionListRelationFilter
  }, "id" | "clientMsgId">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    channelId?: SortOrder
    authorId?: SortOrder
    replyToMessageId?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrderInput | SortOrder
    replyToDeleted?: SortOrder
    clientMsgId?: SortOrderInput | SortOrder
    _count?: MessageCountOrderByAggregateInput
    _avg?: MessageAvgOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
    _sum?: MessageSumOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Message"> | number
    channelId?: IntWithAggregatesFilter<"Message"> | number
    authorId?: IntWithAggregatesFilter<"Message"> | number
    replyToMessageId?: IntNullableWithAggregatesFilter<"Message"> | number | null
    content?: StringNullableWithAggregatesFilter<"Message"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    editedAt?: DateTimeNullableWithAggregatesFilter<"Message"> | Date | string | null
    replyToDeleted?: BoolWithAggregatesFilter<"Message"> | boolean
    clientMsgId?: StringNullableWithAggregatesFilter<"Message"> | string | null
  }

  export type AttachmentWhereInput = {
    AND?: AttachmentWhereInput | AttachmentWhereInput[]
    OR?: AttachmentWhereInput[]
    NOT?: AttachmentWhereInput | AttachmentWhereInput[]
    id?: IntFilter<"Attachment"> | number
    messageId?: IntFilter<"Attachment"> | number
    channelId?: IntFilter<"Attachment"> | number
    originalName?: StringFilter<"Attachment"> | string
    type?: EnumAttachmentTypeFilter<"Attachment"> | $Enums.AttachmentType
    publicId?: StringFilter<"Attachment"> | string
    url?: StringFilter<"Attachment"> | string
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
    channel?: XOR<ChannelScalarRelationFilter, ChannelWhereInput>
  }

  export type AttachmentOrderByWithRelationInput = {
    id?: SortOrder
    messageId?: SortOrder
    channelId?: SortOrder
    originalName?: SortOrder
    type?: SortOrder
    publicId?: SortOrder
    url?: SortOrder
    message?: MessageOrderByWithRelationInput
    channel?: ChannelOrderByWithRelationInput
  }

  export type AttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AttachmentWhereInput | AttachmentWhereInput[]
    OR?: AttachmentWhereInput[]
    NOT?: AttachmentWhereInput | AttachmentWhereInput[]
    messageId?: IntFilter<"Attachment"> | number
    channelId?: IntFilter<"Attachment"> | number
    originalName?: StringFilter<"Attachment"> | string
    type?: EnumAttachmentTypeFilter<"Attachment"> | $Enums.AttachmentType
    publicId?: StringFilter<"Attachment"> | string
    url?: StringFilter<"Attachment"> | string
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
    channel?: XOR<ChannelScalarRelationFilter, ChannelWhereInput>
  }, "id">

  export type AttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    messageId?: SortOrder
    channelId?: SortOrder
    originalName?: SortOrder
    type?: SortOrder
    publicId?: SortOrder
    url?: SortOrder
    _count?: AttachmentCountOrderByAggregateInput
    _avg?: AttachmentAvgOrderByAggregateInput
    _max?: AttachmentMaxOrderByAggregateInput
    _min?: AttachmentMinOrderByAggregateInput
    _sum?: AttachmentSumOrderByAggregateInput
  }

  export type AttachmentScalarWhereWithAggregatesInput = {
    AND?: AttachmentScalarWhereWithAggregatesInput | AttachmentScalarWhereWithAggregatesInput[]
    OR?: AttachmentScalarWhereWithAggregatesInput[]
    NOT?: AttachmentScalarWhereWithAggregatesInput | AttachmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Attachment"> | number
    messageId?: IntWithAggregatesFilter<"Attachment"> | number
    channelId?: IntWithAggregatesFilter<"Attachment"> | number
    originalName?: StringWithAggregatesFilter<"Attachment"> | string
    type?: EnumAttachmentTypeWithAggregatesFilter<"Attachment"> | $Enums.AttachmentType
    publicId?: StringWithAggregatesFilter<"Attachment"> | string
    url?: StringWithAggregatesFilter<"Attachment"> | string
  }

  export type ReactionWhereInput = {
    AND?: ReactionWhereInput | ReactionWhereInput[]
    OR?: ReactionWhereInput[]
    NOT?: ReactionWhereInput | ReactionWhereInput[]
    id?: IntFilter<"Reaction"> | number
    messageId?: IntFilter<"Reaction"> | number
    userId?: IntFilter<"Reaction"> | number
    emoji?: StringFilter<"Reaction"> | string
    createdAt?: DateTimeFilter<"Reaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    Message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }

  export type ReactionOrderByWithRelationInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    Message?: MessageOrderByWithRelationInput
  }

  export type ReactionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    messageId_userId_emoji?: ReactionMessageIdUserIdEmojiCompoundUniqueInput
    AND?: ReactionWhereInput | ReactionWhereInput[]
    OR?: ReactionWhereInput[]
    NOT?: ReactionWhereInput | ReactionWhereInput[]
    messageId?: IntFilter<"Reaction"> | number
    userId?: IntFilter<"Reaction"> | number
    emoji?: StringFilter<"Reaction"> | string
    createdAt?: DateTimeFilter<"Reaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    Message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }, "id" | "messageId_userId_emoji">

  export type ReactionOrderByWithAggregationInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
    _count?: ReactionCountOrderByAggregateInput
    _avg?: ReactionAvgOrderByAggregateInput
    _max?: ReactionMaxOrderByAggregateInput
    _min?: ReactionMinOrderByAggregateInput
    _sum?: ReactionSumOrderByAggregateInput
  }

  export type ReactionScalarWhereWithAggregatesInput = {
    AND?: ReactionScalarWhereWithAggregatesInput | ReactionScalarWhereWithAggregatesInput[]
    OR?: ReactionScalarWhereWithAggregatesInput[]
    NOT?: ReactionScalarWhereWithAggregatesInput | ReactionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Reaction"> | number
    messageId?: IntWithAggregatesFilter<"Reaction"> | number
    userId?: IntWithAggregatesFilter<"Reaction"> | number
    emoji?: StringWithAggregatesFilter<"Reaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Reaction"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tokens?: UserTokenCreateNestedManyWithoutUserInput
    memberships?: ServerMemberCreateNestedManyWithoutUserInput
    ownedServers?: ServerCreateNestedManyWithoutOwnerInput
    createdInvites?: ServerInviteCreateNestedManyWithoutCreatedByInput
    bans?: BanCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutAuthorInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tokens?: UserTokenUncheckedCreateNestedManyWithoutUserInput
    memberships?: ServerMemberUncheckedCreateNestedManyWithoutUserInput
    ownedServers?: ServerUncheckedCreateNestedManyWithoutOwnerInput
    createdInvites?: ServerInviteUncheckedCreateNestedManyWithoutCreatedByInput
    bans?: BanUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutAuthorInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: UserTokenUpdateManyWithoutUserNestedInput
    memberships?: ServerMemberUpdateManyWithoutUserNestedInput
    ownedServers?: ServerUpdateManyWithoutOwnerNestedInput
    createdInvites?: ServerInviteUpdateManyWithoutCreatedByNestedInput
    bans?: BanUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutAuthorNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: UserTokenUncheckedUpdateManyWithoutUserNestedInput
    memberships?: ServerMemberUncheckedUpdateManyWithoutUserNestedInput
    ownedServers?: ServerUncheckedUpdateManyWithoutOwnerNestedInput
    createdInvites?: ServerInviteUncheckedUpdateManyWithoutCreatedByNestedInput
    bans?: BanUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutAuthorNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTokenCreateInput = {
    token: string
    type: $Enums.VerifyTokenType
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTokensInput
  }

  export type UserTokenUncheckedCreateInput = {
    id?: number
    userId: number
    token: string
    type: $Enums.VerifyTokenType
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type UserTokenUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumVerifyTokenTypeFieldUpdateOperationsInput | $Enums.VerifyTokenType
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTokensNestedInput
  }

  export type UserTokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumVerifyTokenTypeFieldUpdateOperationsInput | $Enums.VerifyTokenType
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTokenCreateManyInput = {
    id?: number
    userId: number
    token: string
    type: $Enums.VerifyTokenType
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type UserTokenUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumVerifyTokenTypeFieldUpdateOperationsInput | $Enums.VerifyTokenType
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumVerifyTokenTypeFieldUpdateOperationsInput | $Enums.VerifyTokenType
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerCreateInput = {
    name: string
    avatarUrl?: string | null
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedServersInput
    members?: ServerMemberCreateNestedManyWithoutServerInput
    channels?: ChannelCreateNestedManyWithoutServerInput
    invites?: ServerInviteCreateNestedManyWithoutServerInput
    bans?: BanCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateInput = {
    id?: number
    name: string
    avatarUrl?: string | null
    ownerId: number
    createdAt?: Date | string
    members?: ServerMemberUncheckedCreateNestedManyWithoutServerInput
    channels?: ChannelUncheckedCreateNestedManyWithoutServerInput
    invites?: ServerInviteUncheckedCreateNestedManyWithoutServerInput
    bans?: BanUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedServersNestedInput
    members?: ServerMemberUpdateManyWithoutServerNestedInput
    channels?: ChannelUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUpdateManyWithoutServerNestedInput
    bans?: BanUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ServerMemberUncheckedUpdateManyWithoutServerNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUncheckedUpdateManyWithoutServerNestedInput
    bans?: BanUncheckedUpdateManyWithoutServerNestedInput
  }

  export type ServerCreateManyInput = {
    id?: number
    name: string
    avatarUrl?: string | null
    ownerId: number
    createdAt?: Date | string
  }

  export type ServerUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BanCreateInput = {
    bannedByRole: $Enums.MemberRole
    reason?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    appealStatus: $Enums.BanAppealStatus
    user: UserCreateNestedOneWithoutBansInput
    server: ServerCreateNestedOneWithoutBansInput
  }

  export type BanUncheckedCreateInput = {
    id?: number
    serverId: number
    userId: number
    bannedByRole: $Enums.MemberRole
    reason?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    appealStatus: $Enums.BanAppealStatus
  }

  export type BanUpdateInput = {
    bannedByRole?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appealStatus?: EnumBanAppealStatusFieldUpdateOperationsInput | $Enums.BanAppealStatus
    user?: UserUpdateOneRequiredWithoutBansNestedInput
    server?: ServerUpdateOneRequiredWithoutBansNestedInput
  }

  export type BanUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    serverId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    bannedByRole?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appealStatus?: EnumBanAppealStatusFieldUpdateOperationsInput | $Enums.BanAppealStatus
  }

  export type BanCreateManyInput = {
    id?: number
    serverId: number
    userId: number
    bannedByRole: $Enums.MemberRole
    reason?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    appealStatus: $Enums.BanAppealStatus
  }

  export type BanUpdateManyMutationInput = {
    bannedByRole?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appealStatus?: EnumBanAppealStatusFieldUpdateOperationsInput | $Enums.BanAppealStatus
  }

  export type BanUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    serverId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    bannedByRole?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appealStatus?: EnumBanAppealStatusFieldUpdateOperationsInput | $Enums.BanAppealStatus
  }

  export type ServerMemberCreateInput = {
    role?: $Enums.MemberRole
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
    server: ServerCreateNestedOneWithoutMembersInput
  }

  export type ServerMemberUncheckedCreateInput = {
    id?: number
    userId: number
    serverId: number
    role?: $Enums.MemberRole
    joinedAt?: Date | string
  }

  export type ServerMemberUpdateInput = {
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    server?: ServerUpdateOneRequiredWithoutMembersNestedInput
  }

  export type ServerMemberUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    serverId?: IntFieldUpdateOperationsInput | number
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerMemberCreateManyInput = {
    id?: number
    userId: number
    serverId: number
    role?: $Enums.MemberRole
    joinedAt?: Date | string
  }

  export type ServerMemberUpdateManyMutationInput = {
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerMemberUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    serverId?: IntFieldUpdateOperationsInput | number
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelCreateInput = {
    name: string
    type: $Enums.ChannelType
    createdAt?: Date | string
    server: ServerCreateNestedOneWithoutChannelsInput
    messages?: MessageCreateNestedManyWithoutChannelInput
    attachments?: AttachmentCreateNestedManyWithoutChannelInput
  }

  export type ChannelUncheckedCreateInput = {
    id?: number
    name: string
    serverId: number
    type: $Enums.ChannelType
    createdAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutChannelInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutChannelInput
  }

  export type ChannelUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    server?: ServerUpdateOneRequiredWithoutChannelsNestedInput
    messages?: MessageUpdateManyWithoutChannelNestedInput
    attachments?: AttachmentUpdateManyWithoutChannelNestedInput
  }

  export type ChannelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    serverId?: IntFieldUpdateOperationsInput | number
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutChannelNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutChannelNestedInput
  }

  export type ChannelCreateManyInput = {
    id?: number
    name: string
    serverId: number
    type: $Enums.ChannelType
    createdAt?: Date | string
  }

  export type ChannelUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    serverId?: IntFieldUpdateOperationsInput | number
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerInviteCreateInput = {
    code: string
    maxUses?: number | null
    currentUses?: number
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    server: ServerCreateNestedOneWithoutInvitesInput
    createdBy: UserCreateNestedOneWithoutCreatedInvitesInput
  }

  export type ServerInviteUncheckedCreateInput = {
    id?: number
    code: string
    serverId: number
    maxUses?: number | null
    currentUses?: number
    expiresAt?: Date | string | null
    createdById: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServerInviteUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    server?: ServerUpdateOneRequiredWithoutInvitesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedInvitesNestedInput
  }

  export type ServerInviteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    serverId?: IntFieldUpdateOperationsInput | number
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerInviteCreateManyInput = {
    id?: number
    code: string
    serverId: number
    maxUses?: number | null
    currentUses?: number
    expiresAt?: Date | string | null
    createdById: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServerInviteUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerInviteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    serverId?: IntFieldUpdateOperationsInput | number
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
    channel: ChannelCreateNestedOneWithoutMessagesInput
    author: UserCreateNestedOneWithoutMessagesInput
    replyTo?: MessageCreateNestedOneWithoutRepliesInput
    replies?: MessageCreateNestedManyWithoutReplyToInput
    attachments?: AttachmentCreateNestedManyWithoutMessageInput
    reactions?: ReactionCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateInput = {
    id?: number
    channelId: number
    authorId: number
    replyToMessageId?: number | null
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMessageInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageUpdateInput = {
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
    channel?: ChannelUpdateOneRequiredWithoutMessagesNestedInput
    author?: UserUpdateOneRequiredWithoutMessagesNestedInput
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput
    replies?: MessageUpdateManyWithoutReplyToNestedInput
    attachments?: AttachmentUpdateManyWithoutMessageNestedInput
    reactions?: ReactionUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    replyToMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutMessageNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageCreateManyInput = {
    id?: number
    channelId: number
    authorId: number
    replyToMessageId?: number | null
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
  }

  export type MessageUpdateManyMutationInput = {
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    replyToMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AttachmentCreateInput = {
    originalName: string
    type: $Enums.AttachmentType
    publicId: string
    url: string
    message: MessageCreateNestedOneWithoutAttachmentsInput
    channel: ChannelCreateNestedOneWithoutAttachmentsInput
  }

  export type AttachmentUncheckedCreateInput = {
    id?: number
    messageId: number
    channelId: number
    originalName: string
    type: $Enums.AttachmentType
    publicId: string
    url: string
  }

  export type AttachmentUpdateInput = {
    originalName?: StringFieldUpdateOperationsInput | string
    type?: EnumAttachmentTypeFieldUpdateOperationsInput | $Enums.AttachmentType
    publicId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    message?: MessageUpdateOneRequiredWithoutAttachmentsNestedInput
    channel?: ChannelUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    messageId?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    originalName?: StringFieldUpdateOperationsInput | string
    type?: EnumAttachmentTypeFieldUpdateOperationsInput | $Enums.AttachmentType
    publicId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type AttachmentCreateManyInput = {
    id?: number
    messageId: number
    channelId: number
    originalName: string
    type: $Enums.AttachmentType
    publicId: string
    url: string
  }

  export type AttachmentUpdateManyMutationInput = {
    originalName?: StringFieldUpdateOperationsInput | string
    type?: EnumAttachmentTypeFieldUpdateOperationsInput | $Enums.AttachmentType
    publicId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type AttachmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    messageId?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    originalName?: StringFieldUpdateOperationsInput | string
    type?: EnumAttachmentTypeFieldUpdateOperationsInput | $Enums.AttachmentType
    publicId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type ReactionCreateInput = {
    emoji: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutReactionsInput
    Message: MessageCreateNestedOneWithoutReactionsInput
  }

  export type ReactionUncheckedCreateInput = {
    id?: number
    messageId: number
    userId: number
    emoji: string
    createdAt?: Date | string
  }

  export type ReactionUpdateInput = {
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReactionsNestedInput
    Message?: MessageUpdateOneRequiredWithoutReactionsNestedInput
  }

  export type ReactionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    messageId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReactionCreateManyInput = {
    id?: number
    messageId: number
    userId: number
    emoji: string
    createdAt?: Date | string
  }

  export type ReactionUpdateManyMutationInput = {
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReactionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    messageId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserTokenListRelationFilter = {
    every?: UserTokenWhereInput
    some?: UserTokenWhereInput
    none?: UserTokenWhereInput
  }

  export type ServerMemberListRelationFilter = {
    every?: ServerMemberWhereInput
    some?: ServerMemberWhereInput
    none?: ServerMemberWhereInput
  }

  export type ServerListRelationFilter = {
    every?: ServerWhereInput
    some?: ServerWhereInput
    none?: ServerWhereInput
  }

  export type ServerInviteListRelationFilter = {
    every?: ServerInviteWhereInput
    some?: ServerInviteWhereInput
    none?: ServerInviteWhereInput
  }

  export type BanListRelationFilter = {
    every?: BanWhereInput
    some?: BanWhereInput
    none?: BanWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type ReactionListRelationFilter = {
    every?: ReactionWhereInput
    some?: ReactionWhereInput
    none?: ReactionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServerMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServerInviteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumVerifyTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VerifyTokenType | EnumVerifyTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VerifyTokenType[] | ListEnumVerifyTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerifyTokenType[] | ListEnumVerifyTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVerifyTokenTypeFilter<$PrismaModel> | $Enums.VerifyTokenType
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type UserTokenAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type UserTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type UserTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type UserTokenSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumVerifyTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerifyTokenType | EnumVerifyTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VerifyTokenType[] | ListEnumVerifyTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerifyTokenType[] | ListEnumVerifyTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVerifyTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.VerifyTokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerifyTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumVerifyTokenTypeFilter<$PrismaModel>
  }

  export type ChannelListRelationFilter = {
    every?: ChannelWhereInput
    some?: ChannelWhereInput
    none?: ChannelWhereInput
  }

  export type ChannelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
  }

  export type ServerAvgOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
  }

  export type ServerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
  }

  export type ServerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
  }

  export type ServerSumOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
  }

  export type EnumMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberRole | EnumMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberRoleFilter<$PrismaModel> | $Enums.MemberRole
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumBanAppealStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BanAppealStatus | EnumBanAppealStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BanAppealStatus[] | ListEnumBanAppealStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BanAppealStatus[] | ListEnumBanAppealStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBanAppealStatusFilter<$PrismaModel> | $Enums.BanAppealStatus
  }

  export type ServerScalarRelationFilter = {
    is?: ServerWhereInput
    isNot?: ServerWhereInput
  }

  export type BanCountOrderByAggregateInput = {
    id?: SortOrder
    serverId?: SortOrder
    userId?: SortOrder
    bannedByRole?: SortOrder
    reason?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
    appealStatus?: SortOrder
  }

  export type BanAvgOrderByAggregateInput = {
    id?: SortOrder
    serverId?: SortOrder
    userId?: SortOrder
  }

  export type BanMaxOrderByAggregateInput = {
    id?: SortOrder
    serverId?: SortOrder
    userId?: SortOrder
    bannedByRole?: SortOrder
    reason?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
    appealStatus?: SortOrder
  }

  export type BanMinOrderByAggregateInput = {
    id?: SortOrder
    serverId?: SortOrder
    userId?: SortOrder
    bannedByRole?: SortOrder
    reason?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
    appealStatus?: SortOrder
  }

  export type BanSumOrderByAggregateInput = {
    id?: SortOrder
    serverId?: SortOrder
    userId?: SortOrder
  }

  export type EnumMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberRole | EnumMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.MemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumMemberRoleFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumBanAppealStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BanAppealStatus | EnumBanAppealStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BanAppealStatus[] | ListEnumBanAppealStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BanAppealStatus[] | ListEnumBanAppealStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBanAppealStatusWithAggregatesFilter<$PrismaModel> | $Enums.BanAppealStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBanAppealStatusFilter<$PrismaModel>
    _max?: NestedEnumBanAppealStatusFilter<$PrismaModel>
  }

  export type ServerMemberUserIdServerIdCompoundUniqueInput = {
    userId: number
    serverId: number
  }

  export type ServerMemberCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serverId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type ServerMemberAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serverId?: SortOrder
  }

  export type ServerMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serverId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type ServerMemberMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serverId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type ServerMemberSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serverId?: SortOrder
  }

  export type EnumChannelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChannelType | EnumChannelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChannelTypeFilter<$PrismaModel> | $Enums.ChannelType
  }

  export type AttachmentListRelationFilter = {
    every?: AttachmentWhereInput
    some?: AttachmentWhereInput
    none?: AttachmentWhereInput
  }

  export type AttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChannelServerIdNameCompoundUniqueInput = {
    serverId: number
    name: string
  }

  export type ChannelCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    serverId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type ChannelAvgOrderByAggregateInput = {
    id?: SortOrder
    serverId?: SortOrder
  }

  export type ChannelMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    serverId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type ChannelMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    serverId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type ChannelSumOrderByAggregateInput = {
    id?: SortOrder
    serverId?: SortOrder
  }

  export type EnumChannelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChannelType | EnumChannelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChannelTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChannelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChannelTypeFilter<$PrismaModel>
    _max?: NestedEnumChannelTypeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ServerInviteCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    serverId?: SortOrder
    maxUses?: SortOrder
    currentUses?: SortOrder
    expiresAt?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServerInviteAvgOrderByAggregateInput = {
    id?: SortOrder
    serverId?: SortOrder
    maxUses?: SortOrder
    currentUses?: SortOrder
    createdById?: SortOrder
  }

  export type ServerInviteMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    serverId?: SortOrder
    maxUses?: SortOrder
    currentUses?: SortOrder
    expiresAt?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServerInviteMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    serverId?: SortOrder
    maxUses?: SortOrder
    currentUses?: SortOrder
    expiresAt?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServerInviteSumOrderByAggregateInput = {
    id?: SortOrder
    serverId?: SortOrder
    maxUses?: SortOrder
    currentUses?: SortOrder
    createdById?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ChannelScalarRelationFilter = {
    is?: ChannelWhereInput
    isNot?: ChannelWhereInput
  }

  export type MessageNullableScalarRelationFilter = {
    is?: MessageWhereInput | null
    isNot?: MessageWhereInput | null
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    channelId?: SortOrder
    authorId?: SortOrder
    replyToMessageId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrder
    replyToDeleted?: SortOrder
    clientMsgId?: SortOrder
  }

  export type MessageAvgOrderByAggregateInput = {
    id?: SortOrder
    channelId?: SortOrder
    authorId?: SortOrder
    replyToMessageId?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    channelId?: SortOrder
    authorId?: SortOrder
    replyToMessageId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrder
    replyToDeleted?: SortOrder
    clientMsgId?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    channelId?: SortOrder
    authorId?: SortOrder
    replyToMessageId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrder
    replyToDeleted?: SortOrder
    clientMsgId?: SortOrder
  }

  export type MessageSumOrderByAggregateInput = {
    id?: SortOrder
    channelId?: SortOrder
    authorId?: SortOrder
    replyToMessageId?: SortOrder
  }

  export type EnumAttachmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AttachmentType | EnumAttachmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AttachmentType[] | ListEnumAttachmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttachmentType[] | ListEnumAttachmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAttachmentTypeFilter<$PrismaModel> | $Enums.AttachmentType
  }

  export type MessageScalarRelationFilter = {
    is?: MessageWhereInput
    isNot?: MessageWhereInput
  }

  export type AttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    channelId?: SortOrder
    originalName?: SortOrder
    type?: SortOrder
    publicId?: SortOrder
    url?: SortOrder
  }

  export type AttachmentAvgOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    channelId?: SortOrder
  }

  export type AttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    channelId?: SortOrder
    originalName?: SortOrder
    type?: SortOrder
    publicId?: SortOrder
    url?: SortOrder
  }

  export type AttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    channelId?: SortOrder
    originalName?: SortOrder
    type?: SortOrder
    publicId?: SortOrder
    url?: SortOrder
  }

  export type AttachmentSumOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    channelId?: SortOrder
  }

  export type EnumAttachmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttachmentType | EnumAttachmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AttachmentType[] | ListEnumAttachmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttachmentType[] | ListEnumAttachmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAttachmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AttachmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAttachmentTypeFilter<$PrismaModel>
    _max?: NestedEnumAttachmentTypeFilter<$PrismaModel>
  }

  export type ReactionMessageIdUserIdEmojiCompoundUniqueInput = {
    messageId: number
    userId: number
    emoji: string
  }

  export type ReactionCountOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
  }

  export type ReactionAvgOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
  }

  export type ReactionMaxOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
  }

  export type ReactionMinOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
  }

  export type ReactionSumOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
  }

  export type UserTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<UserTokenCreateWithoutUserInput, UserTokenUncheckedCreateWithoutUserInput> | UserTokenCreateWithoutUserInput[] | UserTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserTokenCreateOrConnectWithoutUserInput | UserTokenCreateOrConnectWithoutUserInput[]
    createMany?: UserTokenCreateManyUserInputEnvelope
    connect?: UserTokenWhereUniqueInput | UserTokenWhereUniqueInput[]
  }

  export type ServerMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<ServerMemberCreateWithoutUserInput, ServerMemberUncheckedCreateWithoutUserInput> | ServerMemberCreateWithoutUserInput[] | ServerMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutUserInput | ServerMemberCreateOrConnectWithoutUserInput[]
    createMany?: ServerMemberCreateManyUserInputEnvelope
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
  }

  export type ServerCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ServerCreateWithoutOwnerInput, ServerUncheckedCreateWithoutOwnerInput> | ServerCreateWithoutOwnerInput[] | ServerUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ServerCreateOrConnectWithoutOwnerInput | ServerCreateOrConnectWithoutOwnerInput[]
    createMany?: ServerCreateManyOwnerInputEnvelope
    connect?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
  }

  export type ServerInviteCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ServerInviteCreateWithoutCreatedByInput, ServerInviteUncheckedCreateWithoutCreatedByInput> | ServerInviteCreateWithoutCreatedByInput[] | ServerInviteUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutCreatedByInput | ServerInviteCreateOrConnectWithoutCreatedByInput[]
    createMany?: ServerInviteCreateManyCreatedByInputEnvelope
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
  }

  export type BanCreateNestedManyWithoutUserInput = {
    create?: XOR<BanCreateWithoutUserInput, BanUncheckedCreateWithoutUserInput> | BanCreateWithoutUserInput[] | BanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BanCreateOrConnectWithoutUserInput | BanCreateOrConnectWithoutUserInput[]
    createMany?: BanCreateManyUserInputEnvelope
    connect?: BanWhereUniqueInput | BanWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutAuthorInput = {
    create?: XOR<MessageCreateWithoutAuthorInput, MessageUncheckedCreateWithoutAuthorInput> | MessageCreateWithoutAuthorInput[] | MessageUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutAuthorInput | MessageCreateOrConnectWithoutAuthorInput[]
    createMany?: MessageCreateManyAuthorInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ReactionCreateNestedManyWithoutUserInput = {
    create?: XOR<ReactionCreateWithoutUserInput, ReactionUncheckedCreateWithoutUserInput> | ReactionCreateWithoutUserInput[] | ReactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutUserInput | ReactionCreateOrConnectWithoutUserInput[]
    createMany?: ReactionCreateManyUserInputEnvelope
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
  }

  export type UserTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserTokenCreateWithoutUserInput, UserTokenUncheckedCreateWithoutUserInput> | UserTokenCreateWithoutUserInput[] | UserTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserTokenCreateOrConnectWithoutUserInput | UserTokenCreateOrConnectWithoutUserInput[]
    createMany?: UserTokenCreateManyUserInputEnvelope
    connect?: UserTokenWhereUniqueInput | UserTokenWhereUniqueInput[]
  }

  export type ServerMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ServerMemberCreateWithoutUserInput, ServerMemberUncheckedCreateWithoutUserInput> | ServerMemberCreateWithoutUserInput[] | ServerMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutUserInput | ServerMemberCreateOrConnectWithoutUserInput[]
    createMany?: ServerMemberCreateManyUserInputEnvelope
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
  }

  export type ServerUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ServerCreateWithoutOwnerInput, ServerUncheckedCreateWithoutOwnerInput> | ServerCreateWithoutOwnerInput[] | ServerUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ServerCreateOrConnectWithoutOwnerInput | ServerCreateOrConnectWithoutOwnerInput[]
    createMany?: ServerCreateManyOwnerInputEnvelope
    connect?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
  }

  export type ServerInviteUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ServerInviteCreateWithoutCreatedByInput, ServerInviteUncheckedCreateWithoutCreatedByInput> | ServerInviteCreateWithoutCreatedByInput[] | ServerInviteUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutCreatedByInput | ServerInviteCreateOrConnectWithoutCreatedByInput[]
    createMany?: ServerInviteCreateManyCreatedByInputEnvelope
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
  }

  export type BanUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BanCreateWithoutUserInput, BanUncheckedCreateWithoutUserInput> | BanCreateWithoutUserInput[] | BanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BanCreateOrConnectWithoutUserInput | BanCreateOrConnectWithoutUserInput[]
    createMany?: BanCreateManyUserInputEnvelope
    connect?: BanWhereUniqueInput | BanWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<MessageCreateWithoutAuthorInput, MessageUncheckedCreateWithoutAuthorInput> | MessageCreateWithoutAuthorInput[] | MessageUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutAuthorInput | MessageCreateOrConnectWithoutAuthorInput[]
    createMany?: MessageCreateManyAuthorInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ReactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReactionCreateWithoutUserInput, ReactionUncheckedCreateWithoutUserInput> | ReactionCreateWithoutUserInput[] | ReactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutUserInput | ReactionCreateOrConnectWithoutUserInput[]
    createMany?: ReactionCreateManyUserInputEnvelope
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserTokenCreateWithoutUserInput, UserTokenUncheckedCreateWithoutUserInput> | UserTokenCreateWithoutUserInput[] | UserTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserTokenCreateOrConnectWithoutUserInput | UserTokenCreateOrConnectWithoutUserInput[]
    upsert?: UserTokenUpsertWithWhereUniqueWithoutUserInput | UserTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserTokenCreateManyUserInputEnvelope
    set?: UserTokenWhereUniqueInput | UserTokenWhereUniqueInput[]
    disconnect?: UserTokenWhereUniqueInput | UserTokenWhereUniqueInput[]
    delete?: UserTokenWhereUniqueInput | UserTokenWhereUniqueInput[]
    connect?: UserTokenWhereUniqueInput | UserTokenWhereUniqueInput[]
    update?: UserTokenUpdateWithWhereUniqueWithoutUserInput | UserTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserTokenUpdateManyWithWhereWithoutUserInput | UserTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserTokenScalarWhereInput | UserTokenScalarWhereInput[]
  }

  export type ServerMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<ServerMemberCreateWithoutUserInput, ServerMemberUncheckedCreateWithoutUserInput> | ServerMemberCreateWithoutUserInput[] | ServerMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutUserInput | ServerMemberCreateOrConnectWithoutUserInput[]
    upsert?: ServerMemberUpsertWithWhereUniqueWithoutUserInput | ServerMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ServerMemberCreateManyUserInputEnvelope
    set?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    disconnect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    delete?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    update?: ServerMemberUpdateWithWhereUniqueWithoutUserInput | ServerMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ServerMemberUpdateManyWithWhereWithoutUserInput | ServerMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ServerMemberScalarWhereInput | ServerMemberScalarWhereInput[]
  }

  export type ServerUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ServerCreateWithoutOwnerInput, ServerUncheckedCreateWithoutOwnerInput> | ServerCreateWithoutOwnerInput[] | ServerUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ServerCreateOrConnectWithoutOwnerInput | ServerCreateOrConnectWithoutOwnerInput[]
    upsert?: ServerUpsertWithWhereUniqueWithoutOwnerInput | ServerUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ServerCreateManyOwnerInputEnvelope
    set?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    disconnect?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    delete?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    connect?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    update?: ServerUpdateWithWhereUniqueWithoutOwnerInput | ServerUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ServerUpdateManyWithWhereWithoutOwnerInput | ServerUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ServerScalarWhereInput | ServerScalarWhereInput[]
  }

  export type ServerInviteUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ServerInviteCreateWithoutCreatedByInput, ServerInviteUncheckedCreateWithoutCreatedByInput> | ServerInviteCreateWithoutCreatedByInput[] | ServerInviteUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutCreatedByInput | ServerInviteCreateOrConnectWithoutCreatedByInput[]
    upsert?: ServerInviteUpsertWithWhereUniqueWithoutCreatedByInput | ServerInviteUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ServerInviteCreateManyCreatedByInputEnvelope
    set?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    disconnect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    delete?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    update?: ServerInviteUpdateWithWhereUniqueWithoutCreatedByInput | ServerInviteUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ServerInviteUpdateManyWithWhereWithoutCreatedByInput | ServerInviteUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ServerInviteScalarWhereInput | ServerInviteScalarWhereInput[]
  }

  export type BanUpdateManyWithoutUserNestedInput = {
    create?: XOR<BanCreateWithoutUserInput, BanUncheckedCreateWithoutUserInput> | BanCreateWithoutUserInput[] | BanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BanCreateOrConnectWithoutUserInput | BanCreateOrConnectWithoutUserInput[]
    upsert?: BanUpsertWithWhereUniqueWithoutUserInput | BanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BanCreateManyUserInputEnvelope
    set?: BanWhereUniqueInput | BanWhereUniqueInput[]
    disconnect?: BanWhereUniqueInput | BanWhereUniqueInput[]
    delete?: BanWhereUniqueInput | BanWhereUniqueInput[]
    connect?: BanWhereUniqueInput | BanWhereUniqueInput[]
    update?: BanUpdateWithWhereUniqueWithoutUserInput | BanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BanUpdateManyWithWhereWithoutUserInput | BanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BanScalarWhereInput | BanScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<MessageCreateWithoutAuthorInput, MessageUncheckedCreateWithoutAuthorInput> | MessageCreateWithoutAuthorInput[] | MessageUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutAuthorInput | MessageCreateOrConnectWithoutAuthorInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutAuthorInput | MessageUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: MessageCreateManyAuthorInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutAuthorInput | MessageUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutAuthorInput | MessageUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ReactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReactionCreateWithoutUserInput, ReactionUncheckedCreateWithoutUserInput> | ReactionCreateWithoutUserInput[] | ReactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutUserInput | ReactionCreateOrConnectWithoutUserInput[]
    upsert?: ReactionUpsertWithWhereUniqueWithoutUserInput | ReactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReactionCreateManyUserInputEnvelope
    set?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    disconnect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    delete?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    update?: ReactionUpdateWithWhereUniqueWithoutUserInput | ReactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReactionUpdateManyWithWhereWithoutUserInput | ReactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserTokenCreateWithoutUserInput, UserTokenUncheckedCreateWithoutUserInput> | UserTokenCreateWithoutUserInput[] | UserTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserTokenCreateOrConnectWithoutUserInput | UserTokenCreateOrConnectWithoutUserInput[]
    upsert?: UserTokenUpsertWithWhereUniqueWithoutUserInput | UserTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserTokenCreateManyUserInputEnvelope
    set?: UserTokenWhereUniqueInput | UserTokenWhereUniqueInput[]
    disconnect?: UserTokenWhereUniqueInput | UserTokenWhereUniqueInput[]
    delete?: UserTokenWhereUniqueInput | UserTokenWhereUniqueInput[]
    connect?: UserTokenWhereUniqueInput | UserTokenWhereUniqueInput[]
    update?: UserTokenUpdateWithWhereUniqueWithoutUserInput | UserTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserTokenUpdateManyWithWhereWithoutUserInput | UserTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserTokenScalarWhereInput | UserTokenScalarWhereInput[]
  }

  export type ServerMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ServerMemberCreateWithoutUserInput, ServerMemberUncheckedCreateWithoutUserInput> | ServerMemberCreateWithoutUserInput[] | ServerMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutUserInput | ServerMemberCreateOrConnectWithoutUserInput[]
    upsert?: ServerMemberUpsertWithWhereUniqueWithoutUserInput | ServerMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ServerMemberCreateManyUserInputEnvelope
    set?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    disconnect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    delete?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    update?: ServerMemberUpdateWithWhereUniqueWithoutUserInput | ServerMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ServerMemberUpdateManyWithWhereWithoutUserInput | ServerMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ServerMemberScalarWhereInput | ServerMemberScalarWhereInput[]
  }

  export type ServerUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ServerCreateWithoutOwnerInput, ServerUncheckedCreateWithoutOwnerInput> | ServerCreateWithoutOwnerInput[] | ServerUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ServerCreateOrConnectWithoutOwnerInput | ServerCreateOrConnectWithoutOwnerInput[]
    upsert?: ServerUpsertWithWhereUniqueWithoutOwnerInput | ServerUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ServerCreateManyOwnerInputEnvelope
    set?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    disconnect?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    delete?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    connect?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    update?: ServerUpdateWithWhereUniqueWithoutOwnerInput | ServerUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ServerUpdateManyWithWhereWithoutOwnerInput | ServerUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ServerScalarWhereInput | ServerScalarWhereInput[]
  }

  export type ServerInviteUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ServerInviteCreateWithoutCreatedByInput, ServerInviteUncheckedCreateWithoutCreatedByInput> | ServerInviteCreateWithoutCreatedByInput[] | ServerInviteUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutCreatedByInput | ServerInviteCreateOrConnectWithoutCreatedByInput[]
    upsert?: ServerInviteUpsertWithWhereUniqueWithoutCreatedByInput | ServerInviteUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ServerInviteCreateManyCreatedByInputEnvelope
    set?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    disconnect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    delete?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    update?: ServerInviteUpdateWithWhereUniqueWithoutCreatedByInput | ServerInviteUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ServerInviteUpdateManyWithWhereWithoutCreatedByInput | ServerInviteUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ServerInviteScalarWhereInput | ServerInviteScalarWhereInput[]
  }

  export type BanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BanCreateWithoutUserInput, BanUncheckedCreateWithoutUserInput> | BanCreateWithoutUserInput[] | BanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BanCreateOrConnectWithoutUserInput | BanCreateOrConnectWithoutUserInput[]
    upsert?: BanUpsertWithWhereUniqueWithoutUserInput | BanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BanCreateManyUserInputEnvelope
    set?: BanWhereUniqueInput | BanWhereUniqueInput[]
    disconnect?: BanWhereUniqueInput | BanWhereUniqueInput[]
    delete?: BanWhereUniqueInput | BanWhereUniqueInput[]
    connect?: BanWhereUniqueInput | BanWhereUniqueInput[]
    update?: BanUpdateWithWhereUniqueWithoutUserInput | BanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BanUpdateManyWithWhereWithoutUserInput | BanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BanScalarWhereInput | BanScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<MessageCreateWithoutAuthorInput, MessageUncheckedCreateWithoutAuthorInput> | MessageCreateWithoutAuthorInput[] | MessageUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutAuthorInput | MessageCreateOrConnectWithoutAuthorInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutAuthorInput | MessageUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: MessageCreateManyAuthorInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutAuthorInput | MessageUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutAuthorInput | MessageUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ReactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReactionCreateWithoutUserInput, ReactionUncheckedCreateWithoutUserInput> | ReactionCreateWithoutUserInput[] | ReactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutUserInput | ReactionCreateOrConnectWithoutUserInput[]
    upsert?: ReactionUpsertWithWhereUniqueWithoutUserInput | ReactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReactionCreateManyUserInputEnvelope
    set?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    disconnect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    delete?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    update?: ReactionUpdateWithWhereUniqueWithoutUserInput | ReactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReactionUpdateManyWithWhereWithoutUserInput | ReactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTokensInput = {
    create?: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokensInput
    connect?: UserWhereUniqueInput
  }

  export type EnumVerifyTokenTypeFieldUpdateOperationsInput = {
    set?: $Enums.VerifyTokenType
  }

  export type UserUpdateOneRequiredWithoutTokensNestedInput = {
    create?: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokensInput
    upsert?: UserUpsertWithoutTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTokensInput, UserUpdateWithoutTokensInput>, UserUncheckedUpdateWithoutTokensInput>
  }

  export type UserCreateNestedOneWithoutOwnedServersInput = {
    create?: XOR<UserCreateWithoutOwnedServersInput, UserUncheckedCreateWithoutOwnedServersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedServersInput
    connect?: UserWhereUniqueInput
  }

  export type ServerMemberCreateNestedManyWithoutServerInput = {
    create?: XOR<ServerMemberCreateWithoutServerInput, ServerMemberUncheckedCreateWithoutServerInput> | ServerMemberCreateWithoutServerInput[] | ServerMemberUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutServerInput | ServerMemberCreateOrConnectWithoutServerInput[]
    createMany?: ServerMemberCreateManyServerInputEnvelope
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
  }

  export type ChannelCreateNestedManyWithoutServerInput = {
    create?: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput> | ChannelCreateWithoutServerInput[] | ChannelUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutServerInput | ChannelCreateOrConnectWithoutServerInput[]
    createMany?: ChannelCreateManyServerInputEnvelope
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
  }

  export type ServerInviteCreateNestedManyWithoutServerInput = {
    create?: XOR<ServerInviteCreateWithoutServerInput, ServerInviteUncheckedCreateWithoutServerInput> | ServerInviteCreateWithoutServerInput[] | ServerInviteUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutServerInput | ServerInviteCreateOrConnectWithoutServerInput[]
    createMany?: ServerInviteCreateManyServerInputEnvelope
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
  }

  export type BanCreateNestedManyWithoutServerInput = {
    create?: XOR<BanCreateWithoutServerInput, BanUncheckedCreateWithoutServerInput> | BanCreateWithoutServerInput[] | BanUncheckedCreateWithoutServerInput[]
    connectOrCreate?: BanCreateOrConnectWithoutServerInput | BanCreateOrConnectWithoutServerInput[]
    createMany?: BanCreateManyServerInputEnvelope
    connect?: BanWhereUniqueInput | BanWhereUniqueInput[]
  }

  export type ServerMemberUncheckedCreateNestedManyWithoutServerInput = {
    create?: XOR<ServerMemberCreateWithoutServerInput, ServerMemberUncheckedCreateWithoutServerInput> | ServerMemberCreateWithoutServerInput[] | ServerMemberUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutServerInput | ServerMemberCreateOrConnectWithoutServerInput[]
    createMany?: ServerMemberCreateManyServerInputEnvelope
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
  }

  export type ChannelUncheckedCreateNestedManyWithoutServerInput = {
    create?: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput> | ChannelCreateWithoutServerInput[] | ChannelUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutServerInput | ChannelCreateOrConnectWithoutServerInput[]
    createMany?: ChannelCreateManyServerInputEnvelope
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
  }

  export type ServerInviteUncheckedCreateNestedManyWithoutServerInput = {
    create?: XOR<ServerInviteCreateWithoutServerInput, ServerInviteUncheckedCreateWithoutServerInput> | ServerInviteCreateWithoutServerInput[] | ServerInviteUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutServerInput | ServerInviteCreateOrConnectWithoutServerInput[]
    createMany?: ServerInviteCreateManyServerInputEnvelope
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
  }

  export type BanUncheckedCreateNestedManyWithoutServerInput = {
    create?: XOR<BanCreateWithoutServerInput, BanUncheckedCreateWithoutServerInput> | BanCreateWithoutServerInput[] | BanUncheckedCreateWithoutServerInput[]
    connectOrCreate?: BanCreateOrConnectWithoutServerInput | BanCreateOrConnectWithoutServerInput[]
    createMany?: BanCreateManyServerInputEnvelope
    connect?: BanWhereUniqueInput | BanWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutOwnedServersNestedInput = {
    create?: XOR<UserCreateWithoutOwnedServersInput, UserUncheckedCreateWithoutOwnedServersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedServersInput
    upsert?: UserUpsertWithoutOwnedServersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedServersInput, UserUpdateWithoutOwnedServersInput>, UserUncheckedUpdateWithoutOwnedServersInput>
  }

  export type ServerMemberUpdateManyWithoutServerNestedInput = {
    create?: XOR<ServerMemberCreateWithoutServerInput, ServerMemberUncheckedCreateWithoutServerInput> | ServerMemberCreateWithoutServerInput[] | ServerMemberUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutServerInput | ServerMemberCreateOrConnectWithoutServerInput[]
    upsert?: ServerMemberUpsertWithWhereUniqueWithoutServerInput | ServerMemberUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ServerMemberCreateManyServerInputEnvelope
    set?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    disconnect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    delete?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    update?: ServerMemberUpdateWithWhereUniqueWithoutServerInput | ServerMemberUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ServerMemberUpdateManyWithWhereWithoutServerInput | ServerMemberUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ServerMemberScalarWhereInput | ServerMemberScalarWhereInput[]
  }

  export type ChannelUpdateManyWithoutServerNestedInput = {
    create?: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput> | ChannelCreateWithoutServerInput[] | ChannelUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutServerInput | ChannelCreateOrConnectWithoutServerInput[]
    upsert?: ChannelUpsertWithWhereUniqueWithoutServerInput | ChannelUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ChannelCreateManyServerInputEnvelope
    set?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    disconnect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    delete?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    update?: ChannelUpdateWithWhereUniqueWithoutServerInput | ChannelUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ChannelUpdateManyWithWhereWithoutServerInput | ChannelUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
  }

  export type ServerInviteUpdateManyWithoutServerNestedInput = {
    create?: XOR<ServerInviteCreateWithoutServerInput, ServerInviteUncheckedCreateWithoutServerInput> | ServerInviteCreateWithoutServerInput[] | ServerInviteUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutServerInput | ServerInviteCreateOrConnectWithoutServerInput[]
    upsert?: ServerInviteUpsertWithWhereUniqueWithoutServerInput | ServerInviteUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ServerInviteCreateManyServerInputEnvelope
    set?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    disconnect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    delete?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    update?: ServerInviteUpdateWithWhereUniqueWithoutServerInput | ServerInviteUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ServerInviteUpdateManyWithWhereWithoutServerInput | ServerInviteUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ServerInviteScalarWhereInput | ServerInviteScalarWhereInput[]
  }

  export type BanUpdateManyWithoutServerNestedInput = {
    create?: XOR<BanCreateWithoutServerInput, BanUncheckedCreateWithoutServerInput> | BanCreateWithoutServerInput[] | BanUncheckedCreateWithoutServerInput[]
    connectOrCreate?: BanCreateOrConnectWithoutServerInput | BanCreateOrConnectWithoutServerInput[]
    upsert?: BanUpsertWithWhereUniqueWithoutServerInput | BanUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: BanCreateManyServerInputEnvelope
    set?: BanWhereUniqueInput | BanWhereUniqueInput[]
    disconnect?: BanWhereUniqueInput | BanWhereUniqueInput[]
    delete?: BanWhereUniqueInput | BanWhereUniqueInput[]
    connect?: BanWhereUniqueInput | BanWhereUniqueInput[]
    update?: BanUpdateWithWhereUniqueWithoutServerInput | BanUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: BanUpdateManyWithWhereWithoutServerInput | BanUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: BanScalarWhereInput | BanScalarWhereInput[]
  }

  export type ServerMemberUncheckedUpdateManyWithoutServerNestedInput = {
    create?: XOR<ServerMemberCreateWithoutServerInput, ServerMemberUncheckedCreateWithoutServerInput> | ServerMemberCreateWithoutServerInput[] | ServerMemberUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerMemberCreateOrConnectWithoutServerInput | ServerMemberCreateOrConnectWithoutServerInput[]
    upsert?: ServerMemberUpsertWithWhereUniqueWithoutServerInput | ServerMemberUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ServerMemberCreateManyServerInputEnvelope
    set?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    disconnect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    delete?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    connect?: ServerMemberWhereUniqueInput | ServerMemberWhereUniqueInput[]
    update?: ServerMemberUpdateWithWhereUniqueWithoutServerInput | ServerMemberUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ServerMemberUpdateManyWithWhereWithoutServerInput | ServerMemberUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ServerMemberScalarWhereInput | ServerMemberScalarWhereInput[]
  }

  export type ChannelUncheckedUpdateManyWithoutServerNestedInput = {
    create?: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput> | ChannelCreateWithoutServerInput[] | ChannelUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutServerInput | ChannelCreateOrConnectWithoutServerInput[]
    upsert?: ChannelUpsertWithWhereUniqueWithoutServerInput | ChannelUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ChannelCreateManyServerInputEnvelope
    set?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    disconnect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    delete?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    update?: ChannelUpdateWithWhereUniqueWithoutServerInput | ChannelUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ChannelUpdateManyWithWhereWithoutServerInput | ChannelUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
  }

  export type ServerInviteUncheckedUpdateManyWithoutServerNestedInput = {
    create?: XOR<ServerInviteCreateWithoutServerInput, ServerInviteUncheckedCreateWithoutServerInput> | ServerInviteCreateWithoutServerInput[] | ServerInviteUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ServerInviteCreateOrConnectWithoutServerInput | ServerInviteCreateOrConnectWithoutServerInput[]
    upsert?: ServerInviteUpsertWithWhereUniqueWithoutServerInput | ServerInviteUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ServerInviteCreateManyServerInputEnvelope
    set?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    disconnect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    delete?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    connect?: ServerInviteWhereUniqueInput | ServerInviteWhereUniqueInput[]
    update?: ServerInviteUpdateWithWhereUniqueWithoutServerInput | ServerInviteUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ServerInviteUpdateManyWithWhereWithoutServerInput | ServerInviteUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ServerInviteScalarWhereInput | ServerInviteScalarWhereInput[]
  }

  export type BanUncheckedUpdateManyWithoutServerNestedInput = {
    create?: XOR<BanCreateWithoutServerInput, BanUncheckedCreateWithoutServerInput> | BanCreateWithoutServerInput[] | BanUncheckedCreateWithoutServerInput[]
    connectOrCreate?: BanCreateOrConnectWithoutServerInput | BanCreateOrConnectWithoutServerInput[]
    upsert?: BanUpsertWithWhereUniqueWithoutServerInput | BanUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: BanCreateManyServerInputEnvelope
    set?: BanWhereUniqueInput | BanWhereUniqueInput[]
    disconnect?: BanWhereUniqueInput | BanWhereUniqueInput[]
    delete?: BanWhereUniqueInput | BanWhereUniqueInput[]
    connect?: BanWhereUniqueInput | BanWhereUniqueInput[]
    update?: BanUpdateWithWhereUniqueWithoutServerInput | BanUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: BanUpdateManyWithWhereWithoutServerInput | BanUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: BanScalarWhereInput | BanScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBansInput = {
    create?: XOR<UserCreateWithoutBansInput, UserUncheckedCreateWithoutBansInput>
    connectOrCreate?: UserCreateOrConnectWithoutBansInput
    connect?: UserWhereUniqueInput
  }

  export type ServerCreateNestedOneWithoutBansInput = {
    create?: XOR<ServerCreateWithoutBansInput, ServerUncheckedCreateWithoutBansInput>
    connectOrCreate?: ServerCreateOrConnectWithoutBansInput
    connect?: ServerWhereUniqueInput
  }

  export type EnumMemberRoleFieldUpdateOperationsInput = {
    set?: $Enums.MemberRole
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumBanAppealStatusFieldUpdateOperationsInput = {
    set?: $Enums.BanAppealStatus
  }

  export type UserUpdateOneRequiredWithoutBansNestedInput = {
    create?: XOR<UserCreateWithoutBansInput, UserUncheckedCreateWithoutBansInput>
    connectOrCreate?: UserCreateOrConnectWithoutBansInput
    upsert?: UserUpsertWithoutBansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBansInput, UserUpdateWithoutBansInput>, UserUncheckedUpdateWithoutBansInput>
  }

  export type ServerUpdateOneRequiredWithoutBansNestedInput = {
    create?: XOR<ServerCreateWithoutBansInput, ServerUncheckedCreateWithoutBansInput>
    connectOrCreate?: ServerCreateOrConnectWithoutBansInput
    upsert?: ServerUpsertWithoutBansInput
    connect?: ServerWhereUniqueInput
    update?: XOR<XOR<ServerUpdateToOneWithWhereWithoutBansInput, ServerUpdateWithoutBansInput>, ServerUncheckedUpdateWithoutBansInput>
  }

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type ServerCreateNestedOneWithoutMembersInput = {
    create?: XOR<ServerCreateWithoutMembersInput, ServerUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ServerCreateOrConnectWithoutMembersInput
    connect?: ServerWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    upsert?: UserUpsertWithoutMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembershipsInput, UserUpdateWithoutMembershipsInput>, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type ServerUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<ServerCreateWithoutMembersInput, ServerUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ServerCreateOrConnectWithoutMembersInput
    upsert?: ServerUpsertWithoutMembersInput
    connect?: ServerWhereUniqueInput
    update?: XOR<XOR<ServerUpdateToOneWithWhereWithoutMembersInput, ServerUpdateWithoutMembersInput>, ServerUncheckedUpdateWithoutMembersInput>
  }

  export type ServerCreateNestedOneWithoutChannelsInput = {
    create?: XOR<ServerCreateWithoutChannelsInput, ServerUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: ServerCreateOrConnectWithoutChannelsInput
    connect?: ServerWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutChannelInput = {
    create?: XOR<MessageCreateWithoutChannelInput, MessageUncheckedCreateWithoutChannelInput> | MessageCreateWithoutChannelInput[] | MessageUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutChannelInput | MessageCreateOrConnectWithoutChannelInput[]
    createMany?: MessageCreateManyChannelInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type AttachmentCreateNestedManyWithoutChannelInput = {
    create?: XOR<AttachmentCreateWithoutChannelInput, AttachmentUncheckedCreateWithoutChannelInput> | AttachmentCreateWithoutChannelInput[] | AttachmentUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutChannelInput | AttachmentCreateOrConnectWithoutChannelInput[]
    createMany?: AttachmentCreateManyChannelInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutChannelInput = {
    create?: XOR<MessageCreateWithoutChannelInput, MessageUncheckedCreateWithoutChannelInput> | MessageCreateWithoutChannelInput[] | MessageUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutChannelInput | MessageCreateOrConnectWithoutChannelInput[]
    createMany?: MessageCreateManyChannelInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type AttachmentUncheckedCreateNestedManyWithoutChannelInput = {
    create?: XOR<AttachmentCreateWithoutChannelInput, AttachmentUncheckedCreateWithoutChannelInput> | AttachmentCreateWithoutChannelInput[] | AttachmentUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutChannelInput | AttachmentCreateOrConnectWithoutChannelInput[]
    createMany?: AttachmentCreateManyChannelInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type EnumChannelTypeFieldUpdateOperationsInput = {
    set?: $Enums.ChannelType
  }

  export type ServerUpdateOneRequiredWithoutChannelsNestedInput = {
    create?: XOR<ServerCreateWithoutChannelsInput, ServerUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: ServerCreateOrConnectWithoutChannelsInput
    upsert?: ServerUpsertWithoutChannelsInput
    connect?: ServerWhereUniqueInput
    update?: XOR<XOR<ServerUpdateToOneWithWhereWithoutChannelsInput, ServerUpdateWithoutChannelsInput>, ServerUncheckedUpdateWithoutChannelsInput>
  }

  export type MessageUpdateManyWithoutChannelNestedInput = {
    create?: XOR<MessageCreateWithoutChannelInput, MessageUncheckedCreateWithoutChannelInput> | MessageCreateWithoutChannelInput[] | MessageUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutChannelInput | MessageCreateOrConnectWithoutChannelInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutChannelInput | MessageUpsertWithWhereUniqueWithoutChannelInput[]
    createMany?: MessageCreateManyChannelInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutChannelInput | MessageUpdateWithWhereUniqueWithoutChannelInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutChannelInput | MessageUpdateManyWithWhereWithoutChannelInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type AttachmentUpdateManyWithoutChannelNestedInput = {
    create?: XOR<AttachmentCreateWithoutChannelInput, AttachmentUncheckedCreateWithoutChannelInput> | AttachmentCreateWithoutChannelInput[] | AttachmentUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutChannelInput | AttachmentCreateOrConnectWithoutChannelInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutChannelInput | AttachmentUpsertWithWhereUniqueWithoutChannelInput[]
    createMany?: AttachmentCreateManyChannelInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutChannelInput | AttachmentUpdateWithWhereUniqueWithoutChannelInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutChannelInput | AttachmentUpdateManyWithWhereWithoutChannelInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutChannelNestedInput = {
    create?: XOR<MessageCreateWithoutChannelInput, MessageUncheckedCreateWithoutChannelInput> | MessageCreateWithoutChannelInput[] | MessageUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutChannelInput | MessageCreateOrConnectWithoutChannelInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutChannelInput | MessageUpsertWithWhereUniqueWithoutChannelInput[]
    createMany?: MessageCreateManyChannelInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutChannelInput | MessageUpdateWithWhereUniqueWithoutChannelInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutChannelInput | MessageUpdateManyWithWhereWithoutChannelInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type AttachmentUncheckedUpdateManyWithoutChannelNestedInput = {
    create?: XOR<AttachmentCreateWithoutChannelInput, AttachmentUncheckedCreateWithoutChannelInput> | AttachmentCreateWithoutChannelInput[] | AttachmentUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutChannelInput | AttachmentCreateOrConnectWithoutChannelInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutChannelInput | AttachmentUpsertWithWhereUniqueWithoutChannelInput[]
    createMany?: AttachmentCreateManyChannelInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutChannelInput | AttachmentUpdateWithWhereUniqueWithoutChannelInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutChannelInput | AttachmentUpdateManyWithWhereWithoutChannelInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type ServerCreateNestedOneWithoutInvitesInput = {
    create?: XOR<ServerCreateWithoutInvitesInput, ServerUncheckedCreateWithoutInvitesInput>
    connectOrCreate?: ServerCreateOrConnectWithoutInvitesInput
    connect?: ServerWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedInvitesInput = {
    create?: XOR<UserCreateWithoutCreatedInvitesInput, UserUncheckedCreateWithoutCreatedInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedInvitesInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ServerUpdateOneRequiredWithoutInvitesNestedInput = {
    create?: XOR<ServerCreateWithoutInvitesInput, ServerUncheckedCreateWithoutInvitesInput>
    connectOrCreate?: ServerCreateOrConnectWithoutInvitesInput
    upsert?: ServerUpsertWithoutInvitesInput
    connect?: ServerWhereUniqueInput
    update?: XOR<XOR<ServerUpdateToOneWithWhereWithoutInvitesInput, ServerUpdateWithoutInvitesInput>, ServerUncheckedUpdateWithoutInvitesInput>
  }

  export type UserUpdateOneRequiredWithoutCreatedInvitesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedInvitesInput, UserUncheckedCreateWithoutCreatedInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedInvitesInput
    upsert?: UserUpsertWithoutCreatedInvitesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedInvitesInput, UserUpdateWithoutCreatedInvitesInput>, UserUncheckedUpdateWithoutCreatedInvitesInput>
  }

  export type ChannelCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ChannelCreateWithoutMessagesInput, ChannelUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChannelCreateOrConnectWithoutMessagesInput
    connect?: ChannelWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMessagesInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type MessageCreateNestedOneWithoutRepliesInput = {
    create?: XOR<MessageCreateWithoutRepliesInput, MessageUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: MessageCreateOrConnectWithoutRepliesInput
    connect?: MessageWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutReplyToInput = {
    create?: XOR<MessageCreateWithoutReplyToInput, MessageUncheckedCreateWithoutReplyToInput> | MessageCreateWithoutReplyToInput[] | MessageUncheckedCreateWithoutReplyToInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReplyToInput | MessageCreateOrConnectWithoutReplyToInput[]
    createMany?: MessageCreateManyReplyToInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type AttachmentCreateNestedManyWithoutMessageInput = {
    create?: XOR<AttachmentCreateWithoutMessageInput, AttachmentUncheckedCreateWithoutMessageInput> | AttachmentCreateWithoutMessageInput[] | AttachmentUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutMessageInput | AttachmentCreateOrConnectWithoutMessageInput[]
    createMany?: AttachmentCreateManyMessageInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type ReactionCreateNestedManyWithoutMessageInput = {
    create?: XOR<ReactionCreateWithoutMessageInput, ReactionUncheckedCreateWithoutMessageInput> | ReactionCreateWithoutMessageInput[] | ReactionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutMessageInput | ReactionCreateOrConnectWithoutMessageInput[]
    createMany?: ReactionCreateManyMessageInputEnvelope
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutReplyToInput = {
    create?: XOR<MessageCreateWithoutReplyToInput, MessageUncheckedCreateWithoutReplyToInput> | MessageCreateWithoutReplyToInput[] | MessageUncheckedCreateWithoutReplyToInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReplyToInput | MessageCreateOrConnectWithoutReplyToInput[]
    createMany?: MessageCreateManyReplyToInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type AttachmentUncheckedCreateNestedManyWithoutMessageInput = {
    create?: XOR<AttachmentCreateWithoutMessageInput, AttachmentUncheckedCreateWithoutMessageInput> | AttachmentCreateWithoutMessageInput[] | AttachmentUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutMessageInput | AttachmentCreateOrConnectWithoutMessageInput[]
    createMany?: AttachmentCreateManyMessageInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type ReactionUncheckedCreateNestedManyWithoutMessageInput = {
    create?: XOR<ReactionCreateWithoutMessageInput, ReactionUncheckedCreateWithoutMessageInput> | ReactionCreateWithoutMessageInput[] | ReactionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutMessageInput | ReactionCreateOrConnectWithoutMessageInput[]
    createMany?: ReactionCreateManyMessageInputEnvelope
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
  }

  export type ChannelUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ChannelCreateWithoutMessagesInput, ChannelUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChannelCreateOrConnectWithoutMessagesInput
    upsert?: ChannelUpsertWithoutMessagesInput
    connect?: ChannelWhereUniqueInput
    update?: XOR<XOR<ChannelUpdateToOneWithWhereWithoutMessagesInput, ChannelUpdateWithoutMessagesInput>, ChannelUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    upsert?: UserUpsertWithoutMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesInput, UserUpdateWithoutMessagesInput>, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type MessageUpdateOneWithoutRepliesNestedInput = {
    create?: XOR<MessageCreateWithoutRepliesInput, MessageUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: MessageCreateOrConnectWithoutRepliesInput
    upsert?: MessageUpsertWithoutRepliesInput
    disconnect?: MessageWhereInput | boolean
    delete?: MessageWhereInput | boolean
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutRepliesInput, MessageUpdateWithoutRepliesInput>, MessageUncheckedUpdateWithoutRepliesInput>
  }

  export type MessageUpdateManyWithoutReplyToNestedInput = {
    create?: XOR<MessageCreateWithoutReplyToInput, MessageUncheckedCreateWithoutReplyToInput> | MessageCreateWithoutReplyToInput[] | MessageUncheckedCreateWithoutReplyToInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReplyToInput | MessageCreateOrConnectWithoutReplyToInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReplyToInput | MessageUpsertWithWhereUniqueWithoutReplyToInput[]
    createMany?: MessageCreateManyReplyToInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReplyToInput | MessageUpdateWithWhereUniqueWithoutReplyToInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReplyToInput | MessageUpdateManyWithWhereWithoutReplyToInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type AttachmentUpdateManyWithoutMessageNestedInput = {
    create?: XOR<AttachmentCreateWithoutMessageInput, AttachmentUncheckedCreateWithoutMessageInput> | AttachmentCreateWithoutMessageInput[] | AttachmentUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutMessageInput | AttachmentCreateOrConnectWithoutMessageInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutMessageInput | AttachmentUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: AttachmentCreateManyMessageInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutMessageInput | AttachmentUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutMessageInput | AttachmentUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type ReactionUpdateManyWithoutMessageNestedInput = {
    create?: XOR<ReactionCreateWithoutMessageInput, ReactionUncheckedCreateWithoutMessageInput> | ReactionCreateWithoutMessageInput[] | ReactionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutMessageInput | ReactionCreateOrConnectWithoutMessageInput[]
    upsert?: ReactionUpsertWithWhereUniqueWithoutMessageInput | ReactionUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: ReactionCreateManyMessageInputEnvelope
    set?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    disconnect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    delete?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    update?: ReactionUpdateWithWhereUniqueWithoutMessageInput | ReactionUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: ReactionUpdateManyWithWhereWithoutMessageInput | ReactionUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutReplyToNestedInput = {
    create?: XOR<MessageCreateWithoutReplyToInput, MessageUncheckedCreateWithoutReplyToInput> | MessageCreateWithoutReplyToInput[] | MessageUncheckedCreateWithoutReplyToInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReplyToInput | MessageCreateOrConnectWithoutReplyToInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReplyToInput | MessageUpsertWithWhereUniqueWithoutReplyToInput[]
    createMany?: MessageCreateManyReplyToInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReplyToInput | MessageUpdateWithWhereUniqueWithoutReplyToInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReplyToInput | MessageUpdateManyWithWhereWithoutReplyToInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type AttachmentUncheckedUpdateManyWithoutMessageNestedInput = {
    create?: XOR<AttachmentCreateWithoutMessageInput, AttachmentUncheckedCreateWithoutMessageInput> | AttachmentCreateWithoutMessageInput[] | AttachmentUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutMessageInput | AttachmentCreateOrConnectWithoutMessageInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutMessageInput | AttachmentUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: AttachmentCreateManyMessageInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutMessageInput | AttachmentUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutMessageInput | AttachmentUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type ReactionUncheckedUpdateManyWithoutMessageNestedInput = {
    create?: XOR<ReactionCreateWithoutMessageInput, ReactionUncheckedCreateWithoutMessageInput> | ReactionCreateWithoutMessageInput[] | ReactionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutMessageInput | ReactionCreateOrConnectWithoutMessageInput[]
    upsert?: ReactionUpsertWithWhereUniqueWithoutMessageInput | ReactionUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: ReactionCreateManyMessageInputEnvelope
    set?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    disconnect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    delete?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    update?: ReactionUpdateWithWhereUniqueWithoutMessageInput | ReactionUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: ReactionUpdateManyWithWhereWithoutMessageInput | ReactionUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
  }

  export type MessageCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<MessageCreateWithoutAttachmentsInput, MessageUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: MessageCreateOrConnectWithoutAttachmentsInput
    connect?: MessageWhereUniqueInput
  }

  export type ChannelCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<ChannelCreateWithoutAttachmentsInput, ChannelUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: ChannelCreateOrConnectWithoutAttachmentsInput
    connect?: ChannelWhereUniqueInput
  }

  export type EnumAttachmentTypeFieldUpdateOperationsInput = {
    set?: $Enums.AttachmentType
  }

  export type MessageUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<MessageCreateWithoutAttachmentsInput, MessageUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: MessageCreateOrConnectWithoutAttachmentsInput
    upsert?: MessageUpsertWithoutAttachmentsInput
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutAttachmentsInput, MessageUpdateWithoutAttachmentsInput>, MessageUncheckedUpdateWithoutAttachmentsInput>
  }

  export type ChannelUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<ChannelCreateWithoutAttachmentsInput, ChannelUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: ChannelCreateOrConnectWithoutAttachmentsInput
    upsert?: ChannelUpsertWithoutAttachmentsInput
    connect?: ChannelWhereUniqueInput
    update?: XOR<XOR<ChannelUpdateToOneWithWhereWithoutAttachmentsInput, ChannelUpdateWithoutAttachmentsInput>, ChannelUncheckedUpdateWithoutAttachmentsInput>
  }

  export type UserCreateNestedOneWithoutReactionsInput = {
    create?: XOR<UserCreateWithoutReactionsInput, UserUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReactionsInput
    connect?: UserWhereUniqueInput
  }

  export type MessageCreateNestedOneWithoutReactionsInput = {
    create?: XOR<MessageCreateWithoutReactionsInput, MessageUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: MessageCreateOrConnectWithoutReactionsInput
    connect?: MessageWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutReactionsNestedInput = {
    create?: XOR<UserCreateWithoutReactionsInput, UserUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReactionsInput
    upsert?: UserUpsertWithoutReactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReactionsInput, UserUpdateWithoutReactionsInput>, UserUncheckedUpdateWithoutReactionsInput>
  }

  export type MessageUpdateOneRequiredWithoutReactionsNestedInput = {
    create?: XOR<MessageCreateWithoutReactionsInput, MessageUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: MessageCreateOrConnectWithoutReactionsInput
    upsert?: MessageUpsertWithoutReactionsInput
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutReactionsInput, MessageUpdateWithoutReactionsInput>, MessageUncheckedUpdateWithoutReactionsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumVerifyTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VerifyTokenType | EnumVerifyTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VerifyTokenType[] | ListEnumVerifyTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerifyTokenType[] | ListEnumVerifyTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVerifyTokenTypeFilter<$PrismaModel> | $Enums.VerifyTokenType
  }

  export type NestedEnumVerifyTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerifyTokenType | EnumVerifyTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VerifyTokenType[] | ListEnumVerifyTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerifyTokenType[] | ListEnumVerifyTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVerifyTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.VerifyTokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerifyTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumVerifyTokenTypeFilter<$PrismaModel>
  }

  export type NestedEnumMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberRole | EnumMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberRoleFilter<$PrismaModel> | $Enums.MemberRole
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumBanAppealStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BanAppealStatus | EnumBanAppealStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BanAppealStatus[] | ListEnumBanAppealStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BanAppealStatus[] | ListEnumBanAppealStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBanAppealStatusFilter<$PrismaModel> | $Enums.BanAppealStatus
  }

  export type NestedEnumMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberRole | EnumMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.MemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumMemberRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumBanAppealStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BanAppealStatus | EnumBanAppealStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BanAppealStatus[] | ListEnumBanAppealStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BanAppealStatus[] | ListEnumBanAppealStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBanAppealStatusWithAggregatesFilter<$PrismaModel> | $Enums.BanAppealStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBanAppealStatusFilter<$PrismaModel>
    _max?: NestedEnumBanAppealStatusFilter<$PrismaModel>
  }

  export type NestedEnumChannelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChannelType | EnumChannelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChannelTypeFilter<$PrismaModel> | $Enums.ChannelType
  }

  export type NestedEnumChannelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChannelType | EnumChannelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChannelTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChannelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChannelTypeFilter<$PrismaModel>
    _max?: NestedEnumChannelTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAttachmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AttachmentType | EnumAttachmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AttachmentType[] | ListEnumAttachmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttachmentType[] | ListEnumAttachmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAttachmentTypeFilter<$PrismaModel> | $Enums.AttachmentType
  }

  export type NestedEnumAttachmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttachmentType | EnumAttachmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AttachmentType[] | ListEnumAttachmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttachmentType[] | ListEnumAttachmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAttachmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AttachmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAttachmentTypeFilter<$PrismaModel>
    _max?: NestedEnumAttachmentTypeFilter<$PrismaModel>
  }

  export type UserTokenCreateWithoutUserInput = {
    token: string
    type: $Enums.VerifyTokenType
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type UserTokenUncheckedCreateWithoutUserInput = {
    id?: number
    token: string
    type: $Enums.VerifyTokenType
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type UserTokenCreateOrConnectWithoutUserInput = {
    where: UserTokenWhereUniqueInput
    create: XOR<UserTokenCreateWithoutUserInput, UserTokenUncheckedCreateWithoutUserInput>
  }

  export type UserTokenCreateManyUserInputEnvelope = {
    data: UserTokenCreateManyUserInput | UserTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ServerMemberCreateWithoutUserInput = {
    role?: $Enums.MemberRole
    joinedAt?: Date | string
    server: ServerCreateNestedOneWithoutMembersInput
  }

  export type ServerMemberUncheckedCreateWithoutUserInput = {
    id?: number
    serverId: number
    role?: $Enums.MemberRole
    joinedAt?: Date | string
  }

  export type ServerMemberCreateOrConnectWithoutUserInput = {
    where: ServerMemberWhereUniqueInput
    create: XOR<ServerMemberCreateWithoutUserInput, ServerMemberUncheckedCreateWithoutUserInput>
  }

  export type ServerMemberCreateManyUserInputEnvelope = {
    data: ServerMemberCreateManyUserInput | ServerMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ServerCreateWithoutOwnerInput = {
    name: string
    avatarUrl?: string | null
    createdAt?: Date | string
    members?: ServerMemberCreateNestedManyWithoutServerInput
    channels?: ChannelCreateNestedManyWithoutServerInput
    invites?: ServerInviteCreateNestedManyWithoutServerInput
    bans?: BanCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateWithoutOwnerInput = {
    id?: number
    name: string
    avatarUrl?: string | null
    createdAt?: Date | string
    members?: ServerMemberUncheckedCreateNestedManyWithoutServerInput
    channels?: ChannelUncheckedCreateNestedManyWithoutServerInput
    invites?: ServerInviteUncheckedCreateNestedManyWithoutServerInput
    bans?: BanUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerCreateOrConnectWithoutOwnerInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutOwnerInput, ServerUncheckedCreateWithoutOwnerInput>
  }

  export type ServerCreateManyOwnerInputEnvelope = {
    data: ServerCreateManyOwnerInput | ServerCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type ServerInviteCreateWithoutCreatedByInput = {
    code: string
    maxUses?: number | null
    currentUses?: number
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    server: ServerCreateNestedOneWithoutInvitesInput
  }

  export type ServerInviteUncheckedCreateWithoutCreatedByInput = {
    id?: number
    code: string
    serverId: number
    maxUses?: number | null
    currentUses?: number
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServerInviteCreateOrConnectWithoutCreatedByInput = {
    where: ServerInviteWhereUniqueInput
    create: XOR<ServerInviteCreateWithoutCreatedByInput, ServerInviteUncheckedCreateWithoutCreatedByInput>
  }

  export type ServerInviteCreateManyCreatedByInputEnvelope = {
    data: ServerInviteCreateManyCreatedByInput | ServerInviteCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type BanCreateWithoutUserInput = {
    bannedByRole: $Enums.MemberRole
    reason?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    appealStatus: $Enums.BanAppealStatus
    server: ServerCreateNestedOneWithoutBansInput
  }

  export type BanUncheckedCreateWithoutUserInput = {
    id?: number
    serverId: number
    bannedByRole: $Enums.MemberRole
    reason?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    appealStatus: $Enums.BanAppealStatus
  }

  export type BanCreateOrConnectWithoutUserInput = {
    where: BanWhereUniqueInput
    create: XOR<BanCreateWithoutUserInput, BanUncheckedCreateWithoutUserInput>
  }

  export type BanCreateManyUserInputEnvelope = {
    data: BanCreateManyUserInput | BanCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutAuthorInput = {
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
    channel: ChannelCreateNestedOneWithoutMessagesInput
    replyTo?: MessageCreateNestedOneWithoutRepliesInput
    replies?: MessageCreateNestedManyWithoutReplyToInput
    attachments?: AttachmentCreateNestedManyWithoutMessageInput
    reactions?: ReactionCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutAuthorInput = {
    id?: number
    channelId: number
    replyToMessageId?: number | null
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMessageInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutAuthorInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutAuthorInput, MessageUncheckedCreateWithoutAuthorInput>
  }

  export type MessageCreateManyAuthorInputEnvelope = {
    data: MessageCreateManyAuthorInput | MessageCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type ReactionCreateWithoutUserInput = {
    emoji: string
    createdAt?: Date | string
    Message: MessageCreateNestedOneWithoutReactionsInput
  }

  export type ReactionUncheckedCreateWithoutUserInput = {
    id?: number
    messageId: number
    emoji: string
    createdAt?: Date | string
  }

  export type ReactionCreateOrConnectWithoutUserInput = {
    where: ReactionWhereUniqueInput
    create: XOR<ReactionCreateWithoutUserInput, ReactionUncheckedCreateWithoutUserInput>
  }

  export type ReactionCreateManyUserInputEnvelope = {
    data: ReactionCreateManyUserInput | ReactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: UserTokenWhereUniqueInput
    update: XOR<UserTokenUpdateWithoutUserInput, UserTokenUncheckedUpdateWithoutUserInput>
    create: XOR<UserTokenCreateWithoutUserInput, UserTokenUncheckedCreateWithoutUserInput>
  }

  export type UserTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: UserTokenWhereUniqueInput
    data: XOR<UserTokenUpdateWithoutUserInput, UserTokenUncheckedUpdateWithoutUserInput>
  }

  export type UserTokenUpdateManyWithWhereWithoutUserInput = {
    where: UserTokenScalarWhereInput
    data: XOR<UserTokenUpdateManyMutationInput, UserTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type UserTokenScalarWhereInput = {
    AND?: UserTokenScalarWhereInput | UserTokenScalarWhereInput[]
    OR?: UserTokenScalarWhereInput[]
    NOT?: UserTokenScalarWhereInput | UserTokenScalarWhereInput[]
    id?: IntFilter<"UserToken"> | number
    userId?: IntFilter<"UserToken"> | number
    token?: StringFilter<"UserToken"> | string
    type?: EnumVerifyTokenTypeFilter<"UserToken"> | $Enums.VerifyTokenType
    expiresAt?: DateTimeFilter<"UserToken"> | Date | string
    used?: BoolFilter<"UserToken"> | boolean
    createdAt?: DateTimeFilter<"UserToken"> | Date | string
  }

  export type ServerMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: ServerMemberWhereUniqueInput
    update: XOR<ServerMemberUpdateWithoutUserInput, ServerMemberUncheckedUpdateWithoutUserInput>
    create: XOR<ServerMemberCreateWithoutUserInput, ServerMemberUncheckedCreateWithoutUserInput>
  }

  export type ServerMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: ServerMemberWhereUniqueInput
    data: XOR<ServerMemberUpdateWithoutUserInput, ServerMemberUncheckedUpdateWithoutUserInput>
  }

  export type ServerMemberUpdateManyWithWhereWithoutUserInput = {
    where: ServerMemberScalarWhereInput
    data: XOR<ServerMemberUpdateManyMutationInput, ServerMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type ServerMemberScalarWhereInput = {
    AND?: ServerMemberScalarWhereInput | ServerMemberScalarWhereInput[]
    OR?: ServerMemberScalarWhereInput[]
    NOT?: ServerMemberScalarWhereInput | ServerMemberScalarWhereInput[]
    id?: IntFilter<"ServerMember"> | number
    userId?: IntFilter<"ServerMember"> | number
    serverId?: IntFilter<"ServerMember"> | number
    role?: EnumMemberRoleFilter<"ServerMember"> | $Enums.MemberRole
    joinedAt?: DateTimeFilter<"ServerMember"> | Date | string
  }

  export type ServerUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ServerWhereUniqueInput
    update: XOR<ServerUpdateWithoutOwnerInput, ServerUncheckedUpdateWithoutOwnerInput>
    create: XOR<ServerCreateWithoutOwnerInput, ServerUncheckedCreateWithoutOwnerInput>
  }

  export type ServerUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ServerWhereUniqueInput
    data: XOR<ServerUpdateWithoutOwnerInput, ServerUncheckedUpdateWithoutOwnerInput>
  }

  export type ServerUpdateManyWithWhereWithoutOwnerInput = {
    where: ServerScalarWhereInput
    data: XOR<ServerUpdateManyMutationInput, ServerUncheckedUpdateManyWithoutOwnerInput>
  }

  export type ServerScalarWhereInput = {
    AND?: ServerScalarWhereInput | ServerScalarWhereInput[]
    OR?: ServerScalarWhereInput[]
    NOT?: ServerScalarWhereInput | ServerScalarWhereInput[]
    id?: IntFilter<"Server"> | number
    name?: StringFilter<"Server"> | string
    avatarUrl?: StringNullableFilter<"Server"> | string | null
    ownerId?: IntFilter<"Server"> | number
    createdAt?: DateTimeFilter<"Server"> | Date | string
  }

  export type ServerInviteUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: ServerInviteWhereUniqueInput
    update: XOR<ServerInviteUpdateWithoutCreatedByInput, ServerInviteUncheckedUpdateWithoutCreatedByInput>
    create: XOR<ServerInviteCreateWithoutCreatedByInput, ServerInviteUncheckedCreateWithoutCreatedByInput>
  }

  export type ServerInviteUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: ServerInviteWhereUniqueInput
    data: XOR<ServerInviteUpdateWithoutCreatedByInput, ServerInviteUncheckedUpdateWithoutCreatedByInput>
  }

  export type ServerInviteUpdateManyWithWhereWithoutCreatedByInput = {
    where: ServerInviteScalarWhereInput
    data: XOR<ServerInviteUpdateManyMutationInput, ServerInviteUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ServerInviteScalarWhereInput = {
    AND?: ServerInviteScalarWhereInput | ServerInviteScalarWhereInput[]
    OR?: ServerInviteScalarWhereInput[]
    NOT?: ServerInviteScalarWhereInput | ServerInviteScalarWhereInput[]
    id?: IntFilter<"ServerInvite"> | number
    code?: StringFilter<"ServerInvite"> | string
    serverId?: IntFilter<"ServerInvite"> | number
    maxUses?: IntNullableFilter<"ServerInvite"> | number | null
    currentUses?: IntFilter<"ServerInvite"> | number
    expiresAt?: DateTimeNullableFilter<"ServerInvite"> | Date | string | null
    createdById?: IntFilter<"ServerInvite"> | number
    createdAt?: DateTimeFilter<"ServerInvite"> | Date | string
    updatedAt?: DateTimeFilter<"ServerInvite"> | Date | string
  }

  export type BanUpsertWithWhereUniqueWithoutUserInput = {
    where: BanWhereUniqueInput
    update: XOR<BanUpdateWithoutUserInput, BanUncheckedUpdateWithoutUserInput>
    create: XOR<BanCreateWithoutUserInput, BanUncheckedCreateWithoutUserInput>
  }

  export type BanUpdateWithWhereUniqueWithoutUserInput = {
    where: BanWhereUniqueInput
    data: XOR<BanUpdateWithoutUserInput, BanUncheckedUpdateWithoutUserInput>
  }

  export type BanUpdateManyWithWhereWithoutUserInput = {
    where: BanScalarWhereInput
    data: XOR<BanUpdateManyMutationInput, BanUncheckedUpdateManyWithoutUserInput>
  }

  export type BanScalarWhereInput = {
    AND?: BanScalarWhereInput | BanScalarWhereInput[]
    OR?: BanScalarWhereInput[]
    NOT?: BanScalarWhereInput | BanScalarWhereInput[]
    id?: IntFilter<"Ban"> | number
    serverId?: IntFilter<"Ban"> | number
    userId?: IntFilter<"Ban"> | number
    bannedByRole?: EnumMemberRoleFilter<"Ban"> | $Enums.MemberRole
    reason?: StringNullableFilter<"Ban"> | string | null
    expiresAt?: DateTimeNullableFilter<"Ban"> | Date | string | null
    createdAt?: DateTimeFilter<"Ban"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Ban"> | Date | string | null
    appealStatus?: EnumBanAppealStatusFilter<"Ban"> | $Enums.BanAppealStatus
  }

  export type MessageUpsertWithWhereUniqueWithoutAuthorInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutAuthorInput, MessageUncheckedUpdateWithoutAuthorInput>
    create: XOR<MessageCreateWithoutAuthorInput, MessageUncheckedCreateWithoutAuthorInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutAuthorInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutAuthorInput, MessageUncheckedUpdateWithoutAuthorInput>
  }

  export type MessageUpdateManyWithWhereWithoutAuthorInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutAuthorInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: IntFilter<"Message"> | number
    channelId?: IntFilter<"Message"> | number
    authorId?: IntFilter<"Message"> | number
    replyToMessageId?: IntNullableFilter<"Message"> | number | null
    content?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    editedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    replyToDeleted?: BoolFilter<"Message"> | boolean
    clientMsgId?: StringNullableFilter<"Message"> | string | null
  }

  export type ReactionUpsertWithWhereUniqueWithoutUserInput = {
    where: ReactionWhereUniqueInput
    update: XOR<ReactionUpdateWithoutUserInput, ReactionUncheckedUpdateWithoutUserInput>
    create: XOR<ReactionCreateWithoutUserInput, ReactionUncheckedCreateWithoutUserInput>
  }

  export type ReactionUpdateWithWhereUniqueWithoutUserInput = {
    where: ReactionWhereUniqueInput
    data: XOR<ReactionUpdateWithoutUserInput, ReactionUncheckedUpdateWithoutUserInput>
  }

  export type ReactionUpdateManyWithWhereWithoutUserInput = {
    where: ReactionScalarWhereInput
    data: XOR<ReactionUpdateManyMutationInput, ReactionUncheckedUpdateManyWithoutUserInput>
  }

  export type ReactionScalarWhereInput = {
    AND?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
    OR?: ReactionScalarWhereInput[]
    NOT?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
    id?: IntFilter<"Reaction"> | number
    messageId?: IntFilter<"Reaction"> | number
    userId?: IntFilter<"Reaction"> | number
    emoji?: StringFilter<"Reaction"> | string
    createdAt?: DateTimeFilter<"Reaction"> | Date | string
  }

  export type UserCreateWithoutTokensInput = {
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: ServerMemberCreateNestedManyWithoutUserInput
    ownedServers?: ServerCreateNestedManyWithoutOwnerInput
    createdInvites?: ServerInviteCreateNestedManyWithoutCreatedByInput
    bans?: BanCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutAuthorInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTokensInput = {
    id?: number
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: ServerMemberUncheckedCreateNestedManyWithoutUserInput
    ownedServers?: ServerUncheckedCreateNestedManyWithoutOwnerInput
    createdInvites?: ServerInviteUncheckedCreateNestedManyWithoutCreatedByInput
    bans?: BanUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutAuthorInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
  }

  export type UserUpsertWithoutTokensInput = {
    update: XOR<UserUpdateWithoutTokensInput, UserUncheckedUpdateWithoutTokensInput>
    create: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTokensInput, UserUncheckedUpdateWithoutTokensInput>
  }

  export type UserUpdateWithoutTokensInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: ServerMemberUpdateManyWithoutUserNestedInput
    ownedServers?: ServerUpdateManyWithoutOwnerNestedInput
    createdInvites?: ServerInviteUpdateManyWithoutCreatedByNestedInput
    bans?: BanUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutAuthorNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTokensInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: ServerMemberUncheckedUpdateManyWithoutUserNestedInput
    ownedServers?: ServerUncheckedUpdateManyWithoutOwnerNestedInput
    createdInvites?: ServerInviteUncheckedUpdateManyWithoutCreatedByNestedInput
    bans?: BanUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutAuthorNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutOwnedServersInput = {
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tokens?: UserTokenCreateNestedManyWithoutUserInput
    memberships?: ServerMemberCreateNestedManyWithoutUserInput
    createdInvites?: ServerInviteCreateNestedManyWithoutCreatedByInput
    bans?: BanCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutAuthorInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOwnedServersInput = {
    id?: number
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tokens?: UserTokenUncheckedCreateNestedManyWithoutUserInput
    memberships?: ServerMemberUncheckedCreateNestedManyWithoutUserInput
    createdInvites?: ServerInviteUncheckedCreateNestedManyWithoutCreatedByInput
    bans?: BanUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutAuthorInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOwnedServersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedServersInput, UserUncheckedCreateWithoutOwnedServersInput>
  }

  export type ServerMemberCreateWithoutServerInput = {
    role?: $Enums.MemberRole
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
  }

  export type ServerMemberUncheckedCreateWithoutServerInput = {
    id?: number
    userId: number
    role?: $Enums.MemberRole
    joinedAt?: Date | string
  }

  export type ServerMemberCreateOrConnectWithoutServerInput = {
    where: ServerMemberWhereUniqueInput
    create: XOR<ServerMemberCreateWithoutServerInput, ServerMemberUncheckedCreateWithoutServerInput>
  }

  export type ServerMemberCreateManyServerInputEnvelope = {
    data: ServerMemberCreateManyServerInput | ServerMemberCreateManyServerInput[]
    skipDuplicates?: boolean
  }

  export type ChannelCreateWithoutServerInput = {
    name: string
    type: $Enums.ChannelType
    createdAt?: Date | string
    messages?: MessageCreateNestedManyWithoutChannelInput
    attachments?: AttachmentCreateNestedManyWithoutChannelInput
  }

  export type ChannelUncheckedCreateWithoutServerInput = {
    id?: number
    name: string
    type: $Enums.ChannelType
    createdAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutChannelInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutChannelInput
  }

  export type ChannelCreateOrConnectWithoutServerInput = {
    where: ChannelWhereUniqueInput
    create: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput>
  }

  export type ChannelCreateManyServerInputEnvelope = {
    data: ChannelCreateManyServerInput | ChannelCreateManyServerInput[]
    skipDuplicates?: boolean
  }

  export type ServerInviteCreateWithoutServerInput = {
    code: string
    maxUses?: number | null
    currentUses?: number
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedInvitesInput
  }

  export type ServerInviteUncheckedCreateWithoutServerInput = {
    id?: number
    code: string
    maxUses?: number | null
    currentUses?: number
    expiresAt?: Date | string | null
    createdById: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServerInviteCreateOrConnectWithoutServerInput = {
    where: ServerInviteWhereUniqueInput
    create: XOR<ServerInviteCreateWithoutServerInput, ServerInviteUncheckedCreateWithoutServerInput>
  }

  export type ServerInviteCreateManyServerInputEnvelope = {
    data: ServerInviteCreateManyServerInput | ServerInviteCreateManyServerInput[]
    skipDuplicates?: boolean
  }

  export type BanCreateWithoutServerInput = {
    bannedByRole: $Enums.MemberRole
    reason?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    appealStatus: $Enums.BanAppealStatus
    user: UserCreateNestedOneWithoutBansInput
  }

  export type BanUncheckedCreateWithoutServerInput = {
    id?: number
    userId: number
    bannedByRole: $Enums.MemberRole
    reason?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    appealStatus: $Enums.BanAppealStatus
  }

  export type BanCreateOrConnectWithoutServerInput = {
    where: BanWhereUniqueInput
    create: XOR<BanCreateWithoutServerInput, BanUncheckedCreateWithoutServerInput>
  }

  export type BanCreateManyServerInputEnvelope = {
    data: BanCreateManyServerInput | BanCreateManyServerInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOwnedServersInput = {
    update: XOR<UserUpdateWithoutOwnedServersInput, UserUncheckedUpdateWithoutOwnedServersInput>
    create: XOR<UserCreateWithoutOwnedServersInput, UserUncheckedCreateWithoutOwnedServersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedServersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedServersInput, UserUncheckedUpdateWithoutOwnedServersInput>
  }

  export type UserUpdateWithoutOwnedServersInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: UserTokenUpdateManyWithoutUserNestedInput
    memberships?: ServerMemberUpdateManyWithoutUserNestedInput
    createdInvites?: ServerInviteUpdateManyWithoutCreatedByNestedInput
    bans?: BanUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutAuthorNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedServersInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: UserTokenUncheckedUpdateManyWithoutUserNestedInput
    memberships?: ServerMemberUncheckedUpdateManyWithoutUserNestedInput
    createdInvites?: ServerInviteUncheckedUpdateManyWithoutCreatedByNestedInput
    bans?: BanUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutAuthorNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ServerMemberUpsertWithWhereUniqueWithoutServerInput = {
    where: ServerMemberWhereUniqueInput
    update: XOR<ServerMemberUpdateWithoutServerInput, ServerMemberUncheckedUpdateWithoutServerInput>
    create: XOR<ServerMemberCreateWithoutServerInput, ServerMemberUncheckedCreateWithoutServerInput>
  }

  export type ServerMemberUpdateWithWhereUniqueWithoutServerInput = {
    where: ServerMemberWhereUniqueInput
    data: XOR<ServerMemberUpdateWithoutServerInput, ServerMemberUncheckedUpdateWithoutServerInput>
  }

  export type ServerMemberUpdateManyWithWhereWithoutServerInput = {
    where: ServerMemberScalarWhereInput
    data: XOR<ServerMemberUpdateManyMutationInput, ServerMemberUncheckedUpdateManyWithoutServerInput>
  }

  export type ChannelUpsertWithWhereUniqueWithoutServerInput = {
    where: ChannelWhereUniqueInput
    update: XOR<ChannelUpdateWithoutServerInput, ChannelUncheckedUpdateWithoutServerInput>
    create: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput>
  }

  export type ChannelUpdateWithWhereUniqueWithoutServerInput = {
    where: ChannelWhereUniqueInput
    data: XOR<ChannelUpdateWithoutServerInput, ChannelUncheckedUpdateWithoutServerInput>
  }

  export type ChannelUpdateManyWithWhereWithoutServerInput = {
    where: ChannelScalarWhereInput
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyWithoutServerInput>
  }

  export type ChannelScalarWhereInput = {
    AND?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
    OR?: ChannelScalarWhereInput[]
    NOT?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
    id?: IntFilter<"Channel"> | number
    name?: StringFilter<"Channel"> | string
    serverId?: IntFilter<"Channel"> | number
    type?: EnumChannelTypeFilter<"Channel"> | $Enums.ChannelType
    createdAt?: DateTimeFilter<"Channel"> | Date | string
  }

  export type ServerInviteUpsertWithWhereUniqueWithoutServerInput = {
    where: ServerInviteWhereUniqueInput
    update: XOR<ServerInviteUpdateWithoutServerInput, ServerInviteUncheckedUpdateWithoutServerInput>
    create: XOR<ServerInviteCreateWithoutServerInput, ServerInviteUncheckedCreateWithoutServerInput>
  }

  export type ServerInviteUpdateWithWhereUniqueWithoutServerInput = {
    where: ServerInviteWhereUniqueInput
    data: XOR<ServerInviteUpdateWithoutServerInput, ServerInviteUncheckedUpdateWithoutServerInput>
  }

  export type ServerInviteUpdateManyWithWhereWithoutServerInput = {
    where: ServerInviteScalarWhereInput
    data: XOR<ServerInviteUpdateManyMutationInput, ServerInviteUncheckedUpdateManyWithoutServerInput>
  }

  export type BanUpsertWithWhereUniqueWithoutServerInput = {
    where: BanWhereUniqueInput
    update: XOR<BanUpdateWithoutServerInput, BanUncheckedUpdateWithoutServerInput>
    create: XOR<BanCreateWithoutServerInput, BanUncheckedCreateWithoutServerInput>
  }

  export type BanUpdateWithWhereUniqueWithoutServerInput = {
    where: BanWhereUniqueInput
    data: XOR<BanUpdateWithoutServerInput, BanUncheckedUpdateWithoutServerInput>
  }

  export type BanUpdateManyWithWhereWithoutServerInput = {
    where: BanScalarWhereInput
    data: XOR<BanUpdateManyMutationInput, BanUncheckedUpdateManyWithoutServerInput>
  }

  export type UserCreateWithoutBansInput = {
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tokens?: UserTokenCreateNestedManyWithoutUserInput
    memberships?: ServerMemberCreateNestedManyWithoutUserInput
    ownedServers?: ServerCreateNestedManyWithoutOwnerInput
    createdInvites?: ServerInviteCreateNestedManyWithoutCreatedByInput
    messages?: MessageCreateNestedManyWithoutAuthorInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBansInput = {
    id?: number
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tokens?: UserTokenUncheckedCreateNestedManyWithoutUserInput
    memberships?: ServerMemberUncheckedCreateNestedManyWithoutUserInput
    ownedServers?: ServerUncheckedCreateNestedManyWithoutOwnerInput
    createdInvites?: ServerInviteUncheckedCreateNestedManyWithoutCreatedByInput
    messages?: MessageUncheckedCreateNestedManyWithoutAuthorInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBansInput, UserUncheckedCreateWithoutBansInput>
  }

  export type ServerCreateWithoutBansInput = {
    name: string
    avatarUrl?: string | null
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedServersInput
    members?: ServerMemberCreateNestedManyWithoutServerInput
    channels?: ChannelCreateNestedManyWithoutServerInput
    invites?: ServerInviteCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateWithoutBansInput = {
    id?: number
    name: string
    avatarUrl?: string | null
    ownerId: number
    createdAt?: Date | string
    members?: ServerMemberUncheckedCreateNestedManyWithoutServerInput
    channels?: ChannelUncheckedCreateNestedManyWithoutServerInput
    invites?: ServerInviteUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerCreateOrConnectWithoutBansInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutBansInput, ServerUncheckedCreateWithoutBansInput>
  }

  export type UserUpsertWithoutBansInput = {
    update: XOR<UserUpdateWithoutBansInput, UserUncheckedUpdateWithoutBansInput>
    create: XOR<UserCreateWithoutBansInput, UserUncheckedCreateWithoutBansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBansInput, UserUncheckedUpdateWithoutBansInput>
  }

  export type UserUpdateWithoutBansInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: UserTokenUpdateManyWithoutUserNestedInput
    memberships?: ServerMemberUpdateManyWithoutUserNestedInput
    ownedServers?: ServerUpdateManyWithoutOwnerNestedInput
    createdInvites?: ServerInviteUpdateManyWithoutCreatedByNestedInput
    messages?: MessageUpdateManyWithoutAuthorNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBansInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: UserTokenUncheckedUpdateManyWithoutUserNestedInput
    memberships?: ServerMemberUncheckedUpdateManyWithoutUserNestedInput
    ownedServers?: ServerUncheckedUpdateManyWithoutOwnerNestedInput
    createdInvites?: ServerInviteUncheckedUpdateManyWithoutCreatedByNestedInput
    messages?: MessageUncheckedUpdateManyWithoutAuthorNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ServerUpsertWithoutBansInput = {
    update: XOR<ServerUpdateWithoutBansInput, ServerUncheckedUpdateWithoutBansInput>
    create: XOR<ServerCreateWithoutBansInput, ServerUncheckedCreateWithoutBansInput>
    where?: ServerWhereInput
  }

  export type ServerUpdateToOneWithWhereWithoutBansInput = {
    where?: ServerWhereInput
    data: XOR<ServerUpdateWithoutBansInput, ServerUncheckedUpdateWithoutBansInput>
  }

  export type ServerUpdateWithoutBansInput = {
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedServersNestedInput
    members?: ServerMemberUpdateManyWithoutServerNestedInput
    channels?: ChannelUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateWithoutBansInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ServerMemberUncheckedUpdateManyWithoutServerNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUncheckedUpdateManyWithoutServerNestedInput
  }

  export type UserCreateWithoutMembershipsInput = {
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tokens?: UserTokenCreateNestedManyWithoutUserInput
    ownedServers?: ServerCreateNestedManyWithoutOwnerInput
    createdInvites?: ServerInviteCreateNestedManyWithoutCreatedByInput
    bans?: BanCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutAuthorInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: number
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tokens?: UserTokenUncheckedCreateNestedManyWithoutUserInput
    ownedServers?: ServerUncheckedCreateNestedManyWithoutOwnerInput
    createdInvites?: ServerInviteUncheckedCreateNestedManyWithoutCreatedByInput
    bans?: BanUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutAuthorInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
  }

  export type ServerCreateWithoutMembersInput = {
    name: string
    avatarUrl?: string | null
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedServersInput
    channels?: ChannelCreateNestedManyWithoutServerInput
    invites?: ServerInviteCreateNestedManyWithoutServerInput
    bans?: BanCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateWithoutMembersInput = {
    id?: number
    name: string
    avatarUrl?: string | null
    ownerId: number
    createdAt?: Date | string
    channels?: ChannelUncheckedCreateNestedManyWithoutServerInput
    invites?: ServerInviteUncheckedCreateNestedManyWithoutServerInput
    bans?: BanUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerCreateOrConnectWithoutMembersInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutMembersInput, ServerUncheckedCreateWithoutMembersInput>
  }

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateWithoutMembershipsInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: UserTokenUpdateManyWithoutUserNestedInput
    ownedServers?: ServerUpdateManyWithoutOwnerNestedInput
    createdInvites?: ServerInviteUpdateManyWithoutCreatedByNestedInput
    bans?: BanUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutAuthorNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: UserTokenUncheckedUpdateManyWithoutUserNestedInput
    ownedServers?: ServerUncheckedUpdateManyWithoutOwnerNestedInput
    createdInvites?: ServerInviteUncheckedUpdateManyWithoutCreatedByNestedInput
    bans?: BanUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutAuthorNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ServerUpsertWithoutMembersInput = {
    update: XOR<ServerUpdateWithoutMembersInput, ServerUncheckedUpdateWithoutMembersInput>
    create: XOR<ServerCreateWithoutMembersInput, ServerUncheckedCreateWithoutMembersInput>
    where?: ServerWhereInput
  }

  export type ServerUpdateToOneWithWhereWithoutMembersInput = {
    where?: ServerWhereInput
    data: XOR<ServerUpdateWithoutMembersInput, ServerUncheckedUpdateWithoutMembersInput>
  }

  export type ServerUpdateWithoutMembersInput = {
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedServersNestedInput
    channels?: ChannelUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUpdateManyWithoutServerNestedInput
    bans?: BanUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateWithoutMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChannelUncheckedUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUncheckedUpdateManyWithoutServerNestedInput
    bans?: BanUncheckedUpdateManyWithoutServerNestedInput
  }

  export type ServerCreateWithoutChannelsInput = {
    name: string
    avatarUrl?: string | null
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedServersInput
    members?: ServerMemberCreateNestedManyWithoutServerInput
    invites?: ServerInviteCreateNestedManyWithoutServerInput
    bans?: BanCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateWithoutChannelsInput = {
    id?: number
    name: string
    avatarUrl?: string | null
    ownerId: number
    createdAt?: Date | string
    members?: ServerMemberUncheckedCreateNestedManyWithoutServerInput
    invites?: ServerInviteUncheckedCreateNestedManyWithoutServerInput
    bans?: BanUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerCreateOrConnectWithoutChannelsInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutChannelsInput, ServerUncheckedCreateWithoutChannelsInput>
  }

  export type MessageCreateWithoutChannelInput = {
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
    author: UserCreateNestedOneWithoutMessagesInput
    replyTo?: MessageCreateNestedOneWithoutRepliesInput
    replies?: MessageCreateNestedManyWithoutReplyToInput
    attachments?: AttachmentCreateNestedManyWithoutMessageInput
    reactions?: ReactionCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutChannelInput = {
    id?: number
    authorId: number
    replyToMessageId?: number | null
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMessageInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutChannelInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutChannelInput, MessageUncheckedCreateWithoutChannelInput>
  }

  export type MessageCreateManyChannelInputEnvelope = {
    data: MessageCreateManyChannelInput | MessageCreateManyChannelInput[]
    skipDuplicates?: boolean
  }

  export type AttachmentCreateWithoutChannelInput = {
    originalName: string
    type: $Enums.AttachmentType
    publicId: string
    url: string
    message: MessageCreateNestedOneWithoutAttachmentsInput
  }

  export type AttachmentUncheckedCreateWithoutChannelInput = {
    id?: number
    messageId: number
    originalName: string
    type: $Enums.AttachmentType
    publicId: string
    url: string
  }

  export type AttachmentCreateOrConnectWithoutChannelInput = {
    where: AttachmentWhereUniqueInput
    create: XOR<AttachmentCreateWithoutChannelInput, AttachmentUncheckedCreateWithoutChannelInput>
  }

  export type AttachmentCreateManyChannelInputEnvelope = {
    data: AttachmentCreateManyChannelInput | AttachmentCreateManyChannelInput[]
    skipDuplicates?: boolean
  }

  export type ServerUpsertWithoutChannelsInput = {
    update: XOR<ServerUpdateWithoutChannelsInput, ServerUncheckedUpdateWithoutChannelsInput>
    create: XOR<ServerCreateWithoutChannelsInput, ServerUncheckedCreateWithoutChannelsInput>
    where?: ServerWhereInput
  }

  export type ServerUpdateToOneWithWhereWithoutChannelsInput = {
    where?: ServerWhereInput
    data: XOR<ServerUpdateWithoutChannelsInput, ServerUncheckedUpdateWithoutChannelsInput>
  }

  export type ServerUpdateWithoutChannelsInput = {
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedServersNestedInput
    members?: ServerMemberUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUpdateManyWithoutServerNestedInput
    bans?: BanUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateWithoutChannelsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ServerMemberUncheckedUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUncheckedUpdateManyWithoutServerNestedInput
    bans?: BanUncheckedUpdateManyWithoutServerNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutChannelInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutChannelInput, MessageUncheckedUpdateWithoutChannelInput>
    create: XOR<MessageCreateWithoutChannelInput, MessageUncheckedCreateWithoutChannelInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutChannelInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutChannelInput, MessageUncheckedUpdateWithoutChannelInput>
  }

  export type MessageUpdateManyWithWhereWithoutChannelInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutChannelInput>
  }

  export type AttachmentUpsertWithWhereUniqueWithoutChannelInput = {
    where: AttachmentWhereUniqueInput
    update: XOR<AttachmentUpdateWithoutChannelInput, AttachmentUncheckedUpdateWithoutChannelInput>
    create: XOR<AttachmentCreateWithoutChannelInput, AttachmentUncheckedCreateWithoutChannelInput>
  }

  export type AttachmentUpdateWithWhereUniqueWithoutChannelInput = {
    where: AttachmentWhereUniqueInput
    data: XOR<AttachmentUpdateWithoutChannelInput, AttachmentUncheckedUpdateWithoutChannelInput>
  }

  export type AttachmentUpdateManyWithWhereWithoutChannelInput = {
    where: AttachmentScalarWhereInput
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyWithoutChannelInput>
  }

  export type AttachmentScalarWhereInput = {
    AND?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
    OR?: AttachmentScalarWhereInput[]
    NOT?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
    id?: IntFilter<"Attachment"> | number
    messageId?: IntFilter<"Attachment"> | number
    channelId?: IntFilter<"Attachment"> | number
    originalName?: StringFilter<"Attachment"> | string
    type?: EnumAttachmentTypeFilter<"Attachment"> | $Enums.AttachmentType
    publicId?: StringFilter<"Attachment"> | string
    url?: StringFilter<"Attachment"> | string
  }

  export type ServerCreateWithoutInvitesInput = {
    name: string
    avatarUrl?: string | null
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedServersInput
    members?: ServerMemberCreateNestedManyWithoutServerInput
    channels?: ChannelCreateNestedManyWithoutServerInput
    bans?: BanCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateWithoutInvitesInput = {
    id?: number
    name: string
    avatarUrl?: string | null
    ownerId: number
    createdAt?: Date | string
    members?: ServerMemberUncheckedCreateNestedManyWithoutServerInput
    channels?: ChannelUncheckedCreateNestedManyWithoutServerInput
    bans?: BanUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerCreateOrConnectWithoutInvitesInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutInvitesInput, ServerUncheckedCreateWithoutInvitesInput>
  }

  export type UserCreateWithoutCreatedInvitesInput = {
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tokens?: UserTokenCreateNestedManyWithoutUserInput
    memberships?: ServerMemberCreateNestedManyWithoutUserInput
    ownedServers?: ServerCreateNestedManyWithoutOwnerInput
    bans?: BanCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutAuthorInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedInvitesInput = {
    id?: number
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tokens?: UserTokenUncheckedCreateNestedManyWithoutUserInput
    memberships?: ServerMemberUncheckedCreateNestedManyWithoutUserInput
    ownedServers?: ServerUncheckedCreateNestedManyWithoutOwnerInput
    bans?: BanUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutAuthorInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedInvitesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedInvitesInput, UserUncheckedCreateWithoutCreatedInvitesInput>
  }

  export type ServerUpsertWithoutInvitesInput = {
    update: XOR<ServerUpdateWithoutInvitesInput, ServerUncheckedUpdateWithoutInvitesInput>
    create: XOR<ServerCreateWithoutInvitesInput, ServerUncheckedCreateWithoutInvitesInput>
    where?: ServerWhereInput
  }

  export type ServerUpdateToOneWithWhereWithoutInvitesInput = {
    where?: ServerWhereInput
    data: XOR<ServerUpdateWithoutInvitesInput, ServerUncheckedUpdateWithoutInvitesInput>
  }

  export type ServerUpdateWithoutInvitesInput = {
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedServersNestedInput
    members?: ServerMemberUpdateManyWithoutServerNestedInput
    channels?: ChannelUpdateManyWithoutServerNestedInput
    bans?: BanUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateWithoutInvitesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ServerMemberUncheckedUpdateManyWithoutServerNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutServerNestedInput
    bans?: BanUncheckedUpdateManyWithoutServerNestedInput
  }

  export type UserUpsertWithoutCreatedInvitesInput = {
    update: XOR<UserUpdateWithoutCreatedInvitesInput, UserUncheckedUpdateWithoutCreatedInvitesInput>
    create: XOR<UserCreateWithoutCreatedInvitesInput, UserUncheckedCreateWithoutCreatedInvitesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedInvitesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedInvitesInput, UserUncheckedUpdateWithoutCreatedInvitesInput>
  }

  export type UserUpdateWithoutCreatedInvitesInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: UserTokenUpdateManyWithoutUserNestedInput
    memberships?: ServerMemberUpdateManyWithoutUserNestedInput
    ownedServers?: ServerUpdateManyWithoutOwnerNestedInput
    bans?: BanUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutAuthorNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedInvitesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: UserTokenUncheckedUpdateManyWithoutUserNestedInput
    memberships?: ServerMemberUncheckedUpdateManyWithoutUserNestedInput
    ownedServers?: ServerUncheckedUpdateManyWithoutOwnerNestedInput
    bans?: BanUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutAuthorNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ChannelCreateWithoutMessagesInput = {
    name: string
    type: $Enums.ChannelType
    createdAt?: Date | string
    server: ServerCreateNestedOneWithoutChannelsInput
    attachments?: AttachmentCreateNestedManyWithoutChannelInput
  }

  export type ChannelUncheckedCreateWithoutMessagesInput = {
    id?: number
    name: string
    serverId: number
    type: $Enums.ChannelType
    createdAt?: Date | string
    attachments?: AttachmentUncheckedCreateNestedManyWithoutChannelInput
  }

  export type ChannelCreateOrConnectWithoutMessagesInput = {
    where: ChannelWhereUniqueInput
    create: XOR<ChannelCreateWithoutMessagesInput, ChannelUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutMessagesInput = {
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tokens?: UserTokenCreateNestedManyWithoutUserInput
    memberships?: ServerMemberCreateNestedManyWithoutUserInput
    ownedServers?: ServerCreateNestedManyWithoutOwnerInput
    createdInvites?: ServerInviteCreateNestedManyWithoutCreatedByInput
    bans?: BanCreateNestedManyWithoutUserInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMessagesInput = {
    id?: number
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tokens?: UserTokenUncheckedCreateNestedManyWithoutUserInput
    memberships?: ServerMemberUncheckedCreateNestedManyWithoutUserInput
    ownedServers?: ServerUncheckedCreateNestedManyWithoutOwnerInput
    createdInvites?: ServerInviteUncheckedCreateNestedManyWithoutCreatedByInput
    bans?: BanUncheckedCreateNestedManyWithoutUserInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
  }

  export type MessageCreateWithoutRepliesInput = {
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
    channel: ChannelCreateNestedOneWithoutMessagesInput
    author: UserCreateNestedOneWithoutMessagesInput
    replyTo?: MessageCreateNestedOneWithoutRepliesInput
    attachments?: AttachmentCreateNestedManyWithoutMessageInput
    reactions?: ReactionCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutRepliesInput = {
    id?: number
    channelId: number
    authorId: number
    replyToMessageId?: number | null
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMessageInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutRepliesInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutRepliesInput, MessageUncheckedCreateWithoutRepliesInput>
  }

  export type MessageCreateWithoutReplyToInput = {
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
    channel: ChannelCreateNestedOneWithoutMessagesInput
    author: UserCreateNestedOneWithoutMessagesInput
    replies?: MessageCreateNestedManyWithoutReplyToInput
    attachments?: AttachmentCreateNestedManyWithoutMessageInput
    reactions?: ReactionCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutReplyToInput = {
    id?: number
    channelId: number
    authorId: number
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMessageInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutReplyToInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutReplyToInput, MessageUncheckedCreateWithoutReplyToInput>
  }

  export type MessageCreateManyReplyToInputEnvelope = {
    data: MessageCreateManyReplyToInput | MessageCreateManyReplyToInput[]
    skipDuplicates?: boolean
  }

  export type AttachmentCreateWithoutMessageInput = {
    originalName: string
    type: $Enums.AttachmentType
    publicId: string
    url: string
    channel: ChannelCreateNestedOneWithoutAttachmentsInput
  }

  export type AttachmentUncheckedCreateWithoutMessageInput = {
    id?: number
    channelId: number
    originalName: string
    type: $Enums.AttachmentType
    publicId: string
    url: string
  }

  export type AttachmentCreateOrConnectWithoutMessageInput = {
    where: AttachmentWhereUniqueInput
    create: XOR<AttachmentCreateWithoutMessageInput, AttachmentUncheckedCreateWithoutMessageInput>
  }

  export type AttachmentCreateManyMessageInputEnvelope = {
    data: AttachmentCreateManyMessageInput | AttachmentCreateManyMessageInput[]
    skipDuplicates?: boolean
  }

  export type ReactionCreateWithoutMessageInput = {
    emoji: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutReactionsInput
  }

  export type ReactionUncheckedCreateWithoutMessageInput = {
    id?: number
    userId: number
    emoji: string
    createdAt?: Date | string
  }

  export type ReactionCreateOrConnectWithoutMessageInput = {
    where: ReactionWhereUniqueInput
    create: XOR<ReactionCreateWithoutMessageInput, ReactionUncheckedCreateWithoutMessageInput>
  }

  export type ReactionCreateManyMessageInputEnvelope = {
    data: ReactionCreateManyMessageInput | ReactionCreateManyMessageInput[]
    skipDuplicates?: boolean
  }

  export type ChannelUpsertWithoutMessagesInput = {
    update: XOR<ChannelUpdateWithoutMessagesInput, ChannelUncheckedUpdateWithoutMessagesInput>
    create: XOR<ChannelCreateWithoutMessagesInput, ChannelUncheckedCreateWithoutMessagesInput>
    where?: ChannelWhereInput
  }

  export type ChannelUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ChannelWhereInput
    data: XOR<ChannelUpdateWithoutMessagesInput, ChannelUncheckedUpdateWithoutMessagesInput>
  }

  export type ChannelUpdateWithoutMessagesInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    server?: ServerUpdateOneRequiredWithoutChannelsNestedInput
    attachments?: AttachmentUpdateManyWithoutChannelNestedInput
  }

  export type ChannelUncheckedUpdateWithoutMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    serverId?: IntFieldUpdateOperationsInput | number
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: AttachmentUncheckedUpdateManyWithoutChannelNestedInput
  }

  export type UserUpsertWithoutMessagesInput = {
    update: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateWithoutMessagesInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: UserTokenUpdateManyWithoutUserNestedInput
    memberships?: ServerMemberUpdateManyWithoutUserNestedInput
    ownedServers?: ServerUpdateManyWithoutOwnerNestedInput
    createdInvites?: ServerInviteUpdateManyWithoutCreatedByNestedInput
    bans?: BanUpdateManyWithoutUserNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: UserTokenUncheckedUpdateManyWithoutUserNestedInput
    memberships?: ServerMemberUncheckedUpdateManyWithoutUserNestedInput
    ownedServers?: ServerUncheckedUpdateManyWithoutOwnerNestedInput
    createdInvites?: ServerInviteUncheckedUpdateManyWithoutCreatedByNestedInput
    bans?: BanUncheckedUpdateManyWithoutUserNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MessageUpsertWithoutRepliesInput = {
    update: XOR<MessageUpdateWithoutRepliesInput, MessageUncheckedUpdateWithoutRepliesInput>
    create: XOR<MessageCreateWithoutRepliesInput, MessageUncheckedCreateWithoutRepliesInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutRepliesInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutRepliesInput, MessageUncheckedUpdateWithoutRepliesInput>
  }

  export type MessageUpdateWithoutRepliesInput = {
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
    channel?: ChannelUpdateOneRequiredWithoutMessagesNestedInput
    author?: UserUpdateOneRequiredWithoutMessagesNestedInput
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput
    attachments?: AttachmentUpdateManyWithoutMessageNestedInput
    reactions?: ReactionUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutRepliesInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    replyToMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: AttachmentUncheckedUpdateManyWithoutMessageNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutReplyToInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutReplyToInput, MessageUncheckedUpdateWithoutReplyToInput>
    create: XOR<MessageCreateWithoutReplyToInput, MessageUncheckedCreateWithoutReplyToInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutReplyToInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutReplyToInput, MessageUncheckedUpdateWithoutReplyToInput>
  }

  export type MessageUpdateManyWithWhereWithoutReplyToInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutReplyToInput>
  }

  export type AttachmentUpsertWithWhereUniqueWithoutMessageInput = {
    where: AttachmentWhereUniqueInput
    update: XOR<AttachmentUpdateWithoutMessageInput, AttachmentUncheckedUpdateWithoutMessageInput>
    create: XOR<AttachmentCreateWithoutMessageInput, AttachmentUncheckedCreateWithoutMessageInput>
  }

  export type AttachmentUpdateWithWhereUniqueWithoutMessageInput = {
    where: AttachmentWhereUniqueInput
    data: XOR<AttachmentUpdateWithoutMessageInput, AttachmentUncheckedUpdateWithoutMessageInput>
  }

  export type AttachmentUpdateManyWithWhereWithoutMessageInput = {
    where: AttachmentScalarWhereInput
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyWithoutMessageInput>
  }

  export type ReactionUpsertWithWhereUniqueWithoutMessageInput = {
    where: ReactionWhereUniqueInput
    update: XOR<ReactionUpdateWithoutMessageInput, ReactionUncheckedUpdateWithoutMessageInput>
    create: XOR<ReactionCreateWithoutMessageInput, ReactionUncheckedCreateWithoutMessageInput>
  }

  export type ReactionUpdateWithWhereUniqueWithoutMessageInput = {
    where: ReactionWhereUniqueInput
    data: XOR<ReactionUpdateWithoutMessageInput, ReactionUncheckedUpdateWithoutMessageInput>
  }

  export type ReactionUpdateManyWithWhereWithoutMessageInput = {
    where: ReactionScalarWhereInput
    data: XOR<ReactionUpdateManyMutationInput, ReactionUncheckedUpdateManyWithoutMessageInput>
  }

  export type MessageCreateWithoutAttachmentsInput = {
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
    channel: ChannelCreateNestedOneWithoutMessagesInput
    author: UserCreateNestedOneWithoutMessagesInput
    replyTo?: MessageCreateNestedOneWithoutRepliesInput
    replies?: MessageCreateNestedManyWithoutReplyToInput
    reactions?: ReactionCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutAttachmentsInput = {
    id?: number
    channelId: number
    authorId: number
    replyToMessageId?: number | null
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutAttachmentsInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutAttachmentsInput, MessageUncheckedCreateWithoutAttachmentsInput>
  }

  export type ChannelCreateWithoutAttachmentsInput = {
    name: string
    type: $Enums.ChannelType
    createdAt?: Date | string
    server: ServerCreateNestedOneWithoutChannelsInput
    messages?: MessageCreateNestedManyWithoutChannelInput
  }

  export type ChannelUncheckedCreateWithoutAttachmentsInput = {
    id?: number
    name: string
    serverId: number
    type: $Enums.ChannelType
    createdAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutChannelInput
  }

  export type ChannelCreateOrConnectWithoutAttachmentsInput = {
    where: ChannelWhereUniqueInput
    create: XOR<ChannelCreateWithoutAttachmentsInput, ChannelUncheckedCreateWithoutAttachmentsInput>
  }

  export type MessageUpsertWithoutAttachmentsInput = {
    update: XOR<MessageUpdateWithoutAttachmentsInput, MessageUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<MessageCreateWithoutAttachmentsInput, MessageUncheckedCreateWithoutAttachmentsInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutAttachmentsInput, MessageUncheckedUpdateWithoutAttachmentsInput>
  }

  export type MessageUpdateWithoutAttachmentsInput = {
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
    channel?: ChannelUpdateOneRequiredWithoutMessagesNestedInput
    author?: UserUpdateOneRequiredWithoutMessagesNestedInput
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput
    replies?: MessageUpdateManyWithoutReplyToNestedInput
    reactions?: ReactionUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutAttachmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    replyToMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type ChannelUpsertWithoutAttachmentsInput = {
    update: XOR<ChannelUpdateWithoutAttachmentsInput, ChannelUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<ChannelCreateWithoutAttachmentsInput, ChannelUncheckedCreateWithoutAttachmentsInput>
    where?: ChannelWhereInput
  }

  export type ChannelUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: ChannelWhereInput
    data: XOR<ChannelUpdateWithoutAttachmentsInput, ChannelUncheckedUpdateWithoutAttachmentsInput>
  }

  export type ChannelUpdateWithoutAttachmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    server?: ServerUpdateOneRequiredWithoutChannelsNestedInput
    messages?: MessageUpdateManyWithoutChannelNestedInput
  }

  export type ChannelUncheckedUpdateWithoutAttachmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    serverId?: IntFieldUpdateOperationsInput | number
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutChannelNestedInput
  }

  export type UserCreateWithoutReactionsInput = {
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tokens?: UserTokenCreateNestedManyWithoutUserInput
    memberships?: ServerMemberCreateNestedManyWithoutUserInput
    ownedServers?: ServerCreateNestedManyWithoutOwnerInput
    createdInvites?: ServerInviteCreateNestedManyWithoutCreatedByInput
    bans?: BanCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutReactionsInput = {
    id?: number
    email: string
    username: string
    passwordHash: string
    avatarUrl?: string | null
    bio?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tokens?: UserTokenUncheckedCreateNestedManyWithoutUserInput
    memberships?: ServerMemberUncheckedCreateNestedManyWithoutUserInput
    ownedServers?: ServerUncheckedCreateNestedManyWithoutOwnerInput
    createdInvites?: ServerInviteUncheckedCreateNestedManyWithoutCreatedByInput
    bans?: BanUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutReactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReactionsInput, UserUncheckedCreateWithoutReactionsInput>
  }

  export type MessageCreateWithoutReactionsInput = {
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
    channel: ChannelCreateNestedOneWithoutMessagesInput
    author: UserCreateNestedOneWithoutMessagesInput
    replyTo?: MessageCreateNestedOneWithoutRepliesInput
    replies?: MessageCreateNestedManyWithoutReplyToInput
    attachments?: AttachmentCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutReactionsInput = {
    id?: number
    channelId: number
    authorId: number
    replyToMessageId?: number | null
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutReactionsInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutReactionsInput, MessageUncheckedCreateWithoutReactionsInput>
  }

  export type UserUpsertWithoutReactionsInput = {
    update: XOR<UserUpdateWithoutReactionsInput, UserUncheckedUpdateWithoutReactionsInput>
    create: XOR<UserCreateWithoutReactionsInput, UserUncheckedCreateWithoutReactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReactionsInput, UserUncheckedUpdateWithoutReactionsInput>
  }

  export type UserUpdateWithoutReactionsInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: UserTokenUpdateManyWithoutUserNestedInput
    memberships?: ServerMemberUpdateManyWithoutUserNestedInput
    ownedServers?: ServerUpdateManyWithoutOwnerNestedInput
    createdInvites?: ServerInviteUpdateManyWithoutCreatedByNestedInput
    bans?: BanUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutReactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: UserTokenUncheckedUpdateManyWithoutUserNestedInput
    memberships?: ServerMemberUncheckedUpdateManyWithoutUserNestedInput
    ownedServers?: ServerUncheckedUpdateManyWithoutOwnerNestedInput
    createdInvites?: ServerInviteUncheckedUpdateManyWithoutCreatedByNestedInput
    bans?: BanUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type MessageUpsertWithoutReactionsInput = {
    update: XOR<MessageUpdateWithoutReactionsInput, MessageUncheckedUpdateWithoutReactionsInput>
    create: XOR<MessageCreateWithoutReactionsInput, MessageUncheckedCreateWithoutReactionsInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutReactionsInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutReactionsInput, MessageUncheckedUpdateWithoutReactionsInput>
  }

  export type MessageUpdateWithoutReactionsInput = {
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
    channel?: ChannelUpdateOneRequiredWithoutMessagesNestedInput
    author?: UserUpdateOneRequiredWithoutMessagesNestedInput
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput
    replies?: MessageUpdateManyWithoutReplyToNestedInput
    attachments?: AttachmentUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutReactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    replyToMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type UserTokenCreateManyUserInput = {
    id?: number
    token: string
    type: $Enums.VerifyTokenType
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type ServerMemberCreateManyUserInput = {
    id?: number
    serverId: number
    role?: $Enums.MemberRole
    joinedAt?: Date | string
  }

  export type ServerCreateManyOwnerInput = {
    id?: number
    name: string
    avatarUrl?: string | null
    createdAt?: Date | string
  }

  export type ServerInviteCreateManyCreatedByInput = {
    id?: number
    code: string
    serverId: number
    maxUses?: number | null
    currentUses?: number
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BanCreateManyUserInput = {
    id?: number
    serverId: number
    bannedByRole: $Enums.MemberRole
    reason?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    appealStatus: $Enums.BanAppealStatus
  }

  export type MessageCreateManyAuthorInput = {
    id?: number
    channelId: number
    replyToMessageId?: number | null
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
  }

  export type ReactionCreateManyUserInput = {
    id?: number
    messageId: number
    emoji: string
    createdAt?: Date | string
  }

  export type UserTokenUpdateWithoutUserInput = {
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumVerifyTokenTypeFieldUpdateOperationsInput | $Enums.VerifyTokenType
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTokenUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumVerifyTokenTypeFieldUpdateOperationsInput | $Enums.VerifyTokenType
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTokenUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumVerifyTokenTypeFieldUpdateOperationsInput | $Enums.VerifyTokenType
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerMemberUpdateWithoutUserInput = {
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    server?: ServerUpdateOneRequiredWithoutMembersNestedInput
  }

  export type ServerMemberUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    serverId?: IntFieldUpdateOperationsInput | number
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerMemberUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    serverId?: IntFieldUpdateOperationsInput | number
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerUpdateWithoutOwnerInput = {
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ServerMemberUpdateManyWithoutServerNestedInput
    channels?: ChannelUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUpdateManyWithoutServerNestedInput
    bans?: BanUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ServerMemberUncheckedUpdateManyWithoutServerNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutServerNestedInput
    invites?: ServerInviteUncheckedUpdateManyWithoutServerNestedInput
    bans?: BanUncheckedUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateManyWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerInviteUpdateWithoutCreatedByInput = {
    code?: StringFieldUpdateOperationsInput | string
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    server?: ServerUpdateOneRequiredWithoutInvitesNestedInput
  }

  export type ServerInviteUncheckedUpdateWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    serverId?: IntFieldUpdateOperationsInput | number
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerInviteUncheckedUpdateManyWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    serverId?: IntFieldUpdateOperationsInput | number
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BanUpdateWithoutUserInput = {
    bannedByRole?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appealStatus?: EnumBanAppealStatusFieldUpdateOperationsInput | $Enums.BanAppealStatus
    server?: ServerUpdateOneRequiredWithoutBansNestedInput
  }

  export type BanUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    serverId?: IntFieldUpdateOperationsInput | number
    bannedByRole?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appealStatus?: EnumBanAppealStatusFieldUpdateOperationsInput | $Enums.BanAppealStatus
  }

  export type BanUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    serverId?: IntFieldUpdateOperationsInput | number
    bannedByRole?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appealStatus?: EnumBanAppealStatusFieldUpdateOperationsInput | $Enums.BanAppealStatus
  }

  export type MessageUpdateWithoutAuthorInput = {
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
    channel?: ChannelUpdateOneRequiredWithoutMessagesNestedInput
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput
    replies?: MessageUpdateManyWithoutReplyToNestedInput
    attachments?: AttachmentUpdateManyWithoutMessageNestedInput
    reactions?: ReactionUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    replyToMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutMessageNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    replyToMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReactionUpdateWithoutUserInput = {
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Message?: MessageUpdateOneRequiredWithoutReactionsNestedInput
  }

  export type ReactionUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    messageId?: IntFieldUpdateOperationsInput | number
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReactionUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    messageId?: IntFieldUpdateOperationsInput | number
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerMemberCreateManyServerInput = {
    id?: number
    userId: number
    role?: $Enums.MemberRole
    joinedAt?: Date | string
  }

  export type ChannelCreateManyServerInput = {
    id?: number
    name: string
    type: $Enums.ChannelType
    createdAt?: Date | string
  }

  export type ServerInviteCreateManyServerInput = {
    id?: number
    code: string
    maxUses?: number | null
    currentUses?: number
    expiresAt?: Date | string | null
    createdById: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BanCreateManyServerInput = {
    id?: number
    userId: number
    bannedByRole: $Enums.MemberRole
    reason?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    appealStatus: $Enums.BanAppealStatus
  }

  export type ServerMemberUpdateWithoutServerInput = {
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type ServerMemberUncheckedUpdateWithoutServerInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerMemberUncheckedUpdateManyWithoutServerInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelUpdateWithoutServerInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutChannelNestedInput
    attachments?: AttachmentUpdateManyWithoutChannelNestedInput
  }

  export type ChannelUncheckedUpdateWithoutServerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutChannelNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutChannelNestedInput
  }

  export type ChannelUncheckedUpdateManyWithoutServerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerInviteUpdateWithoutServerInput = {
    code?: StringFieldUpdateOperationsInput | string
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedInvitesNestedInput
  }

  export type ServerInviteUncheckedUpdateWithoutServerInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerInviteUncheckedUpdateManyWithoutServerInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    currentUses?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BanUpdateWithoutServerInput = {
    bannedByRole?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appealStatus?: EnumBanAppealStatusFieldUpdateOperationsInput | $Enums.BanAppealStatus
    user?: UserUpdateOneRequiredWithoutBansNestedInput
  }

  export type BanUncheckedUpdateWithoutServerInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    bannedByRole?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appealStatus?: EnumBanAppealStatusFieldUpdateOperationsInput | $Enums.BanAppealStatus
  }

  export type BanUncheckedUpdateManyWithoutServerInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    bannedByRole?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appealStatus?: EnumBanAppealStatusFieldUpdateOperationsInput | $Enums.BanAppealStatus
  }

  export type MessageCreateManyChannelInput = {
    id?: number
    authorId: number
    replyToMessageId?: number | null
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
  }

  export type AttachmentCreateManyChannelInput = {
    id?: number
    messageId: number
    originalName: string
    type: $Enums.AttachmentType
    publicId: string
    url: string
  }

  export type MessageUpdateWithoutChannelInput = {
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
    author?: UserUpdateOneRequiredWithoutMessagesNestedInput
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput
    replies?: MessageUpdateManyWithoutReplyToNestedInput
    attachments?: AttachmentUpdateManyWithoutMessageNestedInput
    reactions?: ReactionUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutChannelInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    replyToMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutMessageNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateManyWithoutChannelInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    replyToMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AttachmentUpdateWithoutChannelInput = {
    originalName?: StringFieldUpdateOperationsInput | string
    type?: EnumAttachmentTypeFieldUpdateOperationsInput | $Enums.AttachmentType
    publicId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    message?: MessageUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateWithoutChannelInput = {
    id?: IntFieldUpdateOperationsInput | number
    messageId?: IntFieldUpdateOperationsInput | number
    originalName?: StringFieldUpdateOperationsInput | string
    type?: EnumAttachmentTypeFieldUpdateOperationsInput | $Enums.AttachmentType
    publicId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type AttachmentUncheckedUpdateManyWithoutChannelInput = {
    id?: IntFieldUpdateOperationsInput | number
    messageId?: IntFieldUpdateOperationsInput | number
    originalName?: StringFieldUpdateOperationsInput | string
    type?: EnumAttachmentTypeFieldUpdateOperationsInput | $Enums.AttachmentType
    publicId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type MessageCreateManyReplyToInput = {
    id?: number
    channelId: number
    authorId: number
    content?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    replyToDeleted?: boolean
    clientMsgId?: string | null
  }

  export type AttachmentCreateManyMessageInput = {
    id?: number
    channelId: number
    originalName: string
    type: $Enums.AttachmentType
    publicId: string
    url: string
  }

  export type ReactionCreateManyMessageInput = {
    id?: number
    userId: number
    emoji: string
    createdAt?: Date | string
  }

  export type MessageUpdateWithoutReplyToInput = {
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
    channel?: ChannelUpdateOneRequiredWithoutMessagesNestedInput
    author?: UserUpdateOneRequiredWithoutMessagesNestedInput
    replies?: MessageUpdateManyWithoutReplyToNestedInput
    attachments?: AttachmentUpdateManyWithoutMessageNestedInput
    reactions?: ReactionUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutReplyToInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutMessageNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateManyWithoutReplyToInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replyToDeleted?: BoolFieldUpdateOperationsInput | boolean
    clientMsgId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AttachmentUpdateWithoutMessageInput = {
    originalName?: StringFieldUpdateOperationsInput | string
    type?: EnumAttachmentTypeFieldUpdateOperationsInput | $Enums.AttachmentType
    publicId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    channel?: ChannelUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateWithoutMessageInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    originalName?: StringFieldUpdateOperationsInput | string
    type?: EnumAttachmentTypeFieldUpdateOperationsInput | $Enums.AttachmentType
    publicId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type AttachmentUncheckedUpdateManyWithoutMessageInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    originalName?: StringFieldUpdateOperationsInput | string
    type?: EnumAttachmentTypeFieldUpdateOperationsInput | $Enums.AttachmentType
    publicId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type ReactionUpdateWithoutMessageInput = {
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReactionsNestedInput
  }

  export type ReactionUncheckedUpdateWithoutMessageInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReactionUncheckedUpdateManyWithoutMessageInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
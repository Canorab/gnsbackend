import { ObjectId } from "mongodb";
import { z } from "zod";
export declare const userRegSchema: z.ZodObject<{
    body: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        username: z.ZodString;
        password: z.ZodString;
        email: z.ZodString;
        wallet: z.ZodString;
        referrerId: z.ZodOptional<z.ZodString>;
        referrerUsername: z.ZodString;
        roles: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        terms: z.ZodDefault<z.ZodBoolean>;
        active: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
        email: string;
        wallet: string;
        referrerUsername: string;
        roles: string[];
        terms: boolean;
        active: boolean;
        referrerId?: string | undefined;
    }, {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
        email: string;
        wallet: string;
        referrerUsername: string;
        referrerId?: string | undefined;
        roles?: string[] | undefined;
        terms?: boolean | undefined;
        active?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
        email: string;
        wallet: string;
        referrerUsername: string;
        roles: string[];
        terms: boolean;
        active: boolean;
        referrerId?: string | undefined;
    };
}, {
    body: {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
        email: string;
        wallet: string;
        referrerUsername: string;
        referrerId?: string | undefined;
        roles?: string[] | undefined;
        terms?: boolean | undefined;
        active?: boolean | undefined;
    };
}>;
export type UserType = z.infer<typeof userRegSchema>;
export declare const userLoginSchema: z.ZodObject<{
    body: z.ZodObject<{
        username: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        username: string;
        password: string;
    }, {
        username: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        username: string;
        password: string;
    };
}, {
    body: {
        username: string;
        password: string;
    };
}>;
export type LoginType = z.infer<typeof userLoginSchema>;
export declare const userUpdateSchema: z.ZodObject<{
    body: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        username: z.ZodString;
        password: z.ZodOptional<z.ZodString>;
        active: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        username: string;
        active: boolean;
        id?: string | undefined;
        password?: string | undefined;
    }, {
        username: string;
        id?: string | undefined;
        password?: string | undefined;
        active?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        username: string;
        active: boolean;
        id?: string | undefined;
        password?: string | undefined;
    };
}, {
    body: {
        username: string;
        id?: string | undefined;
        password?: string | undefined;
        active?: boolean | undefined;
    };
}>;
export type UserUpdateType = z.infer<typeof userUpdateSchema>;
export declare const userDeleteSchema: z.ZodObject<{
    body: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        id: string;
    };
}, {
    body: {
        id: string;
    };
}>;
export type UserDeleteType = z.infer<typeof userDeleteSchema>;
export declare const getUserSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        wallet: z.ZodString;
        username: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        username: string;
        wallet: string;
    }, {
        username: string;
        wallet: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        username: string;
        wallet: string;
    };
    params: {
        id: string;
    };
}, {
    body: {
        username: string;
        wallet: string;
    };
    params: {
        id: string;
    };
}>;
export type GetUserType = z.infer<typeof getUserSchema>;
declare const domainCreateSchema: z.ZodObject<{
    body: z.ZodObject<{
        userId: z.ZodType<ObjectId, z.ZodTypeDef, ObjectId>;
        firstName: z.ZodString;
        lastName: z.ZodString;
        username: z.ZodString;
        name: z.ZodString;
        image_url: z.ZodString;
        wallet: z.ZodString;
        data: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
            image_url: z.ZodString;
            identifier: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            image_url: string;
            description: string;
            identifier: string;
        }, {
            name: string;
            image_url: string;
            description: string;
            identifier: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: {
            name: string;
            image_url: string;
            description: string;
            identifier: string;
        };
        firstName: string;
        lastName: string;
        username: string;
        wallet: string;
        userId: ObjectId;
        name: string;
        image_url: string;
    }, {
        data: {
            name: string;
            image_url: string;
            description: string;
            identifier: string;
        };
        firstName: string;
        lastName: string;
        username: string;
        wallet: string;
        userId: ObjectId;
        name: string;
        image_url: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        data: {
            name: string;
            image_url: string;
            description: string;
            identifier: string;
        };
        firstName: string;
        lastName: string;
        username: string;
        wallet: string;
        userId: ObjectId;
        name: string;
        image_url: string;
    };
}, {
    body: {
        data: {
            name: string;
            image_url: string;
            description: string;
            identifier: string;
        };
        firstName: string;
        lastName: string;
        username: string;
        wallet: string;
        userId: ObjectId;
        name: string;
        image_url: string;
    };
}>;
export type domainCreateType = z.infer<typeof domainCreateSchema>;
export declare const domainSchema: z.ZodObject<{
    userId: z.ZodType<ObjectId, z.ZodTypeDef, ObjectId>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    username: z.ZodString;
    name: z.ZodString;
    image_url: z.ZodString;
    wallet: z.ZodString;
    data: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        image_url: z.ZodString;
        identifier: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        image_url: string;
        description: string;
        identifier: string;
    }, {
        name: string;
        image_url: string;
        description: string;
        identifier: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        image_url: string;
        description: string;
        identifier: string;
    };
    firstName: string;
    lastName: string;
    username: string;
    wallet: string;
    userId: ObjectId;
    name: string;
    image_url: string;
}, {
    data: {
        name: string;
        image_url: string;
        description: string;
        identifier: string;
    };
    firstName: string;
    lastName: string;
    username: string;
    wallet: string;
    userId: ObjectId;
    name: string;
    image_url: string;
}>;
export type domainSchemaType = z.infer<typeof domainSchema>;
export declare const getUserDomainsSchema: z.ZodObject<{
    body: z.ZodObject<{
        userId: z.ZodType<ObjectId, z.ZodTypeDef, ObjectId>;
        wallet: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        wallet: string;
        userId: ObjectId;
    }, {
        wallet: string;
        userId: ObjectId;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        wallet: string;
        userId: ObjectId;
    };
}, {
    body: {
        wallet: string;
        userId: ObjectId;
    };
}>;
export type GetUserDomainsType = z.infer<typeof getUserDomainsSchema>;
export declare const fetchDomainsSchema: z.ZodObject<{
    body: z.ZodObject<{
        wallet: z.ZodString;
        slug: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        wallet: string;
        slug: string;
    }, {
        wallet: string;
        slug: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        wallet: string;
        slug: string;
    };
}, {
    body: {
        wallet: string;
        slug: string;
    };
}>;
export type fetchDomainsSchemaType = z.infer<typeof fetchDomainsSchema>;
export declare const nftSchema: z.ZodObject<{
    name: z.ZodString;
    identifier: z.ZodString;
    collection: z.ZodString;
    contract: z.ZodString;
    token_standard: z.ZodString;
    description: z.ZodString;
    image_url: z.ZodString;
    metadata_url: z.ZodString;
    opensea_url: z.ZodString;
    updated_at: z.ZodString;
    is_disabled: z.ZodDefault<z.ZodBoolean>;
    is_nsfw: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    image_url: string;
    description: string;
    identifier: string;
    collection: string;
    contract: string;
    token_standard: string;
    metadata_url: string;
    opensea_url: string;
    updated_at: string;
    is_disabled: boolean;
    is_nsfw: boolean;
}, {
    name: string;
    image_url: string;
    description: string;
    identifier: string;
    collection: string;
    contract: string;
    token_standard: string;
    metadata_url: string;
    opensea_url: string;
    updated_at: string;
    is_disabled?: boolean | undefined;
    is_nsfw?: boolean | undefined;
}>;
export type nftSchemaType = z.infer<typeof nftSchema>;
export declare const nftListSchema: z.ZodObject<{
    nfts: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        collection: z.ZodString;
        contract: z.ZodString;
        token_standard: z.ZodString;
        description: z.ZodString;
        image_url: z.ZodString;
        metadata_url: z.ZodString;
        opensea_url: z.ZodString;
        updated_at: z.ZodString;
        is_disabled: z.ZodDefault<z.ZodBoolean>;
        is_nsfw: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        image_url: string;
        description: string;
        identifier: string;
        collection: string;
        contract: string;
        token_standard: string;
        metadata_url: string;
        opensea_url: string;
        updated_at: string;
        is_disabled: boolean;
        is_nsfw: boolean;
    }, {
        name: string;
        image_url: string;
        description: string;
        identifier: string;
        collection: string;
        contract: string;
        token_standard: string;
        metadata_url: string;
        opensea_url: string;
        updated_at: string;
        is_disabled?: boolean | undefined;
        is_nsfw?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    nfts: {
        name: string;
        image_url: string;
        description: string;
        identifier: string;
        collection: string;
        contract: string;
        token_standard: string;
        metadata_url: string;
        opensea_url: string;
        updated_at: string;
        is_disabled: boolean;
        is_nsfw: boolean;
    }[];
}, {
    nfts: {
        name: string;
        image_url: string;
        description: string;
        identifier: string;
        collection: string;
        contract: string;
        token_standard: string;
        metadata_url: string;
        opensea_url: string;
        updated_at: string;
        is_disabled?: boolean | undefined;
        is_nsfw?: boolean | undefined;
    }[];
}>;
export type nftListSchemaType = z.infer<typeof nftListSchema>;
export {};

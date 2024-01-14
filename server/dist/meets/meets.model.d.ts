import * as mongoose from 'mongoose';
export declare const MeetsSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    organizationId: string;
    ownerId: string;
    joinedUsers: any[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    organizationId: string;
    ownerId: string;
    joinedUsers: any[];
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    organizationId: string;
    ownerId: string;
    joinedUsers: any[];
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export interface Meets extends mongoose.Document {
    _id: string;
    name: string;
    organizationId: string;
    ownerId: string;
    joinedUsers: Array<any>;
}

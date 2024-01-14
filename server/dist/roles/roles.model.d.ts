import * as mongoose from 'mongoose';
export declare const RoleSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    roleId: number;
    roleName: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    roleId: number;
    roleName: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    roleId: number;
    roleName: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export interface Role extends mongoose.Document {
    _id: string;
    roleId: number;
    roleName: string;
}

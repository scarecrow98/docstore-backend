import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/users/schemas/user.schema";
import * as mongoose from 'mongoose';

export type ProjectDocument = Project & mongoose.Document;

@Schema()
export class Project {
    @Prop({ required: true })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    createdBy: User;

    @Prop({ default: Date.now })
    registeredAt?: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
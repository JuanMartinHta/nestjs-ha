import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'profiles' })
export class ProfileDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  bio: string;

  @Prop({ required: true })
  userId: string;
}

export const ProfileSchema = SchemaFactory.createForClass(ProfileDocument);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'auth_sessions' })
export class AuthSessionDocument extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  refreshToken: string;

  @Prop({ required: true })
  expiresIn: number;

  @Prop({ required: true })
  refreshExpiresIn: number;
}

export const AuthSessionSchema =
  SchemaFactory.createForClass(AuthSessionDocument);

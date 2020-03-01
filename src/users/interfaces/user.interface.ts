import { Document } from 'mongoose';

export interface User extends Document {
  readonly email: string;
  readonly url?: string;
  readonly password?: string;
}

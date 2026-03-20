import mongoose, { Document, Schema } from 'mongoose';

export interface IOTP extends Document {
  phone: string;
  otp: string;
  expiresAt: Date;
}

const OTPSchema = new Schema<IOTP>({
  phone: { type: String, required: true, unique: true, index: true },
  otp:   { type: String, required: true },
  // TTL index: MongoDB automatically deletes the document after expiresAt
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export const OTPModel =
  (mongoose.models.OTP as mongoose.Model<IOTP>) ||
  mongoose.model<IOTP>('OTP', OTPSchema);

import { connectDB } from './mongodb';
import { UserModel } from './models/User';
import { OTPModel } from './models/OTP';

export interface User {
  id: string; // Map _id.toString() to id for backward compatibility
  name: string;
  email?: string;
  phone?: string;
  passwordHash?: string;
  isAdmin?: boolean;
}

export interface OTPEntry {
  otp: string;
  expiresAt: number;
}

function hashPassword(password: string): string {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(password).digest('hex');
}

export const authDb = {
  async getUserByEmail(email: string): Promise<User | undefined> {
    await connectDB();
    const normalizedEmail = email.trim().toLowerCase();
    const userDoc = await UserModel.findOne({ email: normalizedEmail });
    
    if (userDoc) {
      console.log(`[authDb] getUserByEmail("${email}"): ✅ FOUND`);
      return {
        id: (userDoc._id as any).toString(),
        name: userDoc.name,
        email: userDoc.email,
        phone: userDoc.phone,
        passwordHash: userDoc.passwordHash,
        isAdmin: userDoc.isAdmin,
      };
    }
    console.log(`[authDb] getUserByEmail("${email}"): ❌ NOT FOUND`);
    return undefined;
  },

  async getUserByPhone(phone: string): Promise<User | undefined> {
    await connectDB();
    const userDoc = await UserModel.findOne({ phone: phone.trim() });
    
    if (userDoc) {
      console.log(`[authDb] getUserByPhone("${phone}"): ✅ FOUND`);
      return {
        id: (userDoc._id as any).toString(),
        name: userDoc.name,
        email: userDoc.email,
        phone: userDoc.phone,
        passwordHash: userDoc.passwordHash,
        isAdmin: userDoc.isAdmin,
      };
    }
    console.log(`[authDb] getUserByPhone("${phone}"): ❌ NOT FOUND`);
    return undefined;
  },

  async createUser(user: Partial<User>): Promise<User> {
    await connectDB();
    
    // Check if user has an id or use generated one
    const newUserDoc = await UserModel.create({
      name: user.name,
      email: user.email?.trim().toLowerCase(),
      phone: user.phone?.trim(),
      passwordHash: user.passwordHash,
      isAdmin: user.isAdmin || false,
    });

    console.log(`[authDb] ✅ User created in MongoDB: ${newUserDoc.email || newUserDoc.phone}`);
    
    return {
      id: (newUserDoc._id as any).toString(),
      name: newUserDoc.name,
      email: newUserDoc.email,
      phone: newUserDoc.phone,
      passwordHash: newUserDoc.passwordHash,
      isAdmin: newUserDoc.isAdmin,
    };
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    await connectDB();
    
    const userDoc = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: updates.name,
          email: updates.email?.trim().toLowerCase(),
          phone: updates.phone?.trim(),
          passwordHash: updates.passwordHash,
          isAdmin: updates.isAdmin,
        }
      },
      { new: true }
    );

    if (userDoc) {
      return {
        id: (userDoc._id as any).toString(),
        name: userDoc.name,
        email: userDoc.email,
        phone: userDoc.phone,
        passwordHash: userDoc.passwordHash,
        isAdmin: userDoc.isAdmin,
      };
    }
    return undefined;
  },

  // OTP operations
  async setOTP(phone: string, otp: string, expiresAt: number): Promise<void> {
    await connectDB();
    
    // Upsert OTP
    await OTPModel.findOneAndUpdate(
      { phone: phone.trim() },
      { 
        otp, 
        expiresAt: new Date(expiresAt) 
      },
      { upsert: true, new: true }
    );
    
    console.log(`[authDb] OTP saved to MongoDB for ${phone}: ${otp}`);
  },

  async getOTP(phone: string): Promise<OTPEntry | undefined> {
    await connectDB();
    const otpDoc = await OTPModel.findOne({ phone: phone.trim() });
    
    if (otpDoc) {
      // Check if expired (Mongoose TTL should handle this but manual check is safer)
      if (otpDoc.expiresAt.getTime() > Date.now()) {
         return {
          otp: otpDoc.otp,
          expiresAt: otpDoc.expiresAt.getTime(),
        };
      }
      // If manually expired, delete it
      await OTPModel.deleteOne({ _id: otpDoc._id });
    }
    return undefined;
  },

  async deleteOTP(phone: string): Promise<void> {
    await connectDB();
    await OTPModel.deleteOne({ phone: phone.trim() });
  },

  hashPassword,
};

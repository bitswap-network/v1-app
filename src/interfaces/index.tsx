import React, { useEffect, useState } from "react";

export interface UserSchema {
  _id: string;
  username: string;
  email: string;
  password: string;
  balance: {
    bitclout: number;
    ether: number;
  };
  onGoingDeposit: TransactionSchema | string | null;
  transactions: string[];
  verification: {
    email: boolean;
    emailString: string;
    passwordString: string;
    status: string;
    bitcloutString: string;
  };
  bitclout: {
    publicKey: string;
    bio: string | undefined;
    verified: boolean;
    profilePicture: string | undefined;
  };
  created: Date;
  admin: boolean;
}

export interface TransactionSchema {
  _id: string;
  user: UserSchema | string;
  transactionType: string;
  assetType: string;
  value: number;
  created: Date;
  completed: boolean;
  completionDate: Date | undefined;
  state: string;
  error: string | null;
  gasDeducted: number | undefined;
  txnHash: string | undefined;
}
export interface PoolSchema {
  _id: string;
  address: string;
  privateKey: {
    salt: string;
    encryptedKey: string;
  };
  active: boolean;
  activeStart: number | null;
  user: UserSchema | string | null;
  super: number;
  balance: number;
}

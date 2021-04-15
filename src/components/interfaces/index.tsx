import React, { useEffect, useState } from "react";

export interface UserSchema {
  _id: string;
  buying: {
    state: boolean;
    id: string | undefined | ListingSchema;
  };
  verificationStatus: string;
  admin: boolean;
  username: string;
  email: string;
  bitcloutid: string;
  ethAddress: string;
  created: Date;
  password: string | undefined;
}

export interface ListingSchema {
  bitCloutSent: boolean;
  bitcloutTransactionId: string | null;
  bitcloutamount: number;
  buyer: UserSchema | null;
  created: string;
  escrowFull: boolean;
  ethAmount: number;
  lister: UserSchema;
  name: string;
  processing: boolean;
  sold: boolean;
  _id: string;
  escrowBalance: number;
  finalTransactionId: string | undefined;
}

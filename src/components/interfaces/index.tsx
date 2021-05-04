import React, { useEffect, useState } from "react";

export interface UserSchema {
  _id: string;
  name: string;
  username: string;
  email: string;
  emailverified: boolean;
  emailverification: string;
  bitcloutpubkey: string;
  bitcloutbio: string;
  bitcloutpicture: string;
  ethereumaddress: string[];
  password: string;
  passwordverification: string;
  created: Date;
  listings: [ListingSchema];
  buys: [ListingSchema];
  admin: boolean;
  verified: string;
  ratings: [{ rating: number; rater: [string] }];
  completedorders: number;
  bitswapbalance: number;
  transactions: [string];
  buystate: boolean;
  bitcloutverified: boolean;
  profilepicture: string;
  description: string;
}

export interface ListingSchema {
  _id: string;
  seller: UserSchema;
  buyer: UserSchema | null;
  currencysaletype: string;
  bitcloutnanos: number;
  usdamount: number;
  etheramount: number;
  ongoing: boolean;
  escrow: { balance: number; full: Boolean };
  bitcloutsent: boolean;
  escrowsent: boolean;
  finalTransactionId: string;
  created: Date;
  buy_time: Date | undefined;
  completed: { status: boolean; date: Date };
  ethaddress: string;
  pool: PoolSchema | null;
}

export interface TransactionSchema {
  _id: string;
  username: string;
  transactiontype: string;
  status: string;
  bitcloutnanos: number;
  bitcloutpubkey: string;
  created: Date;
  completed: Date;
  tx_id: string;
  fees: number;
}
export interface PoolSchema {
  address: string;
  active: boolean;
  listing: ListingSchema | null;
}

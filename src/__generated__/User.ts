/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user {
  __typename: "User";
  /**
   * The username used to login.
   */
  login: string;
  /**
   * The user's publicly visible profile email.
   */
  email: string;
  /**
   * The user's public profile name.
   */
  name: string | null;
  /**
   * The HTTP URL for this user
   */
  url: any;
  /**
   * A URL pointing to the user's public avatar.
   */
  avatarUrl: any;
}

export interface User {
  /**
   * Lookup a user by login.
   */
  user: User_user | null;
}

export interface UserVariables {
  login: string;
}

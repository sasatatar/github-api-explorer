/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserProfile
// ====================================================

export interface UserProfile_user {
  __typename: "User";
  id: string;
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
   * The user's public profile bio.
   */
  bio: string | null;
  /**
   * A URL pointing to the user's public avatar.
   */
  avatarUrl: any;
}

export interface UserProfile {
  /**
   * Lookup a user by login.
   */
  user: UserProfile_user | null;
}

export interface UserProfileVariables {
  login: string;
}

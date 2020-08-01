/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RepositoryOrder } from "./globalTypes";

// ====================================================
// GraphQL query operation: Repos
// ====================================================

export interface Repos_user_repositories_nodes {
  __typename: "Repository";
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * The description of the repository.
   */
  description: string | null;
  /**
   * The HTTP URL for this repository
   */
  url: any;
}

export interface Repos_user_repositories_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface Repos_user_repositories {
  __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  nodes: (Repos_user_repositories_nodes | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: Repos_user_repositories_pageInfo;
}

export interface Repos_user {
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
   * The user's public profile bio.
   */
  bio: string | null;
  /**
   * A URL pointing to the user's public avatar.
   */
  avatarUrl: any;
  /**
   * A list of repositories that the user owns.
   */
  repositories: Repos_user_repositories;
}

export interface Repos {
  /**
   * Lookup a user by login.
   */
  user: Repos_user | null;
}

export interface ReposVariables {
  cursor?: string | null;
  orderBy?: RepositoryOrder | null;
  login: string;
  pageSize?: number | null;
}

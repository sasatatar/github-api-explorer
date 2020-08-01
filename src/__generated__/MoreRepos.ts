/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RepositoryOrder } from "./globalTypes";

// ====================================================
// GraphQL query operation: MoreRepos
// ====================================================

export interface MoreRepos_user_repositories_nodes {
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

export interface MoreRepos_user_repositories_pageInfo {
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

export interface MoreRepos_user_repositories {
  __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  nodes: (MoreRepos_user_repositories_nodes | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: MoreRepos_user_repositories_pageInfo;
}

export interface MoreRepos_user {
  __typename: "User";
  /**
   * A list of repositories that the user owns.
   */
  repositories: MoreRepos_user_repositories;
}

export interface MoreRepos {
  /**
   * Lookup a user by login.
   */
  user: MoreRepos_user | null;
}

export interface MoreReposVariables {
  cursor?: string | null;
  orderBy?: RepositoryOrder | null;
  login: string;
  pageSize?: number | null;
}

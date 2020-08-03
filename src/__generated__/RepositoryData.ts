/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RepositoryOrder } from "./globalTypes";

// ====================================================
// GraphQL query operation: RepositoryData
// ====================================================

export interface RepositoryData_user_repositories_nodes {
  __typename: "Repository";
  id: string;
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

export interface RepositoryData_user_repositories_pageInfo {
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

export interface RepositoryData_user_repositories {
  __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  nodes: (RepositoryData_user_repositories_nodes | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: RepositoryData_user_repositories_pageInfo;
}

export interface RepositoryData_user {
  __typename: "User";
  /**
   * A list of repositories that the user owns.
   */
  repositories: RepositoryData_user_repositories;
}

export interface RepositoryData {
  /**
   * Lookup a user by login.
   */
  user: RepositoryData_user | null;
}

export interface RepositoryDataVariables {
  cursor?: string | null;
  orderBy?: RepositoryOrder | null;
  login: string;
  pageSize?: number | null;
}

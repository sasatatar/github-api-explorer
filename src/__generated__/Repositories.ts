/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Repositories
// ====================================================

export interface Repositories_repositories_nodes {
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

export interface Repositories_repositories_pageInfo {
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

export interface Repositories_repositories {
  __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  nodes: (Repositories_repositories_nodes | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: Repositories_repositories_pageInfo;
}

export interface Repositories {
  __typename: "User";
  /**
   * A list of repositories that the user owns.
   */
  repositories: Repositories_repositories;
}

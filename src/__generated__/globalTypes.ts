/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Possible directions in which to order a list of items when provided an `orderBy` argument.
 */
export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

/**
 * Properties by which repository connections can be ordered.
 */
export enum RepositoryOrderField {
  CREATED_AT = "CREATED_AT",
  NAME = "NAME",
  PUSHED_AT = "PUSHED_AT",
  STARGAZERS = "STARGAZERS",
  UPDATED_AT = "UPDATED_AT",
}

/**
 * Ordering options for repository connections
 */
export interface RepositoryOrder {
  field: RepositoryOrderField;
  direction: OrderDirection;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

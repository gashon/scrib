/**
 * @generated SignedSource<<0aae7298c0e7ed0d454a2f90b9b329ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type authorInfo$data = {
  readonly avatar: string | null;
  readonly email: string | null;
  readonly fullName: string | null;
  readonly id: string;
  readonly " $fragmentType": "authorInfo";
};
export type authorInfo$key = {
  readonly " $data"?: authorInfo$data;
  readonly " $fragmentSpreads": FragmentRefs<"authorInfo">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "authorInfo",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "fullName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatar",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "027cd265c32dadf62f3c55552eee7ac5";

export default node;

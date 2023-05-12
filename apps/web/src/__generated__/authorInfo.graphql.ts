/**
 * @generated SignedSource<<3e70c9325da0e1bcd907bd28476a1a2f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type authorInfo$data = {
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
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "abd1d5a1e2939c7df1f68cb74a852c95";

export default node;

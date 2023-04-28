/**
 * @generated SignedSource<<f57d084321873a3399a9926fff7161cc>>
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
  readonly id: string;
  readonly name: string | null;
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
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
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

(node as any).hash = "c7cd73c42e4890ca5a64797aed38ade4";

export default node;

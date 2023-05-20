/**
 * @generated SignedSource<<7d74d49b41535584109be3408febfe12>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type settingsModalInfo$data = {
  readonly avatar: string | null;
  readonly firstName: string | null;
  readonly id: string;
  readonly lastName: string | null;
  readonly " $fragmentType": "settingsModalInfo";
};
export type settingsModalInfo$key = {
  readonly " $data"?: settingsModalInfo$data;
  readonly " $fragmentSpreads": FragmentRefs<"settingsModalInfo">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "settingsModalInfo",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
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
      "name": "avatar",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "97ad8c3f3155a8a318d390c7a6ea8e47";

export default node;

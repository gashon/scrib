/**
 * @generated SignedSource<<51d08677f32c8a3b5055e0360251b614>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type getPostFragment$data = {
  readonly content: string;
  readonly createdBy: string;
  readonly id: string;
  readonly title: string;
  readonly " $fragmentType": "getPostFragment";
};
export type getPostFragment$key = {
  readonly " $data"?: getPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"getPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "getPostFragment",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdBy",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "7bf5a301f7a742682ef2de235e91b18a";

export default node;

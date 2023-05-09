/**
 * @generated SignedSource<<68a59354074931650547e9a9a24d771b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type getPostQuery$variables = {
  id: string;
};
export type getPostQuery$data = {
  readonly post: {
    readonly " $fragmentSpreads": FragmentRefs<"getPostFragment">;
  } | null;
};
export type getPostQuery = {
  response: getPostQuery$data;
  variables: getPostQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "getPostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "getPostFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "getPostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b1bfdfa7d3b1070176df97253a78b7bc",
    "id": null,
    "metadata": {},
    "name": "getPostQuery",
    "operationKind": "query",
    "text": "query getPostQuery(\n  $id: ID!\n) {\n  post(id: $id) {\n    ...getPostFragment\n    id\n  }\n}\n\nfragment getPostFragment on Post {\n  id\n  title\n  content\n  createdBy\n}\n"
  }
};
})();

(node as any).hash = "818ecee02bbdc8cb4243f19aa9214b7c";

export default node;

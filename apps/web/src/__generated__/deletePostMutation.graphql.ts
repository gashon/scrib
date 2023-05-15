/**
 * @generated SignedSource<<26c6082e0cc53a1c48025fc31fdaf1e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type deletePostMutation$variables = {
  id: string;
};
export type deletePostMutation$data = {
  readonly deletePost: {
    readonly id: string;
  } | null;
};
export type deletePostMutation = {
  response: deletePostMutation$data;
  variables: deletePostMutation$variables;
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
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "Post",
    "kind": "LinkedField",
    "name": "deletePost",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "deletePostMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "deletePostMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6c4c0546c63a33bdebf1998f9d0255b6",
    "id": null,
    "metadata": {},
    "name": "deletePostMutation",
    "operationKind": "mutation",
    "text": "mutation deletePostMutation(\n  $id: ID!\n) {\n  deletePost(input: {id: $id}) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6aae8e572c3c8420af53e5fec5c4fb62";

export default node;

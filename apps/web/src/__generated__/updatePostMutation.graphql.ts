/**
 * @generated SignedSource<<e0597b91b9567753a12aa94b0e7b8b9c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type updatePostMutation$variables = {
  content: string;
  id: string;
  title: string;
};
export type updatePostMutation$data = {
  readonly updatePost: {
    readonly content: string;
    readonly id: string;
    readonly title: string;
  } | null;
};
export type updatePostMutation = {
  response: updatePostMutation$data;
  variables: updatePostMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "content"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "content",
            "variableName": "content"
          },
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          },
          {
            "kind": "Variable",
            "name": "title",
            "variableName": "title"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "Post",
    "kind": "LinkedField",
    "name": "updatePost",
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "updatePostMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "updatePostMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "95dd135a1923f656a7bf88574fc438f3",
    "id": null,
    "metadata": {},
    "name": "updatePostMutation",
    "operationKind": "mutation",
    "text": "mutation updatePostMutation(\n  $id: ID!\n  $title: String!\n  $content: String!\n) {\n  updatePost(input: {id: $id, title: $title, content: $content}) {\n    id\n    title\n    content\n  }\n}\n"
  }
};
})();

(node as any).hash = "6e71109a3ef0059d19d89133f1155594";

export default node;

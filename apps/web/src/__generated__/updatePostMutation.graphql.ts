/**
 * @generated SignedSource<<ac610a37b30cdeca34477ce75a7ba569>>
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
  status: string;
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
  "name": "status"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v4 = [
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
            "name": "status",
            "variableName": "status"
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
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "updatePostMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "updatePostMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "7f0e8634e1a9fe451e2c857dd7a54f75",
    "id": null,
    "metadata": {},
    "name": "updatePostMutation",
    "operationKind": "mutation",
    "text": "mutation updatePostMutation(\n  $id: ID!\n  $title: String!\n  $content: String!\n  $status: String!\n) {\n  updatePost(input: {id: $id, title: $title, content: $content, status: $status}) {\n    id\n    title\n    content\n  }\n}\n"
  }
};
})();

(node as any).hash = "1b00c574bdda1535f6ab0e8c5e6be8da";

export default node;

/**
 * @generated SignedSource<<886426c690783dc78f29bd611e322806>>
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
    readonly status: string;
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
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
    "cacheID": "47c5f70da39548d2b9618485b4fc101f",
    "id": null,
    "metadata": {},
    "name": "updatePostMutation",
    "operationKind": "mutation",
    "text": "mutation updatePostMutation(\n  $id: ID!\n  $title: String!\n  $content: String!\n  $status: String!\n) {\n  updatePost(input: {id: $id, title: $title, content: $content, status: $status}) {\n    id\n    title\n    content\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "3c6ce7cb6dfc3918e9f2a22ea59cdd92";

export default node;

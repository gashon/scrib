/**
 * @generated SignedSource<<b121b9e7959a97b9b9b89ddb37fc1818>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type createPostMutation$variables = {
  content: string;
  title: string;
};
export type createPostMutation$data = {
  readonly createPost: {
    readonly id: string;
    readonly title: string;
  } | null;
};
export type createPostMutation = {
  response: createPostMutation$data;
  variables: createPostMutation$variables;
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
  "name": "title"
},
v2 = [
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
    "name": "createPost",
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "createPostMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "createPostMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "a260e0edf2759d621dab90b9c8fb1a64",
    "id": null,
    "metadata": {},
    "name": "createPostMutation",
    "operationKind": "mutation",
    "text": "mutation createPostMutation(\n  $title: String!\n  $content: String!\n) {\n  createPost(input: {title: $title, content: $content}) {\n    id\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "2350f39fb045309ca45e1dc46bc2321b";

export default node;

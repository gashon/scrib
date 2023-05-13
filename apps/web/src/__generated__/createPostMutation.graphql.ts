/**
 * @generated SignedSource<<53d424eaafc40c111097a035944aa8cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type createPostMutation$variables = {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "title"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "createPostMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createPostMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "20cfdf5d967be3269e21414cf5c065d4",
    "id": null,
    "metadata": {},
    "name": "createPostMutation",
    "operationKind": "mutation",
    "text": "mutation createPostMutation(\n  $title: String!\n) {\n  createPost(input: {title: $title}) {\n    id\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "6c9ed7a9a30273eb905659fbd7dd6443";

export default node;

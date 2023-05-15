/**
 * @generated SignedSource<<7b997760d394d64577899f8a4c7d6b28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type getAuthorAndPostsQuery$variables = {
  id: string;
};
export type getAuthorAndPostsQuery$data = {
  readonly user: {
    readonly posts: {
      readonly " $fragmentSpreads": FragmentRefs<"authorPosts">;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"authorInfo">;
  } | null;
};
export type getAuthorAndPostsQuery = {
  response: getAuthorAndPostsQuery$data;
  variables: getAuthorAndPostsQuery$variables;
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
],
v2 = [
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": [
      {
        "field": "created_at",
        "order": "DESC"
      }
    ]
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "getAuthorAndPostsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "authorInfo"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "PostConnection",
            "kind": "LinkedField",
            "name": "posts",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "authorPosts"
              }
            ],
            "storageKey": "posts(orderBy:[{\"field\":\"created_at\",\"order\":\"DESC\"}])"
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
    "name": "getAuthorAndPostsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fullName",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "PostConnection",
            "kind": "LinkedField",
            "name": "posts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PostEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Post",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
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
                        "name": "createdAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "status",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isAuthor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "posts(orderBy:[{\"field\":\"created_at\",\"order\":\"DESC\"}])"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "83f281281fb7d995d57dda005c60f22d",
    "id": null,
    "metadata": {},
    "name": "getAuthorAndPostsQuery",
    "operationKind": "query",
    "text": "query getAuthorAndPostsQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    ...authorInfo\n    posts(orderBy: [{field: \"created_at\", order: DESC}]) {\n      ...authorPosts\n    }\n    id\n  }\n}\n\nfragment authorInfo on User {\n  fullName\n  id\n  email\n}\n\nfragment authorPosts on PostConnection {\n  edges {\n    node {\n      id\n      title\n      content\n      createdAt\n      status\n      isAuthor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a3257e6a273379fe65e225a8aeb3c744";

export default node;

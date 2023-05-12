/**
 * @generated SignedSource<<cbfbf65827abe408a1a96f3bf90348b6>>
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
        "direction": "ASC",
        "field": "created_at"
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
            "storageKey": "posts(orderBy:[{\"direction\":\"ASC\",\"field\":\"created_at\"}])"
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
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
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "posts(orderBy:[{\"direction\":\"ASC\",\"field\":\"created_at\"}])"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a8fd0e3052be2f7624066e88bd34ed72",
    "id": null,
    "metadata": {},
    "name": "getAuthorAndPostsQuery",
    "operationKind": "query",
    "text": "query getAuthorAndPostsQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    ...authorInfo\n    posts(orderBy: [{field: \"created_at\", direction: ASC}]) {\n      ...authorPosts\n    }\n    id\n  }\n}\n\nfragment authorInfo on User {\n  id\n  name\n  email\n}\n\nfragment authorPosts on PostConnection {\n  edges {\n    node {\n      id\n      title\n      content\n      createdAt\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "564d5e05b467ff79192accceeb14d2b0";

export default node;

export function toConnection<TNode>(
  edges: {
    cursor: string;
    node: TNode;
  }[],
  totalCount: number,
  hasNextPage: boolean,
  hasPreviousPage: boolean,
) {
  const startCursor = edges.length > 0 ? edges[0].cursor : null;
  const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

  return {
    edges,
    pageInfo: {
      startCursor,
      endCursor,
      hasNextPage,
      hasPreviousPage,
    },
    totalCount,
  };
}

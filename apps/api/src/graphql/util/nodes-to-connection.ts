import { nodesToEdges, toConnection } from '@scrib/api/graphql/util';

export function nodesToConnection<TNode>(
  nodes: TNode[],
  totalCount: number,
  afterInt: number,
): ReturnType<typeof toConnection> {
  const edges = nodesToEdges(nodes, afterInt);

  const hasNextPage = totalCount > afterInt + nodes.length;
  const hasPreviousPage = afterInt > 0;

  const connection = toConnection(
    edges,
    totalCount,
    hasNextPage,
    hasPreviousPage,
  );
  return connection;
}

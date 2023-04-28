export function nodesToEdges<TNode>(
  nodes: TNode[],
  after: number,
): {
  cursor: string;
  node: TNode;
}[] {
  return nodes.map((node, index: number) => ({
    cursor: Buffer.from(`cursor${index + after + 1}`).toString('base64'),
    node,
  }));
}

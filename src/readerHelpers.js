const findAnchors = (div) => {
  let results = [];


  const helper = (node) => {
    console.log(node);
    if (node.type === 'a') {
      return node;
    }
    if (node.children) {
      helper(node.children.props);
    }
  }

  helper(div);

  return results;
}

export default findAnchors;
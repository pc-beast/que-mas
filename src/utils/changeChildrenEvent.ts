const changeChildrenEvent = (node: Node, callback: (mutations: MutationRecord[]) => void) => {
  const observer = new MutationObserver(callback);
  observer.observe(node, {
    childList: true,
  });
  return observer;
}

const onInnerHTMLChange = (node: Node, callback: (mutations: MutationRecord[]) => void) => {
  const observer = new MutationObserver(callback);
  observer.observe(node, {
    characterData: true,
    subtree: true,
    childList: true,
  });
  return observer;
}

export { changeChildrenEvent, onInnerHTMLChange };
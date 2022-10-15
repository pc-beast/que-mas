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

const onReadyElement = (selector: string, callback: () => void) => {
  const element = document.querySelector(selector);
  if (element) {
    callback();
  } else {
    setTimeout(() => {
      onReadyElement(selector, callback);
    }, 200);
  }
}

export { changeChildrenEvent, onInnerHTMLChange, onReadyElement };
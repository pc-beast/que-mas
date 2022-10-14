console.log("Yay! I'm a content script!");

// Language: typescript

const waitForElement = (selector: string) => {
  return new Promise((resolve) => {
    // mutation observer to wait for element to be added to the DOM
    const observer = new MutationObserver((mutations) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        observer.disconnect();
      }
    }
    );
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
};

// wait for the element with "data-testid" attribute equal to "conversation-header" to be added to the DOM
waitForElement('[data-testid="conversation-header"]').then((element) => {
  console.log("Element found!", element);
  const messageElements = document.querySelectorAll('.message-in .selectable-text span');
  messageElements.forEach((element: any) => {
    console.log(element.textContent);
  });
});
export {};
import { translate } from './utils/translate';
import { changeChildrenEvent, onInnerHTMLChange } from './utils/changeChildrenEvent';

const translateMessagesCallback = async () => {
  const messagesIn = document.querySelectorAll('.message-in .copyable-text .selectable-text span');
  const messageOut = document.querySelectorAll('.message-out .copyable-text .selectable-text span');
  const messages = [...messagesIn, ...messageOut];
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const text = message.textContent;
    if (text) {
      const translatedText = await translate(text);
      message.textContent = translatedText;
    }
  }
}

// TODO: type to be changed
const translateInputCallback = async (e: any) => {
  console.log(e[0]);
  const text = e[0].target.textContent;
  if (text) {
    const translatedText = await translate(text);
    // TODO: to be implemented in a way that is to preserve the cursor position
    console.log(translatedText);
  }
}

// keep Checking if the Node with given selector is present in the DOM
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

try {
  onReadyElement('.app-wrapper-web > .two > div:nth-child(4)', () => {
    const chatAreaNode = document.querySelector('.app-wrapper-web > .two > div:nth-child(4)');
    chatAreaNode?.addEventListener('DOMNodeInserted', translateMessagesCallback);
  })

  onReadyElement('[data-testid="conversation-compose-box-input"] .selectable-text span', () => {
    const inputNode = document.querySelector('[data-testid="conversation-compose-box-input"] .selectable-text span');
    onInnerHTMLChange(inputNode as Node, translateInputCallback);
  });
} catch (error) {
  console.error("Error: ", error);
}
export { };
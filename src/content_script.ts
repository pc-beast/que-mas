import { desanitizeText, translate } from './utils/translate';
import { changeChildrenEvent, onInnerHTMLChange, onReadyElement } from './utils/watchers';

const translateMessagesCallback = async () => {
  const messagesIn = document.querySelectorAll('.message-in .copyable-text .selectable-text span');
  const messageOut = document.querySelectorAll('.message-out .copyable-text .selectable-text span');
  const messages = [...messageOut, ...messagesIn];
  for (let i = messages.length-1; i >= 0; i--) {
    const message = messages[i];
    const text = message.textContent;
    if (text) {
      let translatedText = await translate(text);
      translatedText = desanitizeText(translatedText);
      message.innerHTML = translatedText;
    }
  }
}

const translateInputCallback = async (e: MutationRecord[]) => {
  const div = document.querySelector('[class="p357zi0d ktfrpxia nu7pwgvd kcgo1i74 sap93d0t gndfcl4n _1m68F"] div');
  console.log(e[0]);
  const text = e[0].target.textContent;
  if (text) {
    const translatedText = await translate(text);
    // TODO: to be implemented in a way that is to preserve the cursor position
    console.log(translatedText);
    div!.innerHTML = translatedText;
  }
}

try {
  onReadyElement('.app-wrapper-web > .two > div:nth-child(4)', () => {
    const chatAreaNode = document.querySelector('.app-wrapper-web > .two > div:nth-child(4)');
    chatAreaNode?.addEventListener('DOMNodeInserted', translateMessagesCallback);
  })

  onReadyElement('[data-testid="conversation-compose-box-input"] .selectable-text', () => {
    const inputNodeParent = document.querySelector('[class="p357zi0d ktfrpxia nu7pwgvd kcgo1i74 sap93d0t gndfcl4n _1m68F"]');
    
    const div = document.createElement('div');
    // add classes to the p tag "selectable-text copyable-text"
    div.classList.add('selectable-text', 'copyable-text', 'asdfasdfasdf');
    div.innerText = "Yayayayayayayayayayay";
    const inputNode = document.querySelector('[data-testid="conversation-compose-box-input"] .selectable-text span');
    div.addEventListener('click', () => {
      inputNode!.innerHTML = div?.innerHTML || '';
    })
    inputNodeParent!.appendChild(div);
    console.log(inputNodeParent, "uau");
  })

  onReadyElement('[data-testid="conversation-compose-box-input"] .selectable-text span', () => {
    const inputNode = document.querySelector('[data-testid="conversation-compose-box-input"] .selectable-text span');
    onInnerHTMLChange(inputNode as Node, translateInputCallback);
  });
} catch (error) {
  console.error("Error: ", error);
}
export { };
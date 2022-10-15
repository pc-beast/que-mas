import { boxComponent } from './components/dot';
import { desanitizeText, translate } from './utils/translate';
import { changeChildrenEvent, onInnerHTMLChange, onReadyElement } from './utils/watchers';

const translateMessagesCallback = async (e: Event) => {
     const messagesIn = document.querySelectorAll('.message-in .copyable-text .selectable-text span');
     const messageOut = document.querySelectorAll('.message-out .copyable-text .selectable-text span');
     const messages = [...messageOut, ...messagesIn];
     const filterMessages = messages.filter(message => message.classList.contains('translated') === false);
     for (let i = filterMessages.length - 1; i >= 0; i--) {
          const message = filterMessages[i];
          const text = message.textContent;
          if (text && !message.classList.contains('translated')) {
               let translatedText = await translate(text);
               translatedText = desanitizeText(translatedText);
               message.innerHTML = translatedText;
               message.classList.add('translated');
          }
     }
}

const translateInputCallback = async (e: MutationRecord[]) => {
     const text = e[0].target.textContent;
     if (text) {
          const translatedText = await translate(text);
          // TODO: to be implemented in a way that is to preserve the cursor position
          console.log(translatedText);
     }
}

try {
     onReadyElement('.app-wrapper-web > .two > div:nth-child(4)', () => {
          console.log('WhatsApp Web is ready');
          const chatAreaNode = document.querySelector('.app-wrapper-web > .two > div:nth-child(4)');
          chatAreaNode?.addEventListener('DOMNodeInserted', translateMessagesCallback);
     });

     onReadyElement('[data-testid="conversation-compose-box-input"] .selectable-text span', () => {
          const inputNode = document.querySelector('[data-testid="conversation-compose-box-input"] .selectable-text span');
          onInnerHTMLChange(inputNode as Node, translateInputCallback);
     });

     onReadyElement('footer [data-testid="compose-box"] span:nth-child(2) > div > div:nth-child(2) > div', () => {
          const textbox = document.querySelector('footer [data-testid="compose-box"] span:nth-child(2) > div > div:nth-child(2) > div')
          textbox?.classList.add('textbox_flex');
          const qm_box = boxComponent();
          textbox?.appendChild(qm_box);
     });
     onReadyElement('.textbox_flex > div > div:nth-child(2)', () => {
          const placeholder = document.querySelector(".textbox_flex > div > div:nth-child(2)")
          placeholder?.classList.add('placeholderBox');
     })

} catch (error) {
     console.error("Error: ", error);
}
export { };
import { boxComponent } from './components/dot';
import { desanitizeText, translate } from './utils/translate';
import { onInnerHTMLChange, onReadyElement, isDotPresent } from './utils/watchers';
import { addToGoogleCalendar } from './utils/calender';
import { simulateMouseEvents, sendMessage } from './utils/sendSelf';

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

var translatedText = '';
const translateInputCallback = async (e: MutationRecord[]) => {
     const text = e[0].target.textContent;
     if (text) {
          translatedText = await translate(text);
     }
}

try {
    // get the message from background script
     chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if(request.id === 'addtocalender') {
        let description = request.text;
        addToGoogleCalendar(description);
      }

      if(request.id === 'sendself') {
        let description = request.text;
        const selfContact = '+' + localStorage.getItem('last-wid-md')?.split(':')[0].slice(1);
        const selfContactWithSpace = selfContact.slice(0, 3) + ' ' + selfContact.slice(3, 8) + ' ' + selfContact.slice(8);
        console.log(selfContactWithSpace);
        
        simulateMouseEvents(document.querySelector('[title="' + selfContactWithSpace + '"]'), 'mousedown');
        setTimeout(() => {sendMessage(description)}, 1000);
      }
     });

     onReadyElement('.app-wrapper-web > .two > div:nth-child(4)', () => {
          console.log('WhatsApp Web is ready');
          const chatAreaNode = document.querySelector('.app-wrapper-web > .two > div:nth-child(4)');
          chatAreaNode?.addEventListener('DOMNodeInserted', translateMessagesCallback);
     });

     onReadyElement('[data-testid="conversation-compose-box-input"] .selectable-text span', () => {
          const inputNode = document.querySelector('[data-testid="conversation-compose-box-input"] .selectable-text span');
          onInnerHTMLChange(inputNode as Node, translateInputCallback);
     });

     // injecting dot component and event listener to the DOM
     setInterval(() => {
          if (!isDotPresent()) {
               const textbox = document.querySelector('footer [data-testid="compose-box"] span:nth-child(2) > div > div:nth-child(2) > div')
               textbox?.classList.add('textbox_flex');
               const qm_box = boxComponent();
               textbox?.appendChild(qm_box);

               const translateButton = document.querySelector('.qm_box .left_text');
               translateButton?.addEventListener('click', (e: Event) => {
                    const input: HTMLElement = document.querySelector('[data-testid="conversation-compose-box-input"]')!;
                    input.focus();
                    document.execCommand('selectAll');
                    setTimeout(() => {
                         document.execCommand('insertText', false, translatedText);
                    }, 1000);
               });
          }
     }, 1000);

} catch (error) {
     console.error("Error: ", error);
}
export { };
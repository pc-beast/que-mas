function simulateMouseEvents(element: any, eventName: string) {
  var mouseEvent = document.createEvent('MouseEvents');
  mouseEvent.initEvent(eventName, true, true);
  element.dispatchEvent(mouseEvent);
}

const eventFire = (MyElement: any, ElementType: any) => {
  var MyEvent = document.createEvent('MouseEvents');
    MyEvent.initMouseEvent(ElementType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    MyElement.dispatchEvent(MyEvent);
}

const sendMessage = (message: string) => {
  const input: HTMLElement = document.querySelector('[data-testid="conversation-compose-box-input"]')!;
  input.focus();
  document.execCommand('selectAll');
  setTimeout(() => {
    document.execCommand('insertText', false, message);
  }, 500);
  setTimeout(() => {
    eventFire(document.querySelector('[data-testid="compose-btn-send"]'), 'click')
  }, 500);
}

export { simulateMouseEvents, sendMessage };
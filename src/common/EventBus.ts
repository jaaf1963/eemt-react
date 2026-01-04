//
const eventBus = {
  on(event: string, callback: EventListener) {
    document.addEventListener(event, (e) => callback(e));
    console.log("on bus", event, callback);
  },
  dispatch(event: string, data?: any) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
    console.log("dispatch Bus");
  },
  remove(event: string, callback: EventListener) {
    document.removeEventListener(event, callback);
    console.log("event Bus");
  },
};

export default eventBus;

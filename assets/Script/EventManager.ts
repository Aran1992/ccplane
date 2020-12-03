class EventManager_ {
    private eventHandlerMap: Map<any, Function[]> = new Map();

    public on(event, handler: Function) {
        let handlers = this.eventHandlerMap.get(event);
        if (handlers === undefined) {
            handlers = [];
            this.eventHandlerMap.set(event, handlers);
        }
        handlers.push(handler);
    }

    public off(event, handler: Function) {
        let handlers = this.eventHandlerMap.get(event);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index !== -1) {
                handlers.splice(index, 1);
            }
        }
    }

    public emit(event, ...args) {
        let handlers = this.eventHandlerMap.get(event);
        if (handlers) {
            handlers.forEach(handler => handler(...args));
        }
    }
}

const EventManager = new EventManager_();
export default EventManager;
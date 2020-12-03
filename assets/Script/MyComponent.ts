import EventManager from "./EventManager";

export default class MyComponent extends cc.Component {
    private eventHandlerMap: Map<any, Function[]> = new Map();

    protected on(event, handler: Function) {
        let handlers = this.eventHandlerMap.get(event);
        if (handlers === undefined) {
            handlers = [];
            this.eventHandlerMap.set(event, handlers);
        }
        handlers.push(handler);
        EventManager.on(event, handler);
    }

    protected off(event, handler: Function) {
        let handlers = this.eventHandlerMap.get(event);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index !== -1) {
                handlers.splice(index, 1);
            }
        }
        EventManager.off(event, handler);
    }

    protected emit(event, ...args) {
        EventManager.emit(event, ...args);
    }

    protected onDestroy() {
        this.eventHandlerMap.forEach((handlers, event) => {
            handlers.forEach(handler => EventManager.off(event, handler));
        });
        super.onDestroy();
    }
}
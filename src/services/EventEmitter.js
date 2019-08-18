export default class EventEmitter {
    constructor() {
        this.eventListStore = {};
    }

    getEventInfo(eventName) {
        const [event, ...rest] = eventName.split(':');
        const id = rest.join(':');
        return [event, id];
    }

    on(eventInfo, cb) {
        const [event, id] = this.getEventInfo(eventInfo);
        const eventStore = this.eventListStore[event];
        if (!eventStore) {
            this.eventListStore[event] = {};
        }
        this.eventListStore[event][id] = cb;
    }

    emit(event, data) {
        if (this.eventListStore[event]) {
            Object.values(this.eventListStore[event]).forEach((cb) => cb(data));
        }
    }
}

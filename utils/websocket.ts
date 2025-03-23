type WSMessageType = 'transcription' | 'error' | 'status';

interface WSMessage {
    type: WSMessageType;
    data: any;
    timestamp: number;
}

export class WebSocketClient {
    private ws: WebSocket | null = null;
    private readonly url: string;
    private reconnectAttempts: number = 0;
    private maxReconnectAttempts: number = 5;
    private reconnectTimeout: number = 1000;
    private messageHandlers: Map<WSMessageType, ((data: any) => void)[]> = new Map();

    constructor(url: string) {
        this.url = url;
    }

    connect() {
        try {
            this.ws = new WebSocket(this.url);
            this.setupEventListeners();
        } catch (error) {
            console.error('WebSocket connection failed:', error);
            this.handleReconnection();
        }
    }

    private setupEventListeners() {
        if (!this.ws) return;

        this.ws.onopen = () => {
            console.log('WebSocket connected');
            this.reconnectAttempts = 0;
        };

        this.ws.onclose = () => {
            console.log('WebSocket disconnected');
            this.handleReconnection();
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.ws.onmessage = (event) => {
            try {
                const message: WSMessage = JSON.parse(event.data);
                this.handleMessage(message);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };
    }

    private handleReconnection() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached');
            return;
        }

        this.reconnectAttempts++;
        setTimeout(() => {
            console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
            this.connect();
        }, this.reconnectTimeout * this.reconnectAttempts);
    }

    private handleMessage(message: WSMessage) {
        const handlers = this.messageHandlers.get(message.type) || [];
        handlers.forEach(handler => handler(message.data));
    }

    on(type: WSMessageType, handler: (data: any) => void) {
        const handlers = this.messageHandlers.get(type) || [];
        handlers.push(handler);
        this.messageHandlers.set(type, handlers);
    }

    send(type: WSMessageType, data: any) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            const message: WSMessage = {
                type,
                data,
                timestamp: Date.now()
            };
            this.ws.send(JSON.stringify(message));
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}

export const wsClient = new WebSocketClient('ws://localhost:8765');

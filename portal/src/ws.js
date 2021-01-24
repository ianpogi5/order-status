import { w3cwebsocket as W3CWebSocket } from "websocket";

class WS {
  constructor({
    companyId,
    outletId,
    wsEndpoint,
    onConnected,
    onOrderChange,
    onDisconnect,
  }) {
    this.client = new W3CWebSocket(
      `${wsEndpoint}?companyId=${companyId}&outletId=${outletId}`
    );

    if (onConnected) this.client.onopen = onConnected;
    if (onOrderChange) this.client.onmessage = onOrderChange;
    if (onDisconnect) this.client.onclose = onDisconnect;
  }

  disconnect = () => this.client.close();
}

export default WS;

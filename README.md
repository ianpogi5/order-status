# Order Status and API Design

Objective of this project is to replace polling strategy with event based stragy using WebSockets.

## Requirements

- Working nodejs v12.x
- AWS Profile
- yarn

## Overview

There are 3 parts of this project. `Market` where orders come in, `Server` where orders are processed and `Portal` where orders are monitored.

## Setup

1. Clone project
2. Inside the project run `yarn` to install depencies.
3. Create `config.yml`.

   ```bash
   copy config.sample.yml config.yml
   ```

4. Edit `config.yml` and change the values for REGION and PROFILE.
5. Create database in AWS:

   ```bash
   yarn workspace resources setup dev
   ```

6. Go to AWS -> DynamoDB -> `order-status-ws` and copy the `Latest stream ARN`.
7. Edit again `config.yml` and paste the value of `ORDER_TABLE_STREAM_ARN` from the previous step.
8. Deploy WebSocket server.

   ```bash
   yarn workspace server deploy dev
   ```

9. From the previous step, copy the endpoint that starts with `wss://`. Create the file `portal/.env.local` with the contents below:

   ```env
   REACT_APP_WS_ENDPOINT=wss://xxxxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/dev
   ```

10. From step #8, copy the endpoint that starts with `https://`. Create the file `market/.env.local` with the contents below:

    ```env
    REACT_APP_API_ENDPOINT=https://xxxxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/dev/order
    ```

11. Start Portal app

    ```bash
    yarn workspace portal start
    ```

12. On a differnt terminal, start Market app

    ```bash
    yarn workspace market start
    ```

## Usage

1. Go to `http://localhost:9001/`. Enter Company and Outlet ID then connect. The status should become connected.
2. On another browser tab, go to `http://localhost:9002/`. Fill in the details. Make sure Company and Outlet ID matches the one in the Portal. Click send.
3. The Portal should receive the order status data similar below:

   ```json
   {
     "type": "new-order",
     "orderId": "1",
     "status": "Submitted"
   }
   ```

4. Open mutiple tabs/browsers and go to `http://localhost:9001/`/. Get them all connected with different/same company and outlet id.
5. Send different data from Market to experiement with the project.

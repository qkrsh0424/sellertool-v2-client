import { useEffect, useReducer, useRef, useState } from 'react';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import _ from 'lodash';

const SOCKET_URL = process.env.NODE_ENV == 'development' ? process.env.development.socketAddress : process.env.production.socketAddress
const useSocketClient = () => {
    const client = useRef({});

    const [connected, setConnected] = useState(false);
    const [subscribeItems, dispatchSubscribeItems] = useReducer(subscribeItemsReducer, initialSubscribeItems);

    useEffect(() => {
        connect();

        return () => {
            disconnect();
        }
    }, []);

    const connect = () => {
        client.current = new StompJs.Client({
            // brokerURL: "ws://localhost:8081/ws", // 웹소켓 서버로 직접 접속
            webSocketFactory: () => new SockJS(SOCKET_URL), // proxy를 통한 접속
            // connectHeaders: {
            // "auth-token": "spring-auth-token",
            // },
            debug: function (str) {
                // console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,
            onConnect: (e) => {
                console.log('connected socket.');
                setConnected(true);
            },
            onDisconnect: (e) => {
                console.log('disconnected socket.');
            },
            onStompError: (frame) => {
                console.error(frame);
                setConnected(false);
            },
        });

        client.current.activate();
    };

    const disconnect = () => {
        // onUnsubscribe();
        setConnected(false);
        client.current.deactivate();
    };

    // @Deprecated
    // const onSubscribe = (subscribes) => {
    //     if (!client.current.connected) {
    //         return;
    //     }

    //     dispatchSubscribeItems({
    //         type: 'SET_DATA',
    //         payload:
    //             _.cloneDeep(
    //                 subscribes.map(r => {
    //                     return client.current.subscribe(
    //                         r.subscribeUrl,
    //                         async (e) => {
    //                             r.callback(e);
    //                         }
    //                     )
    //                 })
    //             )
    //     })
    // }

    const onSubscribes = async (subscribes) => {
        if (!client.current.connected) {
            return;
        }

        return subscribes.map(r => {
            return client.current.subscribe(
                r.subscribeUrl,
                async (e) => {
                    r.callback(e);
                }
            )
        });
    }

    // @Deprecated
    // const onUnsubscribe = () => {
    //     console.log(subscribeItems)
    //     let clone = _.cloneDeep(subscribeItems);
    //     dispatchSubscribeItems({
    //         type: 'CLEAR'
    //     })

    //     clone.forEach(r => {
    //         r.unsubscribe();
    //     })

    // }

    const onUnsubscribes = (subscribes) => {
        if (!subscribes) return;

        subscribes.forEach(r => {
            r.unsubscribe();
        })
    }

    const onPublish = (destination, body) => {
        if (!client.current.connected) {
            return;
        }

        client.current.publish({
            destination: destination,
            body: JSON.stringify(body),
        });
    };

    return {
        connected: connected,
        onSubscribes: onSubscribes,
        onUnsubscribes: onUnsubscribes,
        onPublish: onPublish,
    }
}
export default useSocketClient;

const initialSubscribeItems = [];

const subscribeItemsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSubscribeItems;
        default: return initialSubscribeItems;
    }
}
// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

// Hub maintains the set of active clients and broadcasts messages to the
// clients.
type BroadcastMessage struct {
    UserID string
    Data   []byte
}
type Hub struct {
	// Registered clients.
	clients map[*Client]bool
	broadcast chan *BroadcastMessage
	register chan *Client
	unregister chan *Client
}


func newHub() *Hub {
	return &Hub{
		broadcast:  make(chan *BroadcastMessage),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
	}
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
		case message := <-h.broadcast:
			for client := range h.clients {
				//여기서 다 걸러낼 수 있음.
				if client.userID != message.UserID { // 특정 유저에게 전달하기 위해 추가.
					select {
					case client.send <- message.Data:
					default:
						close(client.send)
						delete(h.clients, client)
					}
			}
		}
	}
}
}
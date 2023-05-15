// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 1024
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// Client is a middleman between the websocket connection and the hub.
type Client struct {
	hub *Hub

	// The websocket connection.
	conn *websocket.Conn

	// Buffered channel of outbound messages.
	send chan []byte
}

type logMessage struct {
	Id   string `json:id`
	Type string `json:"type"`
	user string `json:"data"`
}

var currentUserId string
var userList []string
// readPump pumps messages from the websocket connection to the hub.
//
// The application runs readPump in a per-connection goroutine. The application
// ensures that there is at most one reader on a connection by executing all
// reads from this goroutine.
func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()
	// c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	
	// c.hub.broadcast := []byte("Hello, World!")
	// fmt.Printf("client register : %s\n", client.hub.register)
	for {
		var msg Message
		 err := c.conn.ReadJSON(&msg)
			//받은 값 들어옴.
			//1. 누가 보내는지 확인
			//2. 여기서 클라이언트로 보내는 법.
		log.Printf("readPump: %s",msg.Id, msg.Type, msg.Data)


		SendLog(msg.Type,msg.Data, c.hub)
		switch msg.Type {
		case "id":
			currentUserId = msg.Data
			userList = append(userList, currentUserId) //add user
			
			if len(c.hub.clients) > 1{
				log.Printf("c.hub.clients: %s", c.hub.clients, len(c.hub.clients))
				//일단 전부 던진다.
				for i:=0; i< len(offerList); i++ {
					SendBroadCast(offerList[i], c.hub)
				}
				// for i:=0; i< len(answerList); i++ {
				// 	SendBroadCast(answerList[i], c.hub)
				// }
			}
		case "out":
		case "offer":
			
			// if len(userList) == 1{ // 유저가 없을 때만 offer를 보낸다.
				onOfferHandler(msg.Data, c.hub)
			// }
			log.Printf("offer: %s\n")

		case "answer":
			log.Printf("answer: %s\n")
			onAnswerHandler(msg.Data, c.hub)
		case "candidate":
			onCandidateHandler(msg.Data, c.hub)
		}
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		// message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))
		// c.hub.broadcast <- message
	}
}

// writePump pumps messages from the hub to the websocket connection.
//
// A goroutine running writePump is started for each connection. The
// application ensures that there is at most one writer to a connection by
// executing all writes from this goroutine.
func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			// Add queued chat messages to the current websocket message.
			n := len(c.send)
			for i := 0; i < n; i++ {
				w.Write(newline)
				w.Write(<-c.send)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

func SendLog(logTitle string,msg string, hub  *Hub) {
	logMessage := logMessage{
		Id:   logTitle,
		Type: "log",
		user: hub.clients,
	}
	logJSON, err := json.Marshal(logMessage)
	if err != nil {
		fmt.Printf("error marshal JSON: %s\n", err.Error())
	}
	logString := string(logJSON)
	select {
	case hub.broadcast <-[]byte(string(logString)):
		// Message was sent successfully
	default:
		// The channel wasn't ready to receive data
		fmt.Println("error: broadcast channel was not ready")
	}
}

// serveWs handles websocket requests from the peer.
func serveWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool {
		// check the http.Request
		// make sure it's OK to access
		return true
	}
	var err error
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &Client{hub: hub, conn: conn, send: make(chan []byte, 256)}
	client.hub.register <- client

	// Allow collection of memory referenced by the caller by doing all work in
	// new goroutines.
	go client.writePump()
	go client.readPump()
}

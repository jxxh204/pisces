package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)



type Message struct {
	Id   string `json:id`
	Type string `json:"type"`
	Data string `json:"data"`
}
var currentOffers []Message
var currentOffer Message
var currentAnswer Message
var (
	wsUpgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
	wsConn *websocket.Conn
)

var currentUserId string
var users [4]string

func Chat(hub *Hub, w http.ResponseWriter, r *http.Request) {
	wsUpgrader.CheckOrigin = func(r *http.Request) bool {
		// check the http.Request
		// make sure it's OK to access
		return true
	}
	var err error
	wsConn, err = wsUpgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Printf("could not upgrade: %s\n", err.Error())
		return
	}
	defer wsConn.Close()

	// 클라이언트를 hub에 추가 Client.go
	client := &Client{hub: hub, conn: wsConn, send: make(chan []byte, 256)}
	client.hub.register <- client
	
	fmt.Printf("client register : %s\n", client.hub.register)

	go client.writePump()
	go client.readPump()

	for {
		var msg Message

		err := wsConn.ReadJSON(&msg)
		if err != nil {
			fmt.Printf("error reading JSON: %s\n", err.Error())
			break
		}

		fmt.Printf("onMessage Received: %s\n", msg.Type)
		//받은거 그대로 다시 다보냄
		switch msg.Type {
		case "id":
			currentUserId = msg.Data
		case "out":
			//id값 받아옴.
			// idToRemove := msg.Data
			// for _, offer := range currentOffers {
			// 	if offer.Id != idToRemove {
			// 		currentOffers = append(currentOffers, offer)
			// 	}
			// }
		case "offer":
			//기존에 있을 경우 보냄. - 1:1통신용으로 만듬.
			if currentOffer.Id != "" {
				SendOffer(currentOffer)
			}
			
			currentOffer := Message{
				Id:   currentUserId,
				Type: "offer",
				Data: msg.Data,
			}
			SendOffer(currentOffer)
			// currentOffers = append(currentOffers, Message{
			// 	Id:   currentUserId,
			// 	Type: "offer",
			// 	Data: msg.Data,
			// })
			// log.Printf("offer: %s\n",currentOffers)

			// // 모든 offer를 접속자에게 전달.
			// for _, offer := range currentOffers {
			// 	SendOffer(offer)
			// }
			
			
			//offer를 받으면 currentOffers에 저장해놓는다.

		case "answer":
			log.Printf("answer: %s\n")
			answerMsg := Message{
				Id:   currentUserId,
				Type: "answer",
				Data: msg.Data,
			}
			answerJSON, err := json.Marshal(answerMsg)
			if err != nil {
				fmt.Printf("error marshal JSON: %s\n", err.Error())
				break
			}
			answerString := string(answerJSON)
			SendMessage(answerString, wsConn)
		case "candidate":
			candidateMsg := Message{
				Id:   currentUserId,
				Type: "candidate",
				Data: msg.Data,
			}
			candidateJSON, err := json.Marshal(candidateMsg)
			if err != nil {
				fmt.Printf("error marshal JSON: %s\n", err.Error())
			}
			candidateString := string(candidateJSON)

			SendMessage(candidateString, wsConn)
		}
	}
}

func SendMessage(msg string, wsConn *websocket.Conn) {
	err := wsConn.WriteMessage(websocket.TextMessage, []byte(msg))
	if err != nil {
		fmt.Printf("error sending message: %s\n", err.Error())
	}
}
func SendOffer(offerMsg Message) {
	offerJSON, err := json.Marshal(offerMsg)
	if err != nil {
		fmt.Printf("error marshal JSON: %s\n", err.Error())
	}
	offerString := string(offerJSON)
	SendMessage(offerString, wsConn)
}

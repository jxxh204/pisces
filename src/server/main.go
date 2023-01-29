package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

type Message struct {
	Type string `json:"type"`
	Data string `json:"data"`
}
type Offer string

var (
	wsUpgrader = websocket.Upgrader {
		ReadBufferSize: 1024,
		WriteBufferSize: 1024,
	}

	wsConn *websocket.Conn
)
var pubOffer Offer

func WsEndpoint(w http.ResponseWriter, r *http.Request) {

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

	// event loop
	for {
		var msg Message
		
		err := wsConn.ReadJSON(&msg)
		if err != nil {
			fmt.Printf("error reading JSON: %s\n", err.Error())
			break
		}

		fmt.Printf("Message Received: %s\n", msg.Type)
		//offer 확인.
	
		answerJson,err := json.Marshal(&msg)
		answerMsg := string(answerJson)
		// fmt.Printf(answerMsg)

		SendMessage(answerMsg)
	}
}

func Pub(w http.ResponseWriter, r *http.Request) {

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

	for {
		var msg Message
		
		err := wsConn.ReadJSON(&msg)
		if err != nil {
			fmt.Printf("error reading JSON: %s\n", err.Error())
			break
		}

		fmt.Printf("Message Received: %s\n", msg.Type)
		switch msg.Type {
		case "offer":
			pubOffer := msg.Data
		   log.Printf("pub offer: %s\n")
		case "answer":
			log.Printf("pub answer: %s\n", msg)
		}
		// refineSendData, err := json.Marshal(sendData)
		// err = c.WriteMessage(mt, refineSendData)
		// if err != nil {
		//    log.Println("write:", err)
		//    break
		// }
	 }
}
func Sub(w http.ResponseWriter, r *http.Request) {

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

	fmt.Printf("pubOffer : %s\n",pubOffer)

	for {
		var msg Message
		
		err := wsConn.ReadJSON(&msg)
		if err != nil {
			fmt.Printf("error reading JSON: %s\n", err.Error())
			break
		}

		fmt.Printf("Message Received: %s\n", msg.Type)
		switch msg.Type {
		case "offer":
		   log.Printf("sub offer: %s\n")
		case "answer":
			log.Printf("sub answer: %s\n", msg)
		}
		// refineSendData, err := json.Marshal(sendData)
		// err = c.WriteMessage(mt, refineSendData)
		// if err != nil {
		//    log.Println("write:", err)
		//    break
		// }
	 }
}

func SendMessage(msg string) {
	err := wsConn.WriteMessage(websocket.TextMessage, []byte(msg))
	if err != nil {
		fmt.Printf("error sending message: %s\n", err.Error())
	}
}


func main() {

	router := mux.NewRouter()

	router.HandleFunc("/socket", WsEndpoint)
	router.HandleFunc("/pub", Pub)
	router.HandleFunc("/sub", Sub)

	log.Fatal(http.ListenAndServe(":9100", router))

}
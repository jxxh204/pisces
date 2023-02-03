package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

type Message struct {
	Type string `json:"type"`
	Data string `json:"data"`
}

var (
	wsUpgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
	wsConn *websocket.Conn
)

var offer string
var answer string

func Chat(w http.ResponseWriter, r *http.Request) {
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
}

func SendMessage(msg string, wsConn *websocket.Conn) {
	err := wsConn.WriteMessage(websocket.TextMessage, []byte(msg))
	if err != nil {
		fmt.Printf("error sending message: %s\n", err.Error())
	}
}

// main 함수는 프로그램이 실행될 때 제일 먼저 실행된다.
func main() {

	router := mux.NewRouter()

	// router.HandleFunc("/socket", WsEndpoint)
	router.HandleFunc("/pub", Pub)
	router.HandleFunc("/sub", Sub)
	router.HandleFunc("/ws", Chat) // 이걸로 개선

	log.Fatal(http.ListenAndServe(":9100", router))

}

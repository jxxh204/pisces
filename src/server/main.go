package main

import (
	"encoding/json"
	"flag"
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

var (
	wsUpgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
	wsConn *websocket.Conn
)
var addr = flag.String("addr", ":9100", "http service address")

var currentUserId string
var users [4]string

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
		case "offer":
			log.Printf("offer: %s\n")
			offerMsg := Message{
				Id:   currentUserId,
				Type: "offer",
				Data: msg.Data,
			}
			offerJSON, err := json.Marshal(offerMsg)
			if err != nil {
				fmt.Printf("error marshal JSON: %s\n", err.Error())
			}
			offerString := string(offerJSON)

			SendMessage(offerString, wsConn)
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

// chat

func serveHome(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL)
	if r.URL.Path != "/" {
		http.Error(w, "Not found", http.StatusNotFound)
		return
	}
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	http.ServeFile(w, r, "home.html")
}

// main 함수는 프로그램이 실행될 때 제일 먼저 실행된다.
func main() {

	// router := mux.NewRouter()

	// router.HandleFunc("/socket", WsEndpoint)
	// router.HandleFunc("/pub", Pub)
	// router.HandleFunc("/sub", Sub)
	// router.HandleFunc("/ws", Chat) // 이걸로 개선

	// err := http.ListenAndServe(*addr, nil)
	// if err != nil {
	// 	log.Fatal("ListenAndServe: ", err)
	// }
	flag.Parse()
	hub := newHub()
	go hub.run()
	log.Printf("Server started on port %s", *addr)
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

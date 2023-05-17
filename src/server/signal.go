package main

import (
	"encoding/json"
	"fmt"
	"time"
)



type Message struct {
	Id   string `json:id`
	Type string `json:"type"`
	Data string `json:"data"`
}
var offerList []string
var answerList []string

func onOfferHandler(msg string, hub *Hub ){
	sendOfferData := Message{
		Id:   currentUserId,
		Type: "offer",
		Data: msg,
	}

	offerJSON, err := json.Marshal(sendOfferData)
	if err != nil {
		fmt.Printf("error marshal JSON: %s\n", err.Error())
	}
	offerString := string(offerJSON)
	offerList = append(offerList, offerString)

	// SendBroadCast(offerString, hub)
}
func onAnswerHandler(msg string, hub *Hub) {
	answerMsg := Message{
		Id:   currentUserId,
		Type: "answer",
		Data: msg,
	}
	answerJSON, err := json.Marshal(answerMsg)
	if err != nil {
		fmt.Printf("error marshal JSON: %s\n", err.Error())
	}
	answerString := string(answerJSON)
	answerList = append(answerList, answerString)
	SendBroadCast(answerString, hub)
}
func onCandidateHandler(msg string, hub *Hub) {
	candidateMsg := Message{
		Id:   currentUserId,
		Type: "candidate",
		Data: msg,
	}
	candidateJSON, err := json.Marshal(candidateMsg)
	if err != nil {
		fmt.Printf("error marshal JSON: %s\n", err.Error())
	}
	candidateString := string(candidateJSON)

	SendBroadCast(candidateString, hub)
}
func SendBroadCast(msg string, wsConn  *Hub) {
	time.Sleep(time.Second * 1) // 1초 뒤 실행
	select {
	case wsConn.broadcast <-[]byte(string(msg)):
		// Message was sent successfully
	default:
		// The channel wasn't ready to receive data
		fmt.Println("error: broadcast channel was not ready")
	}
}

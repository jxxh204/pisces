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

func onOfferHandler(msg string, client *Client ){
	sendOfferData := Message{
		Id:   client.userID,
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
func onAnswerHandler(msg string, client *Client) {
	answerMsg := Message{
		Id:   client.userID,
		Type: "answer",
		Data: msg,
	}
	answerJSON, err := json.Marshal(answerMsg)
	if err != nil {
		fmt.Printf("error marshal JSON: %s\n", err.Error())
	}
	answerString := string(answerJSON)
	answerList = append(answerList, answerString)
	SendBroadCast(answerString,client.userID, client.hub)
}
func onCandidateHandler(msg string, client *Client) {
	candidateMsg := Message{
		Id:   client.userID,
		Type: "candidate",
		Data: msg,
	}
	candidateJSON, err := json.Marshal(candidateMsg)
	if err != nil {
		fmt.Printf("error marshal JSON: %s\n", err.Error())
	}
	candidateString := string(candidateJSON)

	SendBroadCast(candidateString,client.userID, client.hub)
}
func SendBroadCast(candidateString string,UserID string, hub  *Hub) {

	message :=  BroadcastMessage {
		UserID : UserID,
		Data : []byte(candidateString),
	}
	time.Sleep(time.Second * 1) // 1초 뒤 실행
	select {
	case hub.broadcast <- &message:
		// Message was sent successfully
	default:
		// The channel wasn't ready to receive data
		fmt.Println("error: broadcast channel was not ready")
	}
}

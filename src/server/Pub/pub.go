func Pub(w http.ResponseWriter, r *http.Request) {

	wsUpgrader.CheckOrigin = func(r *http.Request) bool {
		// check the http.Request
		// make sure it's OK to access
		return true
	}
	var err error
	pubWsConn, err = wsUpgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Printf("could not upgrade: %s\n", err.Error())
		return
	}

	defer pubWsConn.Close()

	for {
		var msg Message

		err := pubWsConn.ReadJSON(&msg)
		if err != nil {
			fmt.Printf("error reading JSON: %s\n", err.Error())
			break
		}

		fmt.Printf("PUB Message Received: %s\n", msg.Type)
		switch msg.Type {
		case "offer":
			//pub의 offer를 받고 저장.
			offer = msg.Data
			log.Printf("pub offer: %s\n", offer)
		case "answer":
			log.Printf("pub answer: %s\n", msg)
		case "candidate":
			candidateMsg := Message{
				Type: "candidate",
				Data: msg.Data,
			}
			candidateJSON, err := json.Marshal(candidateMsg)
			if err != nil {
				fmt.Printf("error marshal JSON: %s\n", err.Error())
			}
			candidateString := string(candidateJSON)

			SendMessage(candidateString, subWsConn)
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
	subWsConn, err = wsUpgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Printf("could not upgrade: %s\n", err.Error())
		return
	}

	defer subWsConn.Close()
	// sub은 접속과 동시에 pub이 미리 보내놓은 offer를 받는다.
	fmt.Printf("helloSubClient : %s\n", offer)

	offerMsg := Message{
		Type: "offer",
		Data: offer,
	}
	offerJSON, err := json.Marshal(offerMsg)
	if err != nil {
		fmt.Printf("error marshal JSON: %s\n", err.Error())
	}
	offerString := string(offerJSON)

	SendMessage(offerString, subWsConn)
	//
	for {
		var msg Message

		err := subWsConn.ReadJSON(&msg)
		if err != nil {
			fmt.Printf("error reading JSON: %s\n", err.Error())
			break
		}

		fmt.Printf("SUB Message Received: %s\n", msg.Type)
		if msg.Type == "answer" {
			// sub에서 pub에게 보내는 답장.
			answerMsg := Message{
				Type: "answer",
				Data: msg.Data,
			}
			answerJSON, err := json.Marshal(answerMsg)
			if err != nil {
				fmt.Printf("error marshal JSON: %s\n", err.Error())
				break
			}
			answerString := string(answerJSON)
			SendMessage(answerString, pubWsConn)
		}
		if msg.Type == "candidate" {
			candidateMsg := Message{
				Type: "candidate",
				Data: msg.Data,
			}
			candidateJSON, err := json.Marshal(candidateMsg)
			if err != nil {
				fmt.Printf("error marshal JSON: %s\n", err.Error())
			}
			candidateString := string(candidateJSON)

			SendMessage(candidateString, pubWsConn)
		}
	}
}
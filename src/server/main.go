package main

import (
	"flag"
	"log"
	"net/http"
)
var addr = flag.String("addr", ":3000", "http service address")

// chat

func serveHome(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./index.html")

	log.Println(r.URL)
	if r.URL.Path != "/" {
		http.Error(w, "Not found", http.StatusNotFound)
		return
	}
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
}

// main 함수는 프로그램이 실행될 때 제일 먼저 실행된다.
func main() {

	// router := mux.NewRouter()

	// router.HandleFunc("/socket", WsEndpoint)
	// router.HandleFunc("/pub", Pub)
	// router.HandleFunc("/sub", Sub)
	// http.HandleFunc("/", serveHome) //포폴 사이트 올리면될듯.
	// http.HandleFunc("/ws", Chat) // 이걸로 개선

	// err := http.ListenAndServe(*addr, nil)
	// if err != nil {
	// 	log.Fatal("ListenAndServe: ", err)
	// }
	flag.Parse()
	hub := newHub()
	go hub.run()
	log.Printf("Server started on port %s", *addr)
	
	http.HandleFunc("/", serveHome)
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

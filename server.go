package main

import (
	"github.com/rocketlaunchr/https-go"
	"log"
	"net/http"
)

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) { w.WriteHeader(http.StatusNoContent) })

	httpServer, _ := https.Server("8080", https.GenerateOptions{Host: "thecucumber.app"})
	log.Fatal(httpServer.ListenAndServeTLS("", ""))
}

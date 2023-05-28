package main

import (
	"log"
	"net/http"
	"os"
	"strings"
)

func main() {
	http.HandleFunc("/", serveAppPage)
	//http.Handle("/", http.FileServer(http.Dir("")))
	log.Println(http.ListenAndServe(":8082", nil)) // , http.HandlerFunc(handle)
}

func serveAppPage(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	path = strings.Trim(path, "/")
	log.Println(path)
	if path == "" {
		path = "index.html"
	}
	if !strings.Contains(path, ".") {
		path += ".html"
	}
	if FileExists(path) {
		http.ServeFile(w, r, path)
	} else {
		http.ServeFile(w, r, "/notfound.html")
	}
}

// FileExists reports whether the named file or directory exists.
func FileExists(name string) bool {
	if _, err := os.Stat(name); err != nil {
		if os.IsNotExist(err) {
			return false
		}
	}
	return true
}

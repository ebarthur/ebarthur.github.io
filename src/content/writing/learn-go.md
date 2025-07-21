---
title: "Why Go?"
description: "Building a Basic API and Embracing Concurrency with Goroutines."
createdAt: "16 June 2024"
---

When Go 1.22 dropped, I was deep in TypeScript. I had bookmarked plenty of Go content but never got around to it. Eventually, I picked it up, and it stuck. If you're still on the fence, Go’s own [Why Go?](https://go.dev/solutions/) page makes a solid case.

I've written Go on and off since then. Every time I go back to JavaScript, I’m reminded of how chaotic that ecosystem can be. Still, I’ve built a solid foundation with Go.

A few resources helped me along the way:

- [Learning Go](https://www.amazon.com/Learning-Go-Idiomatic-Real-World-Programming/dp/1492077216) by Jon Bodner
- [Concurrency in Go](https://www.amazon.com/Concurrency-Go-Tools-Techniques-Developers/dp/1491941197) by Katherine Cox-Buday

Let’s build a simple API server in Go. No frameworks, just the standard library.

## Writing a simple API in Go

Install Go from [golang.org/dl](https://golang.org/dl/), then verify your installation:

```powershell
$ go version
```

Initialize a new module:

```bash
go mod init github.com/ebarthur/golang/api
```

You should see a `go.mod` file. Think of it as the Go version of `package.json`.

Create a `main.go` file:

```go
package main

import (
	"log"
)

func main() {
	server := NewAPIServer(":4032")
	err := server.Run()
	if err != nil {
		log.Fatal(err)
	}
}
```

Now create an `api.go` file:

```go
package main

import (
	"log"
	"net/http"
)

type APIServer struct {
	addr string
}

func NewAPIServer(addr string) *APIServer {
	return &APIServer{
		addr: addr,
	}
}

func (s *APIServer) Run() error {
	router := http.NewServeMux()

	router.HandleFunc("GET /users/{UserID}", func(w http.ResponseWriter, r *http.Request) {
		userID := r.PathValue("UserID")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(userID))
	})

	server := http.Server{
		Addr:    s.addr,
		Handler: RequestLoggerMiddleware(router),
	}

	log.Printf("Server is listening at %s", s.addr)
	return server.ListenAndServe()
}
```

### Middleware

Add a logging middleware:

```go
func RequestLoggerMiddleware(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("METHOD: @%s\nPath: %s", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	}
}
```

Add an auth middleware:

```go
func RequireAuthMiddleWare(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")
		if token != "Bearer token" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	}
}
```

To chain them together:

```go
server := http.Server{
	Addr:    s.addr,
	Handler: RequireAuthMiddleWare(RequestLoggerMiddleware(router)),
}
```

## Run & Test

Start the server:

```bash
go run .
```

Test the endpoint:

```bash
$ curl http://localhost:4032/users/12
```

Include the auth token:

```bash
$ curl -H "Authorization: Bearer token" http://localhost:4032/users/12
```

The middleware checked the request header and verified the token, so we were allowed through. That was fun.

Maybe next time, we’ll connect a database, add more routes, and organize the project a bit more.

package main

import (
	"html/template"
	"net/http"

	"git.progwebtech.com/captive/wifispace/nds"
	"github.com/gin-gonic/gin"
)

var index = "./dist/survey.html"
var funcs = map[string]interface{}{
	"asset": func(base, key string) (template.HTML, error) {
		return template.HTML(""), nil
	},
}

func main() {
	router := gin.Default()
	router.Delims("<<", ">>")
	router.SetFuncMap(funcs)
	router.LoadHTMLFiles("./dist/survey.html")
	router.GET("/", func(c *gin.Context) {
		data := map[string]interface{}{
			"redir":  "",
			"Client": nds.Client{Mac: "mac", Ip: "ip"},
		}
		c.HTML(http.StatusOK, "survey.html", data)
	})
	router.Static("/sa/survey", "./dist")
	router.Run(":3333")
}

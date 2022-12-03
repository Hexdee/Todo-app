package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

type task struct {
    ID     string  `json:"id"`
    Text  string  `json:"text"`
    Done bool  `json:"done"`
}

var tasks = []task{
    {ID: "1", Text: "Read", Done: false},
    {ID: "2", Text: "Eat", Done: false},
    {ID: "3", Text: "Sleep", Done: false},
}

func main() {
    router := gin.Default()
    router.Use(cors.Default())
    router.GET("/tasks", getTasks)
    router.GET("/tasks/:id", getTaskByID)
    router.POST("/task", postTask)

    router.Run("localhost:8080")
}

// getTasks responds with the list of all tasks as JSON.
func getTasks(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, tasks)
}

// postTasks adds an task from JSON received in the request body.
func postTask(c *gin.Context) {
    var newTask task

    // Call BindJSON to bind the received JSON to
    // newTask.
    if err := c.BindJSON(&newTask); err != nil {
        return
    }

    // Add the new task to the slice.
    tasks = append(tasks, newTask)
    c.IndentedJSON(http.StatusCreated, newTask)
}

// getTaskByID locates the task whose ID value matches the id
// parameter sent by the client, then returns that task as a response.
func getTaskByID(c *gin.Context) {
    id := c.Param("id")

    // Loop through the list of albums, looking for
    // an album whose ID value matches the parameter.
    for _, t := range tasks {
        if t.ID == id {
            c.IndentedJSON(http.StatusOK, t)
            return
        }
    }
    c.IndentedJSON(http.StatusNotFound, gin.H{"message": "task not found"})
}
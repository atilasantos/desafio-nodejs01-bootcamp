const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function logRequests(request, response, next) {

}

function getIdIndex(id) {
    return repositories.findIndex(repo => repo.id == id);
}

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const { id, title, url, techs } = request.body;

    const repositorie = {'id': uuid(),
                        'title': title,
                        'url': url,
                        'techs': techs,
                        'likes': 0};

    repositories.push(repositorie);
    console.log(repositorie);
    return response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
    
    const { title, url, techs} = request.body;
    const { id } = request.params;

    console.log(id);

    const repoIndex = getIdIndex(id);
    console.log(getIdIndex());
    if(repoIndex < 0) {
        return response.status(400).json({error: "Id not found!"});
    }

    repositories[repoIndex].title = title;
    repositories[repoIndex].url = url;
    repositories[repoIndex].techs = techs;
    repositories[repoIndex].likes = repositories[repoIndex].likes;
    
    return response.json(repositories[repoIndex]);
    
});

app.delete("/repositories/:id", (request, response) => {

    const { id } = request.params;
    console.log(id);

    const repoIndex = getIdIndex(id);
    if(repoIndex < 0) {
        return response.status(400).json({error: "Id not found!"});
    }

    const removedRepo = repositories.splice(repoIndex,1);

    return response.status(204).json(removedRepo);

});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

    const repoIndex = getIdIndex(id);
    if(repoIndex < 0){
        return response.status(400).json({error: 'Id not found!'});
    }
    console.log(id);
    console.log(repositories[repoIndex].likes);
    repositories[repoIndex].likes += 1;
    const formatLike = {
        "likes": repositories[repoIndex].likes
    }
    console.log(formatLike);
    return response.json(formatLike);
});

module.exports = app;

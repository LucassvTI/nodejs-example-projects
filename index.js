const express = require("express");

const server = express();
server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Criar Server NodeJS",
    tasks: ["Criar server", "Criar rotas", "Criar Middlewares"]
  },
  {
    id: "2",
    title: "Arrumar Problema",
    tasks: ["Atualizar objeto"]
  }
];
var requestions = 0;
//Middlewares
server.use((req, res, next) => {
  requestions++;
  console.log(`Request ${requestions} Metodo ${req.method} Rota ${req.url}`);
  next();
});

function idVerify(req, res, next) {
  const { id } = req.params;

  if (!projects.find(data => data.id === id)) {
    return res.json({ message: "Erro id não encontrado" });
  }

  return next();
}

//Routes
//Routes referente aos projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});

server.put("/projects/:id", idVerify, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.map(data => {
    if (data.id === id) {
      data.title = title;
    }
  });
  return res.json(projects);
});

server.delete("/projects/:id", idVerify, (req, res) => {
  const { id } = req.params;

  projects.forEach((data, index) => {
    if (data.id === id) {
      projects.splice(index, 1);
    }
  });
  return res.send();
});

//Routes referente as tasks
server.post("/projects/:id/tasks", idVerify, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.filter(data => {
    if (data.id === id) {
      data.tasks.push(title);
      return data;
    }
  });

  return res.json(project);
});

server.listen(3000);

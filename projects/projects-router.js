const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

// GET all projects
router.get('/', (req, res) => {
    Projects.getProjects()
    .then(projects => {
        for(let i=0; i<projects.length; i++) {
           if (projects[i].completed == 0) {
               projects[i].completed = false;
           } else if (projects[i].completed === 1) {
               projects[i].completed = true;
           }
        }
        res.status(200).json(projects);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Something went wrong while fetching project data' })
    })
});

// GET all resources
router.get('/resources', (req, res) => {
    Projects.getResources()
    .then(resources => {
        res.status(200).json(resources);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Something went wrong while fetchin resources data" })
    })
});

// GET all tasks
router.get('/tasks', (req, res) => {
    Projects.getTasks()
    .then(tasks => {
        for (let i=0; i<tasks.length; i++) {
            if (tasks[i].completed === 0) {
                tasks[i].completed = false;
            } else if (tasks[i].completed === 1) {
                tasks[i].completed = true;
            }
        }
        res.status(200).json(tasks);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: 'Something went wrong while attempting to fetch tasks data' })
    })
});

// GET tasks for project
router.get('/:id/tasks', validateProjectId, (req, res) => {
    const id = req.params.id;

    Projects.getProjectTasks(id)
    .then(tasks => {
        for (let i=0; i<tasks.length; i++) {
            if (tasks[i].completed === 0) {
                tasks[i].completed = false;
            } else if (tasks[i].completed === 1) {
                tasks[i].completed = true;
            }
        }
        res.status(200).json(tasks);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: 'Something went wrong while fetching project tasks' })
    })
});

// POST add projects
router.post('/', validate, (req, res) => {
    const projectData = req.body;

    Projects.addProject(projectData)
    .then(project => {
        if(project.completed === 0) {
            project.completed = false;
        } else if (project.completed === 1) {
            project.completed = true;
        }
        res.status(201).json(project);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Something went wrong while attempting to add project to database" })
    })
})

// POST add resources
router.post('/resources', validate, (req, res) => {
    const resourceData = req.body;

    Projects.addResource(resourceData)
    .then(resource => {
        res.status(201).json(resource);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Something went wrong while attempting to add resource to database" })
    })
});

// POST add tasks to a project
router.post('/:id/tasks', validateProjectId, validateTask, (req, res) => {
    const id = req.params.id;
    req.body.project_id = id;
    const taskData = req.body;

    Projects.addTask(taskData)
    .then(task => {
        if (task.completed === 0) {
            task.completed = false;
        } else if (task.completed === 1) {
            task.completed = true;
        }
        res.status(201).json(task);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: 'Failed to add task' })
    })
})

// MIDDLEWARE
function validate(req, res, next) {
    const data = req.body;
    if (!data) {
        res.status(400).json({ error: 'missing data' })
    } else if (!data.name) {
        res.status(400).json({ error: 'missing required name' })
    } else {
        next();
    }
}

function validateTask(req, res, next) {
    const data = req.body;
    if (!data) {
        res.status(400).json({ error: 'missing data' })
    } else if (!data.description) {
        res.status(400).json({ error: 'missing required description' })
    } else {
        next();
    }
}

function validateProjectId(req, res, next) {
  const id = req.params.id;
    Projects.getProjectById(id) 
    .then(project => {
        if (project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({ message: 'Project with requested ID does not exist' })
        }
    })
    .catch(error => {
          res.status(500).json({ error: 'The project information could not be retrieved.' })
      })
    
}

module.exports = router;
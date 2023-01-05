import { Router } from "express";
import coursesController from "../controllers/courses.controller";
import groupsController from "../controllers/groups.controller";

import roomsController from "../controllers/rooms.controller";
import teachersController from "../controllers/teachers.controller";

const route = Router()

route
     .get('/rooms', roomsController.GET)
     .post('/rooms', roomsController.POST)

     .get('/courses', coursesController.GET)
     .post('/courses', coursesController.POST)
     
     .get('/teachers/:id', teachersController.GET)
     .post('/teachers', teachersController.POST)

     .get('/groups/:id', groupsController.GET)
     .post('/groups', groupsController.POST)
     .put('/groups/:id', groupsController.PUT)

export default route
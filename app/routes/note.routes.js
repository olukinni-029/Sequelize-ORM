module.exports = app => {
    const notes = require("../controllers/note.controller.js");
    var router = require("express").Router();

    router.post("/", notes.create);

    router.get("/",notes.findAll);

    router.put("/:id",notes.update);

    router.get("/:id",notes.findOne);

    router.delete("/:id",notes.delete);

    app.use('/api/notes',router);
};
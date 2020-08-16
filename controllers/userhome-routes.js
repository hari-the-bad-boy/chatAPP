const path = require("path");
const fs = require("fs");
var db = require("../models");

var router = (app) => {

    app.get('/userhome', (request, response) => {
        response.send('userhome')
    })

    app.get('/api/userhome', (request, response) => {
        db.Text.findAll({})
            .then((result) => {
                response.json(result);
            })
    })

    app.get('/textcomments/:id', (request, response) => {
        response.send('comment')
    })

    app.get('/api/textcomments/:id', (request, response) => {
        var textId = request.params.id;
        db.Text.findOne({
            where: { id: textId },
            include: [db.Comment]
        })
            .then((result) => {
                response.json(result)
            })
    })

    app.post('/post/comments/create', (request, response) => {
        var newComment = request.body;
        db.Comment.create(newComment)
            .then((result) => {
                response.json(result)
            })
    })

    app.get('/post/comments', (request, response) => {
        db.Comment.findAll({})
            .then((result) => {
                response.json(result);
            })
    })

    app.get('/submit-txt-img', (request, response) => {
        response.send('submit');
    })

    app.get('/api/submit-text-img', (request, response) => {
        var loggedInUserId = request.user.id;
        db.Text.findOne({
            where: { userId: loggedInUserId },
            order: [['createdAt', 'DESC']]
        })
            .then((result) => {
                response.json(result);
            })
    })

    app.put('/api/submit-txt-img', (request, response) => {
        var loggedInUserId = request.user.id;
        db.Text.update(request.body,
            {
                where: { id: request.body.id }
            })
            .then((dbText) => {
                response.json(dbText);
            })
    })

    app.post('/submit', (request, response) => {
        response.render('submit')
    })

    var multer = require("multer");
    var handleError = (error, response) => {
        response
            .status(500)
            .contentType("text/plain")
            .end("Something went terribly wrong...");
    };
    var upload = multer({ dest: "public/assets/uploads/" });

    app.post("/upload-text-img", upload.single("file"), (request, response, next) => {
        var extension = path.extname(request.file.originalname).toLowerCase();
        var tempFilePath = request.file.path;
        var newFilePath = path.join("public/assets/uploads/", request.file.filename + extension);

        if (extension === ".png") {
            fs.rename(tempFilePath, newFilePath, error => {
                if (error) return handleError(error, response);
                db.Text.create({
                    image: '/assets/uploads/' + request.file.filename + extension,
                    userId: request.user.id
                })
                    .then((text) => {
                        response.redirect('/submit-txt-img')
                    })
            })
        }
    });
}
module.exports = router;
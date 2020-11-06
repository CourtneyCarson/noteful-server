const express = require('express')
const folderService = require('./folder-service')
const xss = require('xss')

const folderRouter = express.Router()
const jsonParser = express.json()


const serializeFolder = folder => ({
  id: folder.id,
  name: xss(folder.folder_name),
});


// / path
folderRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    folderService.getAllFolders(knexInstance)
      .then(folders => {
        res.json(folders.map(serializeFolder))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { folder_name } = req.body
    const newFolder = { folder_name }

    folderService.insertFolder(
      req.app.get('db'),
      newFolder
    )
      .then(folder => {
        res
          .status(201)
          .location(`/${folder.id}`)
          .json(serializeFolder(folder))
      })
      .catch(next)
  })



  // :id path
folderRouter
  .route('/:id')
  .all((req, res, next) => {
    folderService.getById(
      req.app.get('db'),
      req.params.id
    )
      .then(folder => {
        if (!folder) {
          return res.status(404).json({
            error: { message: `Folder doesn't exist` }
          })
        }
        res.article = folder
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeFolder(res.folder))
  })
  .delete((req, res, next) => {
    folderService.deleteFolder(
      req.app.get('db'),
      req.params.id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { id } = req.params
    const updatedFolder = req.body
    console.log(updatedFolder)
    folderService.updateFolder(req.app.get("db"), id, updatedFolder)
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

  

module.exports = folderRouter





//create - post
//read -get
//update - patch
//delete - delete
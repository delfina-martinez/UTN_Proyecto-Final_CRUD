/* Routes, render */

const express = require('express');

const router = express.Router();

const connection = require('../../config/connection');

router.get('/', (req, res) => {
    connection.query('SELECT * FROM mangas', (err, rows) => {
        if (err) {
            throw err;
        }
        else {
            res.render('index.ejs', { modelo: rows })
        }
    })
})

// Ruta para CREAR registros
router.get('/create', (req, res) => {
    res.render('create.ejs', { modelo: {}});
})

// Ruta para EDITAR registros
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM mangas WHERE id_manga = ?', [id], (err, rows) => {
        if (err) {
            throw err;
        } else {
            res.render('edit.ejs', { modelo : rows[0] });
        }
    })
});

// Ruta para ELIMINAR registros
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM mangas WHERE id_manga = ?', [id], (err, rows) => {
        if (err) {
            throw err;
        } else {
            res.render('delete.ejs', { modelo : rows[0]});
        }
    })
});

router.get('/*', (req, res) => {
    res.render('notfound.ejs')
});

// Llama a los métodos de crud.js
const crud = require('../controllers/crud');
router.post('/save', crud.save);
router.post('/update', crud.update);
router.post('/delete', crud.delete);

module.exports = router;
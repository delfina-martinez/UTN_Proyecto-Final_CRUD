const connection = require('../../config/connection');

// Consultas a la BASE DE DATOS y redireccionamientos
exports.save = (req, res) => {
    const manga = {
        ISBN: req.body.ISBN,
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        idioma: req.body.idioma,
        genero: req.body.genero,
        stock: req.body.stock,
        precio: req.body.precio
    };

    connection.query('SELECT * FROM mangas WHERE ISBN=?', [manga.ISBN], (err, results)=>{
        if (err) {
            console.log(err);
        }
        else {
            if (results.length == 0) // Si es igual a 0, es porque ese manga no existe, si no existe sí puede darlo de alta
            {
                connection.query('INSERT INTO mangas SET ?', manga, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.redirect('/');
                    }
                });
            }
            else {
                let alert = require('alert');
                alert("ISBN existente. Ingrese los datos nuevamente.");
                res.redirect('/create');
            }
        }
    })
}

exports.update = (req, res) => {
    const id = req.body.id;
    const stock = req.body.stock;
    const  precio = req.body.precio;
   
    connection.query('UPDATE mangas SET stock=?, precio=? WHERE id_manga=?', [stock, precio, id], (err)=> {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
}

exports.delete = (req, res) => {
    const id = req.body.id;
    connection.query('DELETE FROM mangas WHERE id_manga = ?', [id], (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
};
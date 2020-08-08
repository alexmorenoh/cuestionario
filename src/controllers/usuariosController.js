const timestamp = require('time-stamp');
const { format } = require('mysql');
const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios', (err, usuarios) => {
            if(err) {
                res.json(err);
            }
            res.render('usuarios',{
                data: usuarios
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO usuarios set ?', [data], (err, usuarios) =>{
            console.log(data);
            res.redirect('/');
    })
});
};

controller.edit = (req, res) => {
    const { registro } = req.params;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM usuarios WHERE registro = ?", [registro], (err, usuarios) => {
        res.render('usuarios_edit', {
          data: usuarios[0]
        })
      });
    });
  };

controller.update = (req, res) => {
    const { registro } = req.params;
    const newUsuario = req.body;
    console.log(newUsuario);
    req.getConnection((err, conn) => {
      conn.query('UPDATE usuarios SET ? WHERE registro = ?', [newUsuario, registro], (err, rows) => {
      res.redirect('/');
    });
    });
  };

controller.delete = (req, res) => {
    const { registro } = req.params;
    req.getConnection((err, connection) => {
      connection.query('DELETE FROM usuarios WHERE registro = ?', [registro], (err, rows) => {
        res.redirect('/');
      });
    });
  };

controller.listQuiz = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM preguntas', (err, preguntas) => {
            if(err) {
                res.json(err);
            }
            res.render('listQuiz',{
                data: preguntas
            });
        });
    });
};

controller.saveQuiz = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
      conn.query('INSERT INTO preguntas set ?', [data], (err, preguntas) =>{
          console.log(preguntas);
          res.redirect('listQuiz');
      });
  })
};

controller.quizEdit = (req, res) => {
  const { id_preg } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM preguntas WHERE id_preg = ?", [id_preg], (err, preguntas) => {
      res.render('quizEdit', {
        data: preguntas[0]
      })
    });
  });
};

controller.updateQuiz = (req, res) => {
  const { id_preg } = req.params;
  const newQuiz = req.body;
   req.getConnection((err, conn) => {
     conn.query("UPDATE preguntas set ? where id_preg = ?", [newQuiz, id_preg], (err, preguntas) => {
       res.redirect('/');
     });
   });
 };

controller.deleteQuiz = (req, res) => {
  const { id_preg } = req.params;
   req.getConnection((err, conn) => {
     conn.query("DELETE FROM preguntas where id_preg = ?", [id_preg], (err, preguntas) => {
      res.redirect('/');
     });
   });
 };

 controller.preparaExam = (req, res) =>
 {
   const { } = req.body;
   var createAt = {
      id: null,
      Fecha_inicio: timestamp('YYYY/MM/DD:mm:ss')
                }

     Fecha_inicio=timestamp();
     console
     req.getConnection((err, conn) => {
     conn.query('INSERT INTO examen set ?', [createAt], (err, horainicio) =>{
      console.log('Fecha de incio antes de contestar' + createAt.Fecha_inicio);
    });
    });
     req.getConnection((err, conn) => {
      conn.query('SELECT * FROM preguntas', (err, preguntas) => {
          if(err) {
              res.json(err);
          }
          res.render('hacerQuiz',{
              data: preguntas
          });
      });
   });
 };

controller.addExam = (req, res) => {
  const data = req.body;
  const newRespuestas =
       {
      registro, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10 
      }=req.body;

  req.getConnection((err, conn) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM examen", (err, allExam) => {
      if(err) {
        console.log('No hay examen definido');
        }
        var buscaInicio = {
          id,
          Fecha_inicio
        }=allExam;
        var ultimaFecha = allExam.length-1;
       
        conn.query("SELECT * FROM preguntas", (err, preguntas) =>
    {
      if(err) {
              console.log('No se econtro preguntas');
              }
              const comparaRespuesta = {
                  id_preg,
                  resp_correct
                  }=preguntas;

       console.log(comparaRespuesta[0].resp_correct);

        var enCa = {
        id_cal: null,
        registro_cal: 0,
        cal1: 0,
        cal2: 0,
        cal3: 0,
        cal4: 0,
        cal5: 0,
        cal6: 0,
        cal7: 0,
        cal8: 0,
        cal9: 0,
        cal10: 0,
        cal_T: 0,
        ini_exam: 0,
        fin_exam: timestamp('YYYY/MM/DD:mm:ss')
              }
        if(newRespuestas.p1==comparaRespuesta[0].resp_correct) {enCa.cal1=10;}  else {enCa.cal1=0;};
        if(newRespuestas.p2==comparaRespuesta[1].resp_correct) {enCa.cal2=10;}  else {enCa.cal2=0;};
        if(newRespuestas.p3==comparaRespuesta[2].resp_correct) {enCa.cal3=10;}  else {enCa.cal3=0;};
        if(newRespuestas.p4==comparaRespuesta[3].resp_correct) {enCa.cal4=10;}  else {enCa.cal4=0;};
        if(newRespuestas.p5==comparaRespuesta[4].resp_correct) {enCa.cal5=10;}  else {enCa.cal5=0;};
        if(newRespuestas.p6==comparaRespuesta[5].resp_correct) {enCa.cal6=10;}  else {enCa.cal6=0;};
        if(newRespuestas.p7==comparaRespuesta[6].resp_correct) {enCa.cal7=10;}  else {enCa.cal7=0;};
        if(newRespuestas.p8==comparaRespuesta[7].resp_correct) {enCa.cal8=10;}  else {enCa.cal8=0;};
        if(newRespuestas.p9==comparaRespuesta[8].resp_correct) {enCa.cal9=10;}  else {enCa.cal9=0;};
        if(newRespuestas.p10==comparaRespuesta[9].resp_correct) {enCa.cal10=10;} else {enCa.cal10=0;};
        enCa.cal_T = enCa.cal1 + enCa.cal2 + enCa.cal3 + enCa.cal4 + enCa.cal5 + enCa.cal6 + enCa.cal7 + enCa.cal8+enCa.cal9 + enCa.cal10;
        ini_exam = buscaInicio[ultimaFecha].Fecha_inicio;    
        fin_exam = timestamp();
        conn.query("SELECT * FROM usuarios", (err, usuarios)  =>
        { 
          if(err) {
              res.json(err);
              res.redirect('hacerQuiz');
              }
              const comparaUsuario = {
                registro,
                fullname,
                username,
                password,
                correo
              }=usuarios;
      
              console.log(comparaUsuario[0].registro);
              console.log(newRespuestas.registro);
              console.log(comparaUsuario.length);

             for(var i = 0; i < comparaUsuario.length; i++)
              {
                console.log('Registro Encontrado dentro de for: '+comparaUsuario[i].registro);
               if(comparaUsuario[i].registro==newRespuestas.registro){
                console.log('Registros iguales se manda a tabla: '+comparaUsuario[i].registro +' '+ newRespuestas.registro);
                enCa.registro_cal = comparaUsuario[i].registro;
                console.log(enCa);
                conn.query('INSERT INTO calificar set ?', [enCa], (err, enCa) =>{
                  if(err) {
                    console.log('Se borro fecha de inicio');
                           }
                    console.log('se guardo calificación')  
                    });
                    }else{
                      console.log('Fin de resgistros');
                    }
              }

                     res.redirect('/');
     });
    });
    })
    });
  });
};

 controller.buscaCal= (req, res) => {
  const { registro } = req.body;
  console.log(registro);
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM calificar WHERE registro_cal = ?", [registro], (err, calificar) => {
          if(err) {
              res.json(err);
              res.send('<h1>No se encontro registro</h1>');
          }
          res.render('presentaCal',{
              data: calificar
          });
      });
  });
}

module.exports = controller;
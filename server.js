import 'dotenv/config';
import { db } from './config/db.config.js';
import { app } from './app.js';
import { transporter } from './utils/nodemailer.js';
import { initModel } from './models/initModel.js';

const port = process.env.PORT || 3032;

db.authenticate()
  .then(() => {
    console.log(`Database Synced 👊`);

    return initModel();
  })
  .then(() => {
    return db.sync();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`App Running on Port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the data 💀`, err);
  });

transporter.verify((error, success) => {
  if (error) {
    console.error('Error al conectar con el servidor de correo:', error);
  } else {
    console.log('Conexión exitosa con el servidor de correo', success);
  }
});

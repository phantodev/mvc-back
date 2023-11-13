import pool from "../config/db.js";
import supabase from "../config/storage.js";

// export function getAllUsers(req, res) {
//   res.send("Acessei a rota!");
// }

const UsersControllers = {
  getAllUsers: (req, res) => {
    pool.query('SELECT * FROM "Users"', (errors, results) => {
      if (errors) {
        return res.status(500).json({ error: errors.message });
      }
      return res.status(200).json(results.rows);
    });
  },
  createUser: (req, res) => {
    const { birthday, name, email } = req.body;

    const query =
      'INSERT INTO "Users" (birthday,name, email) VALUES ($1,$2,$3)';
    const values = [birthday, name, email];

    pool.query(query, values, (errors, results) => {
      if (errors) {
        return res.status(500).json({ error: errors.message });
      }
      return res.status(200).json({
        message: "Usuário inserido com sucesso!",
        rows: results.rowCount,
      });
    });
  },
  deleteUser: (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM "Users" WHERE id = $1';
    const values = [id];

    pool.query(query, values, (errors, results) => {
      if (errors) {
        return res.status(500).json({ error: errors.message });
      }
      return res.status(200).json({
        message: "Usuário deletado com sucesso!",
        rows: results.rowCount,
      });
    });
  },
  uploadAvatar: async (req, res) => {
    // req.file é onde o arquivo de imagem estará (usando, por exemplo, o middleware multer)
    if (!req.file) {
      return res.status(400).send("Nenhum arquivo foi enviado.");
    }

    try {
      const filePath = `user_avatars/98989/avatar.jpg`;
      const { data, error } = await supabase.storage
        .from("curso-elaborata-storage")
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          cacheControl: "3600",
          upsert: true, // Permite substituir o arquivo se já existir
        });

      if (error) throw error;

      // Resposta com sucesso
      res.status(200).json({
        message: "Upload realizado com sucesso",
        data: data,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateUser: (req, res) => {
    const id = req.params.id;
    const { birthday, email, name, address, gmaps } = req.body;

    // Verificar e corrigir a data de aniversário
    let birthdayISO;
    try {
      const timestamp = new Date(birthday);
      if (!isNaN(timestamp.getTime())) {
        birthdayISO = timestamp.toISOString();
      } else {
        throw new Error("Data de aniversário inválida");
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    // Preparar os valores para a consulta
    const addressJSON = JSON.stringify(address);
    const gmapsJSON = JSON.stringify(gmaps);

    const query =
      'UPDATE "Users" SET birthday = $1, email = $2, name = $3, address = $4, gmaps = $5 WHERE id = $6';
    const values = [birthdayISO, email, name, addressJSON, gmapsJSON, id];

    pool.query(query, values, (errors, results) => {
      if (errors) {
        return res.status(500).json({ error: errors.message });
      }
      return res.status(200).json({
        message: "Usuário atualizado com sucesso!",
        rows: results.rowCount,
      });
    });
  },
};

export default UsersControllers;

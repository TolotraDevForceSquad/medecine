**SUJET 12 : Développer une application React Native permettant :**

* d'ajouter des données dans une table Medecin (numed, nom, Nombre de jours, taux journalier)
* d'afficher les données dans un composant ListView( nom, Nombre de jours, taux journalier, prestation) avec prestation= Nombre de jours * taux journalier
* de modifier et supprimer un enregistrement à partir du ListView
* d'afficher en bas du tableau la prestation total, minimal et maximal des medecins
* de visualiser la prestation total, minimal et maximal dans un histogramme ou un camembert


const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testmedecin'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connecté à MySQL');
});

// Créer la table si elle n'existe pas
const createTable = `
CREATE TABLE IF NOT EXISTS medecin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  nb_jours INT,
  taux_journalier FLOAT
)`;
db.query(createTable, err => {
  if (err) throw err;
  console.log('Table vérifiée/créée');
});

// Routes

// Obtenir tous les médecins + prestation calculée
app.get('/api/medecins', (req, res) => {
  const sql = `SELECT *, (nb_jours * taux_journalier) AS prestation FROM medecin`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Obtenir les stats globales
app.get('/api/medecins/stats', (req, res) => {
  const sql = `
    SELECT 
      SUM(nb_jours * taux_journalier) AS total,
      MIN(nb_jours * taux_journalier) AS min,
      MAX(nb_jours * taux_journalier) AS max
    FROM medecin`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

// Ajouter un médecin
app.post('/api/medecins', (req, res) => {
  const { nom, nb_jours, taux_journalier } = req.body;
  const sql = "INSERT INTO medecin (nom, nb_jours, taux_journalier) VALUES (?, ?, ?)";
  db.query(sql, [nom, nb_jours, taux_journalier], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, nom, nb_jours, taux_journalier });
  });
});

// Modifier un médecin
app.put('/api/medecins/:id', (req, res) => {
  const { id } = req.params;
  const { nom, nb_jours, taux_journalier } = req.body;
  const sql = "UPDATE medecin SET nom=?, nb_jours=?, taux_journalier=? WHERE id=?";
  db.query(sql, [nom, nb_jours, taux_journalier, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Supprimer un médecin
app.delete('/api/medecins/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM medecin WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur API lancé sur http://localhost:${PORT}`);
});

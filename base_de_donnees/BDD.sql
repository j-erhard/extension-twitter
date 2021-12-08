-- mysql --local-infile --user=root --password=root --host=localhost  bdd_extension
-- pour voir les warnings -> SHOW WARNINGS;

CREATE DATABASE IF NOT EXISTS bdd_extension;
USE bdd_extension;

DROP TABLE IF EXISTS verifie;
DROP TABLE IF EXISTS signalements;
DROP TABLE IF EXISTS tweets;
DROP TABLE IF EXISTS bannissements;
DROP TABLE IF EXISTS utilisateurs;
DROP TABLE IF EXISTS jugements;

CREATE TABLE jugements (
    id              INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    decision        ENUM('vrai', 'faux', 'tendancieux', 'no information') NOT NULL,
    description     LONGTEXT
);

CREATE TABLE utilisateurs (
    id              INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    prenom          VARCHAR(20),
    nom             VARCHAR(20),
    email           VARCHAR(50) UNIQUE NOT NULL,
    password        LONGTEXT NOT NULL,
    type            ENUM('admin', 'verificateur', 'visiteur') NOT NULL DEFAULT 'verificateur'
);

CREATE TABLE bannissements (
    id              INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    idUtilisateur   INT,
    raison          LONGTEXT,
    DateBan         DATE NOT NULL,
    Duree           INT NOT NULL,
    FOREIGN KEY (idUtilisateur) REFERENCES utilisateurs(id)
);

CREATE TABLE tweets (
    id              INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    url             VARCHAR(150) UNIQUE,
    etat            ENUM('signalement', 'vrai', 'faux', 'tendancieux', 'no information') NOT NULL,
    niveau_signalement INT DEFAULT 1
);

CREATE TABLE signalements (
    id              INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    idTweet         INT,
    sujet           ENUM('politique', 'religion'),
    description     LONGTEXT,
    FOREIGN KEY (idTweet) REFERENCES tweets(id)
);

CREATE TABLE verifie (
    idTweet         INT NOT NULL,
    idUtilisateur   INT NOT NULL,
    idJugement      INT NOT NULL,
    FOREIGN KEY (idTweet) REFERENCES tweets(id),
    FOREIGN KEY (idUtilisateur) REFERENCES utilisateurs(id),
    FOREIGN KEY (idJugement) REFERENCES jugements(id)
);


###############################################################
#     INSERTIONS de quelques valeurs pour faire des tests     #
###############################################################

-- INSERT INTO jugements (decision, description) VALUES
-- ('vrai', 'Les belges n\'ont pas d\'étoiles sur leurs maillots'),
-- ('no information', 'Ce tweet ne contient pas de mauvaises informations')
-- ;
-- INSERT INTO utilisateurs (prenom, nom, email, password, type) VALUES
-- ('julien', 'erhard', 'admin@edu.univ-fcomte.fr', '$2b$08$w9r0IHwtiQRbRWqe4U2F1eZgOyBHyob5Bv9yO.lO6uQzTJzEI./.C ', 'admin'),
-- ('michel', 'schmitt', 'mich.schmi@edu.univ-fcomte.fr', 'MDP', 'vérificateur')
-- ;
-- INSERT INTO bannissements (idUtilisateur, raison, DateBan, Duree) VALUES
-- (2, 'faux compte vérificateur', DATE(NOW()), 9999)
-- ;
-- INSERT INTO tweets (url, etat) VALUES
-- ('https://twitter.com/Visa_Fr/status/14501268814461050920', 'signalement'),
-- ('https://twitter.com/LaPosteBusiness/status/1438877884853231618', 'signalement')
-- ;


###############################################################
#                  EXEMPLE et TEST de requetes                #
###############################################################

-- #vérifier qu'un tweet si un tweet a déjà été signalé:
-- #renvoi l'id si il a déjà été signalé sinon rien
-- SELECT id FROM tweets
-- WHERE tweets.url = "https://twitter.com/Visa_Fr/status/14501268814461050920"
-- ;
/*
SELECT * FROM tweets
WHERE tweets.url = ?;
*/

-- #ajouter un tweets si le tweet n'a pas déjà été ajouté puis avoir son id:
-- #INSERT INTO tweets (url, etat) VALUES ("https://twitter.com/exemple/010203", "signalement");
-- #SELECT id FROM tweets WHERE url = "https://twitter.com/exemple/010203";
/*
INSERT INTO tweets (url, etat) VALUES (?, "signalement");
SELECT id FROM tweets WHERE url = "?";
*/

-- #ajouter un signalement à un tweet:
-- #INSERT INTO signalements (idTweet, sujet, description) VALUES (1, "politique", "Marine le Pen dit qu'elle est intelligente");
/*
INSERT INTO signalements (url, etat) VALUES (?, ?, ?);
*/

-- SE FAIRE UN COMPTE ADMIN:
--  UPDATE utilisateurs SET type = 'admin' WHERE email = 'admin@gmail.com';


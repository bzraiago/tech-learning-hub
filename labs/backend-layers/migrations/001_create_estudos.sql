CREATE TABLE estudos (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  titulo TEXT NOT NULL CHECK (titulo <> '' AND titulo = btrim(titulo)),
  titulo_canonico TEXT NOT NULL UNIQUE CHECK (titulo_canonico <> '')
);

INSERT INTO estudos (titulo, titulo_canonico)
VALUES
  ('HTML', 'html'),
  ('JavaScript', 'javascript');

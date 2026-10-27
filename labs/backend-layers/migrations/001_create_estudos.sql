CREATE TABLE estudos (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  titulo TEXT NOT NULL CHECK (titulo <> '' AND titulo = btrim(titulo)),
  titulo_canonico TEXT NOT NULL,
  CONSTRAINT estudos_titulo_canonico_unico UNIQUE (titulo_canonico),
  CONSTRAINT estudos_titulo_canonico_nao_vazio CHECK (titulo_canonico <> '')
);

INSERT INTO estudos (titulo, titulo_canonico)
VALUES
  ('HTML', 'html'),
  ('JavaScript', 'javascript');

/* Beschrijf de tabellen die je nodig hebt*/

CREATE TABLE products (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  code VARCHAR(15),
  name VARCHAR(255),
  description TEXT,
  price NUMERIC(10, 2)
);

/* Indien je standaar wat gegevens in de database wilt,
   voeg hieronder dan INSERT regels to */
insert into products (name, description, code, price) values ('French Film', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', '816905633-0', 10.5);
insert into products (name, description, code, price) values ('French Film', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', '816905633-0', 10.5);
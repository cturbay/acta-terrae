-- Banco de dados dos comentários (Cloudflare D1)
CREATE TABLE IF NOT EXISTS comentarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pagina TEXT NOT NULL,
  nome TEXT NOT NULL,
  texto TEXT NOT NULL,
  criado_em TEXT NOT NULL DEFAULT (datetime('now')),
  status TEXT NOT NULL DEFAULT 'pendente'
);
CREATE INDEX IF NOT EXISTS idx_comentarios_pagina_status ON comentarios (pagina, status);

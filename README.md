# IdP Auth API — V1

> Versão: **0.0.1** incompleta. atualmente em fase **alpha**.

## Visão Geral
Projeto Proof of Concept de um Identity Provider (IdP) simples para estudo e aprendizagem sobre arquitetura de sistemas e modelagem de banco de dados. Fornece operações básicas de gerenciamento e autenticação de usuários para uso interno ou integração com outros sistemas.

> Observação: projeto em evolução — aceito críticas e sugestões. Não está preparado para produção sem revisões adicionais.

## Principais objetivos
- Aprender padrões de arquitetura, separação de camadas e boas práticas com Node.js + TypeScript.
- Construir uma API administrativa mínima para gerenciamento de identidades.
- Publicar futuramente um pacote NPM reutilizável para acelerar CRUDs de autenticação.

## Tecnologias
- TypeScript
- Node.js + Express
- MongoDB (Mongoose)
- Argon2 (hash de senhas)

## Características
- Criação e leitura de usuários
- Validações e erros padronizados
- Hash seguro de senhas
- ID gerado com snowflake-like generator
- Estrutura em camadas: controllers → services → repository

## Status
- Estado: Em desenvolvimento (POC)
- Autenticação por token (JWT) não implementada nesta versão — API é administrativa.

## Endpoints principais
- POST /v1/user — criar usuário
- GET /v1/user/:identifier — obter usuário por username ou ID.

## Contribuição e feedback
Feedback e sugestões são bem-vindos. No momento o projeto não está aceitando contribuições externas formais — abra issues com sugestões.
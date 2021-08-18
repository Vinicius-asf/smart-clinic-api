# smart-clinic-api
As rotas da API definidas para essa aplicação são:

# app.post("/appointment"):
* Colocar no banco as informações sobre a consulta. Informações obrigatórias: 
1. e-mail paciente (chave primária da tabela "patient")
2. id da clínica
3. credencial do médico (chave primária da tabela "healthcare_professional")

# app.get("/appointment/:id")
* Pegar do banco as informações sobre uma consulta.
* Necessário informar o id da consulta
* Retorna os dados da consulta e exames, informações do paciente (nome, peso, altura e data de nascimento), da clínica (nome e endereço) e do médico responsável (nome e credencial, i.e. crm)

# app.patch("/appointment/:id")
* Atualizar no banco as informações sobre uma consulta.
* Necessário informar o id da consulta
* Espera-se que no req.body as informações estejam no formato esperado pelo banco de dados da tabela "appointment"

# app.delete("/appointment/:id")
* "Soft" delete de uma consulta, passando o id da consulta é atualizado no banco a coluna deleted_at

# app.post("/appointment/:id/exam")
* Colocar os exames anexados a uma consulta
* Precisa-se passar o id específico da consulta
* O req.body precisa conter as informações esperadas pela tabela tabela 

# app.get("/clinic/")
* Pegar do banco todas as clinicas (id e nome)

# app.get("/clinic/:id")
* TO-DO

# app.get("/clinic/:id/appointment")
* Pegar do banco todas as consultas de uma clinica, informando o id dessa clinica
* É enviado todas as informações da tabela 'appointment', mais o nome do paciente da consulta, nome do médico e sua credencial.

# app.get("/clinic/:id/patient")
* Pegar do banco todos os pacientes relacionados com uma clínica, informando o id dessa clínica.

# app.get("/health/:crm")
* Pegar do banco o nome e a credencial de um profissional da saúde específico. É necessária passar a chave primária (no caso, a credencial)
* TO-DO: colocar a disponibilidade do profissional.

# app.get("/health/:crm/appointment")
* Pegar do banco todas consultas referentes a um único profissional, informando a credencial (crm) deste. Retorna os dados da consulta nomes do paciente e da clínica

# app.get("/health/")
* Pegar do banco as informações dos profissionais de saúde; retorna-se o nome, e-mail, credencial e a sua profissão de atuação

# app.post("/health/")
* Função para inserir no banco dados de um profissional de saúde

# app.get("/patient/:email")
* Pegar do banco os dados específicos de um paciente através da chave primária (e-mail). Retorna todos os dados do paciente, menos a senha

# app.patch("/patient/:email")
* Atualizar no banco os dados de um paciente através da chave primária (e-mail). Deve-se passar no req.body os dados no formato esperado para o banco

# app.post("/patient/)
* Criar no banco os dados um paciente. Deve-se passar no req.body os dados no formato esperado para o banco

# app.get("/patient/:email/appointment")
* Pega do banco todas as consultas de um determinado paciente (precisa informar a chava primária deste: e-mail). Retorna os dados da consulta e também o nome da clínica e os dados do profissional responsável pela consulta






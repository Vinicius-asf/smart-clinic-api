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



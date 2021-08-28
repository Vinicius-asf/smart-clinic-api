# smart-clinic-api
As rotas da API definidas para essa aplicação são:

# app.post("/login/:user):
* Rota para a tela de login
* req.params.user -> para o perfil paciente e médico: deve ser o email; para o perfil clínica: deve ser o username da tabela 'administrative';
* req.body deve ser o seguinte:
        {
            'password': 'algo',
            'user_type': 'clinic'
        }
* Atenção!!! user_type só pode ser 3 valores: clinic, healthcare_professional, 'patient'

# app.post("/appointment"):
* Colocar no banco as informações sobre a consulta. Informações obrigatórias: 
1. e-mail paciente (chave primária da tabela "patient")
2. id da clínica
3. credencial do médico (chave primária da tabela "healthcare_professional")
4. date - data da consulta (YYYY-MM-DD)
5. time - horário da consulta (HH:MM:SS)

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
* Pegar do banco os dados de uma clinica específica, incluindo suas especialidades e profissionais da saúde
* retorna um objeto como a seguir:

        {
            "clinic_id": 1,
            "specialities": [
                {
                    "speciality": "Urologia",
                    "speciality_id": 1
                },
                {
                    "speciality": "Cardiologia",
                    "speciality_id": 2
                }
            ],
            "Urologia": [
                {
                    "credential": "12345678",
                    "name": "Tom Nook"
                },
                {
                    "credential": "11111111",
                    "name": "Redd"
                }
            ],
            "Cardiologia": [
                {
                    "credential": "12345678",
                    "name": "Tom Nook"
                }
            ]
        }

# app.get("/clinic/:id/appointment")
* Pegar do banco todas as consultas de uma clinica, informando o id dessa clinica
* É enviado todas as informações da tabela 'appointment', mais o nome do paciente da consulta, nome do médico e sua credencial.

# app.get("/clinic/:id/patient")
* Pegar do banco todos os pacientes relacionados com uma clínica, informando o id dessa clínica.

# app.get("/health/:crm")
* Pegar do banco o nome e a credencial de um profissional da saúde específico. É necessária passar a chave primária (no caso, a credencial)
* TO-DO: colocar a disponibilidade do profissional.

# app.get("/health/:crm/appointment")
* Pegar do banco todas consultas referentes a um único profissional, informando a credencial (crm) deste. Retorna os dados da consulta, nomes do paciente e da clínica

# app.get("/health/")
* Pegar do banco as informações dos profissionais de saúde; retorna-se o nome, e-mail, credencial e a sua profissão de atuação

# app.post("/health/")
* Função para inserir no banco dados de um profissional de saúde
* Não conta com a atualização de área de atuação ou especialidade

# app.patch("/health/:crm")
* Função para atualizar os dados do profissional da saúde
* Não conta com a atualização de área de atuação ou especialidade

# app.post("/health/:crm/area")
* Função para atualizar a área de atuação de um profissional específico
* Deleta os dados antigos
* Deixar body como o exemplo abaixo:

        {
            area_id:[1,2,3] // ids das áreas de atuação
        }

# app.post("/health/:crm/specialty")
* Função para atualizar a área de atuação de um profissional específico
* Deleta os dados antigos
* Deixar body como o exemplo abaixo:

        {
            specialty:[1,2,3] // ids das áreas de atuação
        }

# app.get("/speciality")
* Função para pegar todas as especialidades armazenadas no sistema

# app.get("/area")
* Função para pegar todas as áreas de atuação armazenadas no sistema

# app.post("/clinic/:id/health/:crm")
* Função para conectar uma clinica a um profissional da saúde

# app.delete("/clinic/:id/health/:crm")
* Função para (soft) deletar um profissional de uma clínica

# app.get("/patient/:email")
* Pegar do banco os dados específicos de um paciente através da chave primária (e-mail). Retorna todos os dados do paciente, menos a senha

# app.patch("/patient/:email")
* Atualizar no banco os dados de um paciente através da chave primária (e-mail). Deve-se passar no req.body os dados no formato esperado para o banco

# app.post("/patient/)
* Criar no banco os dados um paciente. Deve-se passar no req.body os dados no formato esperado para o banco. 
* Deixar body como o exemplo abaixo:
        
        {
            "email": "name@email.com",
            "clinic_id": "1",
            "password": "testexx",
            "name": "Nome aqui"    
        }

# app.get("/patient/:email/appointment")
* Pega do banco todas as consultas de um determinado paciente (precisa informar a chava primária deste: e-mail). Retorna os dados da consulta e também o nome da clínica e os dados do profissional responsável pela consulta
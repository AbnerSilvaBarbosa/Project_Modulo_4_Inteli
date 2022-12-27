require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Usuario = require('../Models/User');

class User {
    async register(name, email, pass) {

        //Verificação de senha != "", e HASH da mesma
        if(pass) {
            const hashedPassWord = await bcrypt.hash(pass, 8) 

            pass = hashedPassWord
        }

        //Verificação se o email já está cadastrado
        const user = await Usuario.find({ email: email })

        if(user.length > 0) {
            throw new Error("Email já cadastrado")
        }

        //Criação do usuário
        const newUser = new Usuario({
            name,
            email,
            pass
        })

        try {
            await newUser.save();
            return newUser;
        } catch {
            throw new Error("Erro na criação do usuário");
        }
    }

    async Authentication(email, pass) {
        //Requisição de busca na tabela "users" para verificar a existência de um usuário com o email indicado no LOGIN
        const user = await Usuario.findOne({ email: email })

        if(user == null) {
            throw new Error("Email ou Senha inválidos")
        }

        if(user.length == 0) {
            throw new Error("Email ou Senha inválidos")
        }

        //Verificar se a senha inserida corresponde a do usuário
        let passwordMatch = await bcrypt.compare(pass, user.pass);       

        if(!passwordMatch) {
            throw new Error("Email ou Senha inválidos")
        }

        //Gera o token de segurança do usuário, que possui tempo de expiração
        let token

        token = jwt.sign({
            email: user.email
        }, "4b0d30a9f642b3bfff67d0b5b28371a9", {
            subject: user._id.toString(),
            expiresIn: "1h"
        });

        return {
            message: 'Validated Credentials. User Logged',
            token: token,
        }
    }

    async getInfos(id) {
        //Requisição de busca na tabela "users" para verificar a existência de um usuário com o email indicado no LOGIN
        const user = await Usuario.findOne({ _id: id });

        if(user.length == 0) {
            throw new Error("Usuário não encontrado")
        }

        return user;
    }
}

module.exports = {
    User,
}
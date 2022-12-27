const jwt = require('jsonwebtoken');

const unsureAuthenticated = (req, res, next) => {
    //Recebe o token inserido pela aplicação
    const authToken = req.headers.authorization;

    //Valida se o token está preenchido
    if (!authToken) {
        res.status(401).json({
            message: "Você precisa de um token para acessar essa ação"
        })
        return
    }

    //Desestrutura o header "Bearer 'token'"
    [, token] = authToken.split(" ")

    //Valida se o token é válido
    try {
        //Verifica o Token
        const { sub } = jwt.verify(token, "4b0d30a9f642b3bfff67d0b5b28371a9")

        //Recupera infos do usuário
        req.id = sub
        return next();
    } catch(err) {
        //Retorna o erro caso o token não seja válido
        res.status(401).send("Usuário não autenticado");
        return
    }
}


//Exporta como um MIDDLEWARE
module.exports = {
    unsureAuthenticated
}
const notFoundErrors = (res) =>{
    return res.status(404).send("Esse dado não foi encotrado")
}

const objectIdError = (res) =>{
    return res.status(500).send('Ocorreu um erro ao recuperar este dado')
}


module.exports = {
    notFoundErrors,
    objectIdError,
}
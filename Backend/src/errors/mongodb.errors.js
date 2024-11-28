const notFoundErrors = (res) =>{
    return res.status(404).send("Esse dado não foi encotrado")
}


module.exports = {
    notFoundErrors,
}
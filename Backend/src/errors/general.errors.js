const notAllowedFieldsToUpdateError = () => {
    return this.res.status(500).send('One or more fields are not allowed to be updated')
}


module.exports = {
    notAllowedFieldsToUpdateError
}
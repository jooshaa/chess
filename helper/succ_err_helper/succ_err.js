export const successMessage = (res, status=200, message ="Successfully done", data = {}) => {
    res.status(status).send({
        message: message,
        data: data
    })
}


export const errorMessage = (res, error, status, message="Error") =>{
    res.status(status).send({
        error: error,
        message: message
    })
}

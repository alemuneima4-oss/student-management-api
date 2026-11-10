const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if(res.headersSet){
        return next(err);
    }
    res.status(500).json({
        message: "Internal Server Error"
    });
};
export default errorHandler;
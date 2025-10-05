export const handleSaveError = (error, data, next) => {
    error.status = 400;
    next();
};

export const setUpdateOptions = function(next) {
    this.option.new = true;
    this.option.runValidators = true;
    next();
};
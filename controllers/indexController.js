const getIndex = (req, res) => {
    res.render('index', { title: 'Express' });
}

module.exports = {
    getIndex
}
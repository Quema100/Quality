function ResetPassword(app,fs,crypto,path){
    app.route('/resetpassword')
    .get((req, res) => {
        res.render(path.join(__dirname, '../web/ResetPassword', 'ResetPassword.ejs'));     
    })
    .post((req, res) => {


    })
}

module.exports = ResetPassword
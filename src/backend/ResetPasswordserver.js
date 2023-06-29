function ResetPassword(app,fs,crypto,path){
    app.route('/resetpassword')
    .get((req, res) => {
        const errorMessage = req.query.errorMessage || null;
        res.render(path.join(__dirname, '../web/ResetPassword', 'ResetPassword.ejs'),{errorMessage:errorMessage});     
    })
    .post((req, res) => {
        const NewPassword = req.body.NewPassword;
        const ReEnterPassword = req.body.ReEnterPassword;

        if(NewPassword !== ReEnterPassword){
            const errorMessage = 'The password is incorrect.';
            res.redirect('/resetpassword?errorMessage=' + encodeURIComponent(errorMessage)); 
        }

    })
}

module.exports = ResetPassword
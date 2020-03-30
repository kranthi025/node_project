const port = 3030;
const host = '127.0.0.1';

const dburl = 'mongodb://pjone_user:user1234@ds153495.mlab.com:53495/pjone_db';
const dbUser = 'pjone_user';
const dbPass = 'user1234';
const authSource = 'pjone_db';
const urlParse = true;
const secretKey = 'ThisisFullstackByWahid'

module.exports = {
    PORT:port,
    HOST:host,
    DBURL:dburl,
    DBUSER:dbUser,
    DBPASS:dbPass,
    DBAUTH:authSource,
    PARSER:urlParse,
    SECRETKEY:secretKey
}
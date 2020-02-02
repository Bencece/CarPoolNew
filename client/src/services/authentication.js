/* eslint-disable */
import connection from './connection';

export default {
    registration (userdata) {
        return connection().post('/register', userdata);
    },
    login (userdata) {
        return connection().post('/login', userdata)
        .then(function(res){
            console.log(res);
        });
    }
}
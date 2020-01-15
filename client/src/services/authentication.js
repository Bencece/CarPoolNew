import connection from './connection';

export default {
    registration (userdata) {
        return connection().post('registration', userdata);
    }
}
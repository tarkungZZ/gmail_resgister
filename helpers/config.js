require('dotenv').config({ path: '.env' })

module.exports = {

    username: process.env.user_db,
    password: process.env.pw_db,
    cluster: process.env.cluster_db,
    db_name: process.env.name_db,
    port: process.env.port_db,
    LOCAL_SERVER_PORT: process.env.local_server_port,
    LOCAL_SOCKET_IP: process.env.local_socket_ip,
    LOCAL_SOCKET_PORT: process.env.local_socket_port,
    url: 'https://www.google.com/intl/th/gmail/about/',
    url2: 'https://www.facebook.com/reg/',
    url3: 'https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin',
    url4: 'https://www.facebook.com/login/'
}
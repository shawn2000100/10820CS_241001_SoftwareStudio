try {
    // console.log("testtest config.js");
    switch (process.env.NODE_ENV) {
        case 'development':
            process.env.DB_URL = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOSTNAME}:${process.env.PG_PORT}/${process.env.PG_DB_NAME}`;
            // console.log("test Local: ", process.env);
            break;
        default: // 'staging' or 'production'
            process.env.DB_URL = `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
            // console.log("test Production: ", process.env)
            break;
    }
} catch (err) {
    console.log(err, '\n\nError configuring the project. Have you set the environment veriables?');
}

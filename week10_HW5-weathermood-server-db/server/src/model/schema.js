require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);

const schemaSql = `
    -- Extensions
    CREATE EXTENSION IF NOT EXISTS pg_trgm;

    -- Drop (droppable only when no dependency)
    DROP INDEX IF EXISTS posts_idx_text;
    DROP INDEX IF EXISTS posts_idx_ts;
    DROP INDEX IF EXISTS todos_idx_text;
    DROP INDEX IF EXISTS todos_idx_ts;
    DROP TABLE IF EXISTS posts;
    DROP TABLE IF EXISTS todos;
    DROP TYPE IF EXISTS mood;
    
    -- Create
    CREATE TYPE mood AS ENUM (
        'Clear',
        'Clouds',
        'Drizzle',
        'Rain',
        'Thunder',
        'Snow',
        'Windy'
    );
    CREATE TABLE posts (
        id              serial PRIMARY KEY NOT NULL,
        mood            mood NOT NULL,
        text            text NOT NULL,
        ts              bigint NOT NULL DEFAULT (extract(epoch from now())),
        "clearVotes"    integer NOT NULL DEFAULT 0,
        "cloudsVotes"   integer NOT NULL DEFAULT 0,
        "drizzleVotes"  integer NOT NULL DEFAULT 0,
        "rainVotes"     integer NOT NULL DEFAULT 0,
        "thunderVotes"  integer NOT NULL DEFAULT 0,
        "snowVotes"     integer NOT NULL DEFAULT 0,
        "windyVotes"    integer NOT NULL DEFAULT 0
    );
    CREATE TABLE todos (
        id              serial PRIMARY KEY NOT NULL,
        mood            mood NOT NULL,
        text            text NOT NULL,
        ts              bigint NOT NULL DEFAULT (extract(epoch from now())),
        -- ts_done         bigint DEFAULT NULL -- For unknown reason, we must use "doneTS" below...
        "doneTs"          bigint DEFAULT NULL
    );
    CREATE INDEX posts_idx_ts ON posts USING btree(ts);
    CREATE INDEX posts_idx_text ON posts USING gin(text gin_trgm_ops);
    CREATE INDEX todos_idx_ts ON todos USING btree(ts);
    CREATE INDEX todos_idx_text ON todos USING gin(text gin_trgm_ops);
`;

const dataSql = `
    -- Populate dummy posts
    INSERT INTO posts (mood, text, ts)
    SELECT
        'Clear',
        'word' || i || ' word' || (i+1) || ' word' || (i+2),
        round(extract(epoch from now()) + (i - 1000000) * 3600.0)
    FROM generate_series(1, 1000000) AS s(i);
    INSERT INTO todos (mood, text, ts)
    SELECT
        'Clear',
        'word' || i || ' word' || (i+1) || ' word' || (i+2),
        round(extract(epoch from now()) + (i - 1000000) * 3600.0)
    FROM generate_series(1, 1000000) AS s(i);
`;

db.none(schemaSql).then(() => {
    console.log('Schema created');
    db.none(dataSql).then(() => {
        console.log('Data populated');
        pgp.end();
    });
}).catch(err => {
    console.log('Error creating schema', err);
});

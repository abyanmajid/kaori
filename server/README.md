# Axum Postgres Template



```
docker-compose up -d
```

```
sqlx migrate add -r init
```

### _init.up.sql


```sql
CREATE EXTENSION IF NOT EXISTS <extension_name>;

CREATE TABLE
    IF NOT EXISTS <table_name> (
        ...

    );
```

### _init.down.sql


```sql
DROP TABLE IF EXISTS <table_name>
```


```
sqlx migrate run
```

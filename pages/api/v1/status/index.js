import { query } from "infra/database";

async function status(request, response) {
  const databaseName = process.env.POSTGRES_DB;
  const result = await query({
    text: `select
      (select current_setting('server_version')) as version,
      (select current_setting('max_connections')) as max_connection,
      (select count(*)::int from pg_stat_activity where datname=$1) as active_connections
    ;`,
    values: [databaseName]
  });
  const {version, max_connection, active_connections} = result["rows"][0];
  const updateAt = new Date().toISOString();

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: version,
        max_connection: parseInt(max_connection),
        active_connections: active_connections
      }
    }
  });
}

export default status;
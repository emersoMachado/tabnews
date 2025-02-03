import { query } from "../../../../infra/database";

async function status(request, response) {
  const result = await query("select 1 + 1;");
  console.log(result.rows);
  response.status(200).json({message: "tudo ok"});
}

export default status;
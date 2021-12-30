import calculatorService from "services/calculator.service";

/** @type {import("next").NextApiHandler} */
export default function calculateUidHandler(req, res) {
  const { query, method } = req;

  if (method !== "GET") {
    return res.status(405).end();
  }

  const { uid } = query;

  if (!calculatorService.hasUid(uid)) {
    return res.status(500).end();
  }

  const value = calculatorService.getValueByUid(uid);
  const okCode = value === null ? 202 : 200;

  return res.status(okCode).json({ value });
}

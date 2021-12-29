import * as calculatorService from "../../services/calculator.service";

/** @type {import("next").NextApiHandler} */
export default function calculateHandler(req, res) {
  const { uid } = JSON.parse(req.body);
  const value = calculatorService.getValueByUid(uid);

  if (!calculatorService.hasUid(uid)) {
    return res.status(500).end();
  }

  if (value === null) {
    return res.status(202).json({ value });
  }

  return res.status(200).json({ value });
}

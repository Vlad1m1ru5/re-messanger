import calculatorService from "services/calculator.service";

/** @type {import("next").NextApiHandler} */
export default function subscribeHandler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const uid = calculatorService.getUid();

  if (!calculatorService.hasUid(uid)) {
    calculatorService.saveUid(uid);
    calculatorService.setValueByUid(uid);
  }

  return res.status(200).json({ uid });
}

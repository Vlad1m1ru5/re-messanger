import calculatorService from "services/calculator.service";

/** @type {import("next").NextApiHandler} */
export default function subscribeHandler(req, res) {
  const uid = calculatorService.createUid();

  if (calculatorService.hasUid(uid)) {
    return res.status(200).json({ uid });
  }

  calculatorService.saveUid(uid);
  calculatorService.setValueByUid(uid);
  
  return res.status(200).json({ uid });
}

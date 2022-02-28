import { readDB } from "../../../controller/dbController.js";

const getUserList = () => readDB("userList");

export default async function handle(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const userList = await getUserList();
        res.status(200).json(userList);
        break;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ msg: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    res.status(500).json({
      msg: "예상치못한 오류 발생.",
    });
  }
}

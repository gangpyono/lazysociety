import { readDB } from "../../../controller/dbController.js";

const getUsers = () => readDB("users");
const getUserInfoList = () => readDB("userInfoList");

export default async function handler(req, res) {
  const {
    headers: { authorization },
    method,
  } = req;

  try {
    switch (method) {
      case "GET":
        const users = await getUsers();
        const user = users.find((user) => user.accessToken === authorization);

        if (!user) {
          res.status(401).json({
            msg: "로그인후 이용가능한 서비스 입니다.",
          });
        }
        const present = Date.now();

        if (user.accessExpire - present < 0) {
          res.status(401).json({
            msg: "토큰이 만료되었습니다.",
          });
        }

        // access토큰이 만료되지 않았을경우
        const userInfoList = await getUserInfoList();

        const userInfo = userInfoList.find((userInfo) => userInfo.id === user.id);
        res.setHeader("Access-Token-Expires-At", user.accessExpire); // 사용 x
        res.status(200).json(userInfo);

        break;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ msg: `Method ${method} Not Allowed ` });
    }
  } catch (error) {
    res.status(500).json({ msg: "예상치못한 에러 발생" });
  }
}

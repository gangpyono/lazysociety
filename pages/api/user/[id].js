import { readDB } from "../../../lib/dbController.js";

const getUsers = () => readDB("users");
const getUsersDetail = () => readDB("userDetail");

export default async function handler(req, res) {
  const {
    headers: { authorization },
    query: { id },
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

        const accessExpire = Date.parse(user.accessExpire);
        const present = Date.now();

        if (accessExpire - present < 0) {
          res.status(401).json({
            msg: "토큰이 만료되었습니다.",
          });
        }

        // access토큰이 만료되지 않았을경우
        const usersDetail = await getUsersDetail();

        const userDetail = usersDetail.find(
          (userDetail) => userDetail.id === id
        );
        console.log(user.accessExpire);
        res.setHeader("Access-Token-Expires-At", user.accessExpire);
        res.status(200).json({
          userDetail,
        });

        break;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).end("예상치못한 에러 발생");
  }
}

import { readDB } from "../../../lib/dbController.js";

const getUsers = () => readDB("users");

export default async function handle(req, res) {
  const {
    body: { id, password },
    method,
  } = req;

  try {
    switch (method) {
      case "POST":
        const users = await getUsers();
        const checkUser = users.some(
          (user) => user.id === id && user.password === password
        );

        if (!checkUser) {
          res.status(401).json({
            msg: "아이디 혹은 비밀번호를 확인해 주세요",
          });
        } else {
          let accessExpire = new Date();
          let refreshExpire = new Date();

          accessExpire.setSeconds(+process.env.NEXT_PUBLIC_ACCEESS_AGE);
          refreshExpire.setSeconds(+process.env.NEXT_PUBLIC_REFRESH_AGE);

          res.status(200).json({
            token_type: "Bearer",
            access_token: Math.random().toString(36),
            accessExpireAge: process.env.NEXT_PUBLIC_ACCEESS_AGE,

            refresh_token: Math.random().toString(36),
            refreshExpireAge: process.env.NEXT_PUBLIC_REFRESH_AGE,
          });
        }

        break;
      default:
        // 405 : Method Not Allowed
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    //예상하지못한 오류
    res.status(500).json({
      msg: "예상치못한 오류 발생.",
    });
  }
}

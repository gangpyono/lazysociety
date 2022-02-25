import { readDB, writeDB } from "../../../lib/dbController.js";

const getUsers = () => readDB("users");
const setUsers = (data) => writeDB("users", data);
export default async function handle(req, res) {
  const {
    body: { id, password },
    method,
  } = req;

  try {
    switch (method) {
      case "POST":
        const users = await getUsers();
        const checkUser = users.some((user) => user.id === id && user.password === password);

        if (!checkUser) {
          res.status(401).json({
            msg: "아이디 혹은 비밀번호를 확인해 주세요",
          });
        } else {
          let accessExpire = Date.now() + Number(process.env.NEXT_PUBLIC_ACCEESS_AGE);
          let refreshExpire = Date.now() + Number(process.env.NEXT_PUBLIC_REFRESH_AGE);

          const accessToken = Math.random().toString(36).substr(2);
          const refreshToken = Math.random().toString(36).substr(2);

          const newUser = {
            id,
            password,
            accessExpire,
            accessToken,
            refreshExpire,
            refreshToken,
          };

          const idx = users.findIndex((user) => user.id === id);
          users.splice(idx, 1, newUser);
          setUsers(users);

          res.status(200).json({
            tokenType: "Bearer",
            accessToken,
            accessExpireAge: Number(process.env.NEXT_PUBLIC_ACCEESS_AGE),

            refreshToken,
            refreshExpireAge: Number(process.env.NEXT_PUBLIC_REFRESH_AGE),
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

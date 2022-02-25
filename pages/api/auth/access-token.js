import { readDB } from "../../../lib/dbController.js";

const getUsers = () => readDB("users");

export default async function handle(req, res) {
  const {
    body: { refreshToken },
    method,
  } = req;

  try {
    switch (method) {
      case "POST":
        const users = await getUsers();
        const user = users.find((user) => user.refreshToken === refreshToken);

        if (!user) {
          res.status(401).json({
            msg: "등록되지 않은 사용자입니다.",
          });
        }

        const refreshExpire = Date.parse(user.refreshExpire);
        const present = Date.now();

        // refresh토큰이 만료되지 않았을경우.
        if (refreshExpire - present > 0) {
          // 새로운 access토큰 발급. (refresh는 기존 그대로)
          res.status(200).json({
            tokenType: "Bearer",
            accessToken: Math.random().toString(36),
            accessExpireAge: 300,
            refreshToken: user.refreshToken,
            refreshExpireAge: 1800,
          });
        } else {
          // refresh 토큰 만료시 로그인 페이지로 redirect.
          // 303 : 일시적 redirect
          res.redirect(303, "/");
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

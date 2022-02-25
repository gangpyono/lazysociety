import fs from "fs";
import { resolve } from "path";

const basePath = resolve();

const filenames = {
  users: resolve(basePath, "data/users.json"),
  userList: resolve(basePath, "data/userList.json"),
  userDetail: resolve(basePath, "data/userDetail.json"),
};

//파일 읽어오기
export const readDB = (target) => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], "utf-8")); // 파일 읽어오기
  } catch (err) {
    console.error(err);
  }
};

//파일에 작성하기
export const writeDB = (target, data) => {
  try {
    return fs.writeFileSync(filenames[target], JSON.stringify(data)); // data : file에 기록된 데이타.
  } catch (err) {
    console.error(err);
  }
};

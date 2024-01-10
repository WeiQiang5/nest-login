import * as bcrypt from 'bcrypt';
class MyBcrypt {
  //   加密
  async encryption(str) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(str, salt);
    return hash;
  }
  //   比较
  async compare(origin, now) {
    return await bcrypt.compare(origin, now);
  }
}

export default MyBcrypt;

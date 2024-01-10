# 登录知识

## 使用依赖

- 数据库相关 pnpm i @nestjs/typeorm mysql2 typeorm --save
- 参数验证 pnpm i class-transformer class-validator --save
- 获取 env 变量 pnpm i @nestjs/config --save
- 使用 jwt pnpm i @nestjs/jwt --save

## jwt 步骤

- nest g resource user --no-spec 创建 user 模块
- 在 app.module.ts 模块下使用引入 JwtModule，并设置为全局以及时间等参数
- 在 user 里面的 service 文件中写 login 和 register 方法
- 设置守卫,nest g guard login --no-spec --flat,创建完，逻辑为获取请求头中 authorization,然后使用 jwtService 中方法检验，成功则返回 true，不成功抛出错误

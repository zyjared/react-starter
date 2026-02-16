# @kit/features AGENTS

## Scope

- 仅适用于：`packages/features/**`
- 对外使用入口：`@kit/features/<feature>`
- 当前基准实现：`auth`、`account`

## MUST Rules

- 每个 feature 必须包含：

```text
<feature>/
  api/
    <feature>.api.ts
    <feature>.dto.ts
    <feature>.mapper.ts
    index.ts
  stores/
    <feature>.store.ts
  hooks/
    keys.ts
    use-*.ts
    index.ts
  components/
    index.ts
    *.ts or *.tsx
  constants.ts
  model.ts
  index.ts
```

- 分层职责必须严格遵守：
  - `api/*` 只做请求、DTO、mapper
  - `stores/*` 只做本地状态
  - `hooks/*` 负责 query/mutation 编排与 store 同步
  - `components/*` 只消费 hooks/store，不直接调用 api
- 依赖方向必须是：
  - `api -> dto + mapper + model`
  - `stores -> model`
  - `hooks -> api + stores`
  - `components -> hooks + stores`
- API 命名必须语义化：
  - 当前主体读取：`getCurrentXxx`
  - 单资源读取：`getXxx`
  - 列表读取：`listXxx`
  - 写操作：`createXxx` / `updateXxx` / `deleteXxx`
  - 领域动作：`signIn` / `signOut`
- hooks 命名必须一致：
  - 文件：`use-*.ts`
  - 函数：`useXxx`
  - key：`keys.ts`
- `constants.ts` 只做常量定义，不做业务逻辑，枚举类型使用 `const` 定义 + 类型推导。
- `model.ts` 只做类型定义。
- `index.ts` 只做导出聚合，不放业务逻辑。
- 禁止兼容别名与过渡导出，直接保持单一命名。

## Import Rules

- 应用层只能从 `@kit/features/<feature>` 导入。
- 禁止跨 feature 深层导入（如 `@kit/features/auth/api/...`）。
- feature 内部统一使用相对路径导入。

## Verification Rules

- 每次改动必须可验证，且必须至少覆盖以下三类检查：
  - 静态校验：`lint` + `check-types`
  - 行为校验：改动影响的 hook/api 需要最小调用路径验证
  - 边界校验：错误分支或空数据分支至少验证一个
- PR/提交前必须满足：
  - `pnpm --filter @kit/features verify` 通过
  - 受影响 feature 的导出入口未破坏（`src/<feature>/index.ts`）
- 如果本次只改文档或导出，不可跳过 `verify`。
- 如果新增 feature，必须同时补一条可执行验证项（命令或测试），否则视为未完成。

## Reference Implementation

- `auth`
  - API: `getCurrentAuth` / `signIn` / `signOut`
  - Hooks: `keys.ts` + `use-auth-session.ts` + `use-sign-in.ts` + `use-sign-out.ts`
- `account`
  - API: `getCurrentAccount`
  - Hooks: `keys.ts` + `use-current-account.ts`

## Execution Checklist

1. 创建 `model.ts`
2. 创建 `api/*`
3. 创建 `stores/*`
4. 创建 `hooks/*`
5. 创建 `components/*`
6. 更新 feature `index.ts` 导出
7. 运行 `pnpm --filter @kit/features verify`

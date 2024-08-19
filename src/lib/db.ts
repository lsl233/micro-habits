import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

// 在开发环境中，会热重载，避免重复创建实例，倒置内存泄露
if (process.env.NODE_ENV !== "production") globalThis.prisma = db

/**
 * 生成代码
 * npx prisma generate
 * 
 * 上传数据库表
 * npx prisma db push
 */
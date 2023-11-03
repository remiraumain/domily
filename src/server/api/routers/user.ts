import { eq } from "drizzle-orm";
import { z } from "zod";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { NextResponse } from "next/server";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  isUserByEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.email, input.email),
      });
      return !!user;
    }),

  create: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        birthday: z.date(),
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const exist = await ctx.db.query.users.findFirst({
        where: eq(users.email, input.email),
      });

      if (exist) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);
      await ctx.db.insert(users).values({
        id: uuidv4(),
        firstName: input.firstName,
        lastName: input.lastName,
        name: `${input.firstName} ${input.lastName}`,
        birthday: input.birthday,
        email: input.email,
        password: hashedPassword,
      });
    }),
});

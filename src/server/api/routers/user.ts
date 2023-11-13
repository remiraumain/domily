import { eq } from "drizzle-orm";
import { z } from "zod";
import bcrypt from "bcrypt";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  exists: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.email, input.email),
        with: {
          accounts: true,
        },
      });
      if (!user) {
        return { value: false, providers: null };
      }
      const providers = user.accounts.map((account) => account.provider);
      return {
        value: true,
        providers,
      };
    }),

  complete: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        birthday: z.date(),
        image: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.session.user.id),
      });
      if (!user) {
        throw new Error("User not found");
      }
      const updatedUser = await ctx.db
        .update(users)
        .set({
          firstName: input.firstName,
          lastName: input.lastName,
          birthday: input.birthday,
          image: input.image,
          completed: true,
        })
        .where(eq(users.id, ctx.session.user.id));

      return updatedUser;
    }),

  isComplete: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
    });
    if (!user) {
      throw new Error("User not found");
    }

    // TODO: check if user has completed profile
    console.log(user);

    // If user has completed profile, change isComplete field to true and return true
  }),
});

import { OpenAI } from "openai";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const aiRouter = createTRPCRouter({
  summarize: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input }) => {
      const res = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "Summarize in 3 bullet points." },
          { role: "user", content: input.content },
        ],
      });
      return res.choices[0]?.message?.content;
    }),
});

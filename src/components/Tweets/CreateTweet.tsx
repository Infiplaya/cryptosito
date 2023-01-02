import { useState } from "react";
import { object, string } from "zod";
import { trpc } from "../../utils/trpc";

export const tweetSchema = object({
  text: string({
    required_error: "Tweet text is required",
  })
    .min(10, "Message must contain minimum 10 characters")
    .max(200, "Message can contain max 200 characters"),
});

export function CreateTweet() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const utils = trpc.useContext();

  const { mutateAsync } = trpc.tweet.create.useMutation({
    onSuccess: () => {
      setText("");
      utils.tweet.timeline.invalidate();
    },
  });

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      await tweetSchema.parse({ text });
    } catch (e: any) {
      setError(e.issues[0].message);
      return;
    }

    mutateAsync({ text });
  }

  return (
    <>
      <p className="p-3 font-semibold text-red-500">{error && error}</p>
      <p className="px-4 text-xl font-semibold">What do you want to share?</p>
      <form
        onSubmit={handleSubmit}
        className="mb-4 flex w-full flex-col rounded-md border-2 p-4"
      >
        <textarea
          className="w-full h-44 p-4 shadow resize-none"
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-4 flex justify-end">
          <button
            className="rounded-md bg-primary px-4 py-2 text-white"
            type="submit"
          >
            Tweet
          </button>
        </div>
      </form>
    </>
  );
}

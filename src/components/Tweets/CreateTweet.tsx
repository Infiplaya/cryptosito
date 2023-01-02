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
    <div className="p-2">
      <p className="p-3 font-semibold text-red-500">{error && error}</p>
      <p className="px-4 text-xl md:text-3xl font-semibold">What do you want to share?</p>
      <form
        onSubmit={handleSubmit}
        className="mb-4 mt-3 flex w-full flex-col rounded-md border border-gray-200 p-4 dark:border-gray-700"
      >
        <textarea
          className="h-44 w-full resize-none bg-gray-50 p-4 shadow rounded-lg dark:bg-gray-700"
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-4 flex justify-start">
          <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

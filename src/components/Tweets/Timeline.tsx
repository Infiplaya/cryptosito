import Image from "next/image";
import { trpc, RouterInputs, RouterOutputs } from "../../utils/trpc";
import { CreateTweet } from "./CreateTweet";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  InfiniteData,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";

const LIMIT = 10;

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "1m",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1M",
    MM: "%dM",
    y: "1y",
    yy: "%dy",
  },
});

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleScroll() {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const scrolled = (winScroll / height) * 100;

    setScrollPosition(scrolled);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return scrollPosition;
}

function updateCache({
  client,
  variables,
  data,
  action,
  input,
}: {
  client: QueryClient;
  variables: {
    tweetId: string;
  };
  data: {
    userId: string;
  };
  action: "like" | "unlike";
  input: RouterInputs["tweet"]["timeline"];
}) {
  client.setQueryData(
    [
      ["tweet", "timeline"],
      {
        input,
        type: "infinite",
      },
    ],
    (oldData) => {
      const newData = oldData as InfiniteData<
        RouterOutputs["tweet"]["timeline"]
      >;

      const value = action === "like" ? 1 : -1;

      const newTweets = newData.pages.map((page) => {
        return {
          tweets: page.tweets.map((tweet) => {
            if (tweet.id === variables.tweetId) {
              return {
                ...tweet,
                likes: action === "like" ? [data.userId] : [],
                _count: {
                  likes: tweet._count.likes + value,
                },
              };
            }

            return tweet;
          }),
        };
      });

      return {
        ...newData,
        pages: newTweets,
      };
    }
  );
}

function Tweet({
  tweet,
  client,
  input,
}: {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
  client: QueryClient;
  input: RouterInputs["tweet"]["timeline"];
}) {
  const likeMutation = trpc.tweet.like.useMutation({
    onSuccess: (data, variables) => {
      updateCache({ client, data, variables, input, action: "like" });
    },
  }).mutateAsync;
  const unlikeMutation = trpc.tweet.unlike.useMutation({
    onSuccess: (data, variables) => {
      updateCache({ client, data, variables, input, action: "unlike" });
    },
  }).mutateAsync;

  const deleteMutation = trpc.tweet.delete.useMutation();

  const hasLiked = tweet.likes.length > 0;

  return (
    <div className="mb-4 rounded-lg border border-gray-300 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex">
        {tweet.author.image ? (
          <Image
            src={tweet.author.image}
            alt={`${tweet.author.name} profile`}
            width={48}
            height={48}
            className="rounded-full w-10 h-10"
          ></Image>
        ) : null}
        <div className="ml-2">
          <div className="flex align-middle">
            <p className="font-bold">{tweet.author.name}</p>
            <p className="text-sm text-gray-500">
              {" "}
              - {dayjs(tweet.createdAt).fromNow()}
            </p>
          </div>

          <p className="whitespace-pre-line">{tweet.text}</p>
        </div>
      </div>

      <div className="item-center mt-4 flex gap-1 p-2">
        <FontAwesomeIcon
          icon={faHeart}
          className="cursor-pointer"
          color={hasLiked ? "red" : "gray"}
          onClick={() => {
            if (hasLiked) {
              unlikeMutation({
                tweetId: tweet.id,
              });
              return;
            }

            likeMutation({
              tweetId: tweet.id,
            });
          }}
        />

        <span className="text-sm text-gray-500">{tweet._count.likes}</span>
      </div>
    </div>
  );
}

export function Timeline({
  where = {},
}: {
  where: RouterInputs["tweet"]["timeline"]["where"];
}) {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.tweet.timeline.useInfiniteQuery(
      {
        limit: LIMIT,
        where,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const client = useQueryClient();

  const scrollPosition = useScrollPosition();

  const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];

  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div>
      <CreateTweet />
      <div className="mr-3 p-2">
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            client={client}
            input={{
              where,
              limit: LIMIT,
            }}
          />
        ))}

        {!hasNextPage && <p className="text-xl">No more tweets...</p>}
      </div>
    </div>
  );
}

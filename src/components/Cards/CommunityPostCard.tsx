import Image from "next/image";
import { trpc } from "../../utils/trpc";
import dayjs from "dayjs";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CommunityPostCard = () => {
  const { data: recentPost } = trpc.tweet.topPost.useQuery();
  return (
    <div className="flex-1 rounded-lg bg-white shadow-md dark:bg-gray-700 dark:shadow">
      <div>
        <h2 className="text-md ml-5 p-5 font-bold">✨ Recent Community Post</h2>
      </div>
      <div className="flex gap-3 ml-5">
        {recentPost?.author.image ? (
          <Image
            src={recentPost?.author.image}
            alt={`${recentPost?.author.name} profile`}
            width={36}
            height={36}
            className="h-12 w-12 rounded-full"
          ></Image>
        ) : null}
        <div className="ml-2">
          <div className="flex flex-col align-middle">
            <p className="font-bold">{recentPost?.author.name}</p>
            <p className="whitespace-pre-line">{recentPost?.text}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              {" "}
              - {dayjs(recentPost?.createdAt).format("DD/MM/YYYY")}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              <FontAwesomeIcon icon={faHeart} color="gray" /> {recentPost?._count.likes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

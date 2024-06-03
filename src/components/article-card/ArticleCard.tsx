import React, {useCallback} from "react";
import {Tfa} from "../../types";
import {Img} from "react-image";
import placeholder from '../../assets/placeholder.jpeg';
import eyeIcon from '../../assets/eye-icon.svg';
import {useLocalStorage} from "@uidotdev/usehooks"

interface IArticleCardProps {
  article: Tfa;
}

const ArticleCard: React.FC<IArticleCardProps> = ({article}) => {
  const [readArticles, setReadArticles] = useLocalStorage<string[] | null>("read_articles", null);

  const markAsRead = useCallback(() => {
    setReadArticles((state) => ([...(state || []), article.tid]))
  }, [setReadArticles, article]);

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow transition-all hover:scale-105">
      <a target="_blank" href={article.content_urls.desktop.page} rel="noreferrer">
        <Img className="rounded-t-lg object-cover w-full" src={[article.thumbnail?.source!, placeholder]}
             alt={article.description}/>
      </a>
      <div className="p-5">
        <h5
          className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{article.titles.normalized}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{article.extract}</p>


        <div className="flex flex-row justify-between">
          <a target="_blank" href={article.content_urls.desktop.page}
             onClick={markAsRead}
             className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
             rel="noreferrer">
            Read more
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </a>

          {readArticles && readArticles.includes(article.tid) && (
            <Img src={[eyeIcon]} className="h-8 w-8" alt="Read"/>
          )}
        </div>

      </div>
    </div>
  )
}

export default ArticleCard;

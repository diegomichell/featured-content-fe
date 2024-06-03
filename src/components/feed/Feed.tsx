import React, {useEffect, useState} from "react";
import {useGetFeedQuery} from "../../services/feed";
import LoadingIndicator from "../loading-indicator/LoadingIndicator";
import Heading from "../heading/Heading";
import ArticleCard from "../article-card/ArticleCard";
import ReactPaginate from "react-paginate";
import {toast} from "react-toastify";
import {ApiError} from "../../types/errors";

interface IFeedProps {
  feedDate?: Date;
  feedLanguage?: string;
  pageSize: number;
}

const DEFAULT_DATE = new Date();

const Feed: React.FC<IFeedProps> = ({feedDate, pageSize, feedLanguage}) => {
  const pageClassName = 'flex items-center justify-center px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700';
  const {data, isFetching, error} = useGetFeedQuery({
    language: 'en', date: {
      year: (feedDate || DEFAULT_DATE).getFullYear(),
      month: (feedDate || DEFAULT_DATE).getMonth(),
      day: (feedDate || DEFAULT_DATE).getDate(),
    },
    targetLanguage: feedLanguage
  });

  useEffect(() => {
    if(error) {
      const apiError = error as ApiError;
      toast(apiError.data.message, {
        type: 'error'
      })
    }
  }, [error])

  const items = data?.mostread?.articles || []
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + pageSize;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / pageSize);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * pageSize) % items.length;
    setItemOffset(newOffset);
    window.scrollTo(0,0)
  };

  return (
    <div className="w-full">
      {isFetching && (
        <div className="flex justify-center my-8">
          <LoadingIndicator size='md'/>
        </div>
      )}

      {
        data && (
          <div className="flex flex-col md:flex-row mt-4 md:mt-6 gap-4">
            <div className="w-full md:w-4/5 order-last md:order-first">
              <Heading subheading title="Articles of interest" className="mb-4 border border-blue-400 p-4 !text-blue-400 rounded"/>
              <div id="articles-container" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                  currentItems.map((item) => (
                    <ArticleCard key={item.tid} article={item} />
                  ))
                }
              </div>

              <div className="flex justify-center mt-8">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="Previous"
                  pageLinkClassName={"p-4 w-full block text-center"}
                  renderOnZeroPageCount={null}
                  containerClassName={'flex flex-col md:flex-row md:inline-flex'}
                  pageClassName={pageClassName}
                  previousClassName={`${pageClassName} rounded-t-lg md:rounded-none md:rounded-s-lg p-4`}
                  nextClassName={`${pageClassName} rounded-b-lg md:rounded-none md:rounded-e-lg p-4`}
                  activeClassName={'!text-blue-600 border border-gray-300 !bg-blue-50 hover:!bg-blue-100 hover:!text-blue-700'}
                />
              </div>

            </div>

            <div className="w-full md:w-1/5 order-first md:order-last">
              <Heading subheading title={"Image of the day"} className="mb-4 border border-blue-400 p-4 !text-blue-400 rounded"/>
              <div className="flex justify-center">
                <figure className="relative max-w-sm transition-all duration-300 cursor-pointer ">
                  <a href={data?.image?.thumbnail?.source}>
                    <img className="rounded-lg" src={data?.image?.thumbnail?.source} alt={data?.image?.description.text}/>
                  </a>
                  <figcaption className="absolute px-4 text-lg text-white bottom-6">
                    <p className="line-clamp-3">{data?.image?.description.text}</p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Feed;

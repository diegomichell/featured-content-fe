import React, {useState} from 'react';
import Heading from "../components/heading/Heading";
import Feed from "../components/feed/Feed";
import Paragraph from "../components/paragraph/Paragraph";
import Box from "../components/box/Box";
import FiltersForm from "../components/filters-form/FiltersForm";
import {DEFAULT_ITEMS_PER_PAGE} from "../utils";


function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  const [pageSize, setPageSize] = useState(DEFAULT_ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      <Box>
        <Heading title={"Wikipedia Featured Content"}/>
        <Paragraph
          text="Welcome to this feed, where you will find the most relevant and interesting featured content of the day 🗞️"
          className="text-center"/>
      </Box>

      <FiltersForm
        pageSize={pageSize}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onPageSizeChanged={setPageSize}
      />

      <Feed feedLanguage={selectedLanguage} feedDate={selectedDate} pageSize={pageSize}/>
    </div>
  );
}

export default Home;

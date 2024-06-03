import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import {DEFAULT_ITEMS_PER_PAGE} from "../../utils";

interface IFiltersFormProps {
  onSelectDate: (date: Date) => void;
  selectedDate?: Date;
  onPageSizeChanged: (pageSize: number) => void;
  pageSize: number;
}

const FiltersForm: React.FC<IFiltersFormProps> = ({onSelectDate, selectedDate, onPageSizeChanged, pageSize}) => {
  return (
    <div className="flex flex-row w-full mt-4 mb-4 ">
      <div className="flex flex-col w-full max-w-52">
        <Datepicker
          inputId={'date-picker'}
          placeholder="Select a date"
          maxDate={new Date()}
          value={{startDate: selectedDate!, endDate: selectedDate!}}
          asSingle={true}
          useRange={false}
          onChange={(date) => {
            const parsedDate = date?.startDate ? new Date(date.startDate) : null;

            if (parsedDate) {
              parsedDate.setDate(parsedDate.getDate() + 1);
              onSelectDate(parsedDate);
            }
          }}
        />
      </div>

      <div className="flex flex-col w-full max-w-52">
        <input
          min={1}
          onChange={(e) => onPageSizeChanged(Number.parseInt(e.target.value))}
          type="number" aria-describedby="Select page size"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder={`Current page size of ${DEFAULT_ITEMS_PER_PAGE}`}
        />
      </div>
    </div>
  )
}

export default FiltersForm;

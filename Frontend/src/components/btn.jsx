import * as React from 'react';

export function RoundedButtons() {
  return (
    <button
      type="button"
      className="ml-20 sm:w-1/6 lg:w-1/12  flex  rounded-md px-4 py-2.5 text-sm font-semibold hover:bg-[#6f47c5] text-white shadow-sm relative bg-[#7644e4] overflow-hidden"
    >
      <span className="relative z-10">Try Now</span>
      <span className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300"></span>
    </button>
  );
}

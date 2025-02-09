import React from 'react';
import { NoDataIcon } from '../icons';

export default function NoDataPlaceHolder({ text }: { text?: string }) {
  return (
    <div className="no-data">
      <NoDataIcon />
      <p className="">
        {text ||
          'No task matches these set of filter options, reset filter to see all tasks'}
      </p>
    </div>
  );
}

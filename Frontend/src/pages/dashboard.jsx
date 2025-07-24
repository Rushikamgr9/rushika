import React from 'react';
import Statcard from '../components/dashboard/statcard';
import stats from '../components/dashboard/statdata';

export default function Dashboard() {
  return (
    <>
        <h1 className="text-2xl font-bold text-grey-950">Dashboard Overview</h1>
        <div className="flex items-center justify-between">
            {stats.map((item,index) => {
                return (
                    <Statcard
                        key={index}
                        title={item.title}
                        count={item.count}
                        icon={<item.icon/>}
                        color={item.color}
                    />
                );
            })}
        </div>
    </>
  )
}



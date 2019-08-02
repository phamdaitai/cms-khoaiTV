import React, { Component } from 'react';
import './home.less';
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import { Pie, yuan, TimelineChart } from 'ant-design-pro/lib/Charts';

const salesPieData = [
    {
      x: 'Phim lẻ',
      y: 1201,
    },
    {
      x: 'Phim bộ',
      y: 735,
    }
  ];

  const chartData = [];
    for (let i = 0; i < 20; i += 1) {
    chartData.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: Math.floor(Math.random() * 300) + 1000,
        y2: Math.floor(Math.random() * 300) + 700,
    });
    }

class Home extends Component {
    render() {
        return (
            <div className='home'>
                <div className="left-chart">
                    <Pie
                        hasLegend
                        title="Phim"
                        subTitle="Phim"
                        total={() => (
                        <span
                            dangerouslySetInnerHTML={{
                            __html: salesPieData.reduce((pre, now) => now.y + pre, 0),
                            }}
                        />
                        )}
                        data={salesPieData}
                        valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                        height={294}
                    />
                </div>
                <div className="right-chart">
                    <TimelineChart height={350} data={chartData} titleMap={{ y1: 'Phim lẻ', y2: 'Phim bộ' }} />
                </div>
                <div className="live-chart">
                </div>
            </div>
        );
    }
}

export default Home;
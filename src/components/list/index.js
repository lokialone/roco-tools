import React from 'react';
import './index.less';
export default function List(props) {
    const {data = []} = props;
    return (<div className="list">
     {data.map((item) => {
       return <div className="list-item">{item}</div>
    })}
    </div>)
}
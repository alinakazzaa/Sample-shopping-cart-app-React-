import React from 'react'
import arrowUp from '../resources/images/arrow-up.png'
import arrowDown from '../resources/images/arrow-down.png'

export const SortingView = ({ asc, name, setSortOrder }) => {
    return <div className="sortView">
        <p className="subTitle">{name}</p>
        <div style={{ display: 'flex', flexDirection: 'column', height: 40, marginLeft: 5 }}>
            <button onClick={() => setSortOrder(name, !asc)} className="btn"><img className={!asc || asc == null ? "arrowIconInactive" : "arrowIcon"} src={arrowUp} /></button>
            <button onClick={() => setSortOrder(name, !asc)} className="btn"><img className={asc || asc == null ? "arrowIconInactive" : "arrowIcon"} src={arrowDown} /></button>
        </div>
    </div >
}
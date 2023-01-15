import React from 'react'

const Lingue = ({ lang }) => {
    return (
        <div className="dropdown-center menu-lingue">
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Lingua: {lang}
            </button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Action two</a></li>
                <li><a className="dropdown-item" href="#">Action three</a></li>
            </ul>
        </div>
    )
}

export default Lingue